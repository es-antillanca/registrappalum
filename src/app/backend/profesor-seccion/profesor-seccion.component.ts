import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Alumno, Asistencia, Profesor, Seccion } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-profesor-seccion',
  templateUrl: './profesor-seccion.component.html',
  styleUrls: ['./profesor-seccion.component.scss'],
})
export class ProfesorSeccionComponent implements OnInit {
  activeID = '';
  userLogged = {
    uid: '',
    nombre: '',
    apellidoPat: '',
    apellidoMat: '',
    run: 0,
    dv: '',
    email: '',
    genero: "Otro",
    tipo: ''
  }
  seccion: Seccion = {
    nombreSec: '',
    id: '',
    cod: '',
    num: '',
    tipo: 'Diurno',
    idProfesor: '',
    alumnos: [],
    asistencias: []
  };

  secciones: Seccion[] = [];

  alumnos: Alumno[] = [];
  alumnosSeccion: Alumno[] = [];

  uid = '';

  seccionActual: any;

  asistAlumno = 0;
  asistTotal = 0;
  porcAsistencia = 0;

  newAsist: AsistenciaCopia = {
    id: this.firestore.getId(),
    fecha: new Date(),
    seccionId: '',
    presente: false,

  }

  qrString = '';

  constructor(
    private activedRoute: ActivatedRoute,
    private firestore: FirestoreService,
    private auth: AuthService,
    private router: Router,
    private interaction: InteractionService
  ) {
    this.activedRoute.params.subscribe(
      parameters => {
        this.activeID = parameters["idSeccion"]
      }
    )
  }

  ngOnInit() {
    this.auth.stateUser().subscribe(res => {
      this.getUserId();
    })
  }

  async getUserId() {
    const uid = await this.auth.getUid();
    if (uid) {
      this.uid = uid;

      this.getUserInfo();
      this.getSeccionInfo();

    } else {
      console.log(null)
    }
  }

  getUserInfo() {
    const path = 'Usuarios';
    const id = this.uid;
    this.firestore.getDoc<Profesor>(path, id).subscribe(res => {
      if (res) {
        this.userLogged = res;
        this.getSeccionesProfesor(res.uid)

      }
    })
  }

  getSeccionesProfesor(uid: string) {
    const path = 'Secciones/'
    this.firestore.getCollectionQuery<Seccion>(path, 'idProfesor', '==', uid).subscribe(
      res => {
        this.secciones = res;
        console.log(this.secciones);
        const seccion = this.secciones.find(seccion => seccion.num === this.activeID)
        this.seccionActual = seccion;
        console.log(this.seccionActual)
        this.getAlumnos();

      }
    )
  }

  getSeccionInfo() {
    const path = 'Usuarios/' + this.uid + '/secciones'
    const id = this.uid;
    this.firestore.getDoc<Seccion>(path, this.activeID).subscribe(res => {
      if (res) {
        this.seccion = res
      }
    })
  }

  async getAlumnos() {
    const path = 'Secciones/' + this.seccionActual.id + '/alumnos/';
    await this.interaction.showLoading('Verificando datos...')
    this.firestore.getCollection<Alumno>(path).subscribe(res => {
      if (res) {
        this.alumnos = res
        this.alumnos.forEach(alumno => {
          this.getAlumnosInfo(alumno.uid)
        })
        this.interaction.closeLoading()
      }
    })
  }

  generarQr() {
    this.newAsist.seccionId = this.activeID;

    this.qrString = JSON.stringify(this.newAsist);

    const data = JSON.parse(this.qrString);
    console.log(data)
    const path = '/Usuarios/JmodEyYHNFU9ECWn1LvT7X22Ztp2/secciones/ARQ005D/asistencia';
    const id = this.newAsist.id;
    this.alumnosSeccion.forEach((alumno) => {
      this.pasarLista(alumno)
    })

  }

  crearDocPrueba(uid: string, seccionID: string) {
    const path = 'Usuarios/' + uid + '/secciones/' + seccionID + '/Asistencia';
    this.firestore.createDoc(this.newAsist, path, this.newAsist.id);
  }

  pasarLista(alumno: Alumno) {
    this.crearDocPrueba(alumno.uid, this.activeID);
  }

  async getAlumnosInfo(uid: string) {

    const path = 'Usuarios';
    const id = uid;
    this.firestore.getDoc<Alumno>(path, id).subscribe(res => {
      if (res) {
        this.alumnosSeccion.push(res)

      }
    })

  }


}

export interface AsistenciaCopia {
  id: string,
  fecha: Date,
  seccionId: string,
  presente: boolean
}
