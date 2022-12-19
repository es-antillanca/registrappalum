import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Alumno, Asistencia, Profesor, Seccion } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-seccion-alumno',
  templateUrl: './seccion-alumno.component.html',
  styleUrls: ['./seccion-alumno.component.scss'],
})
export class SeccionAlumnoComponent implements OnInit, OnDestroy {
  scannedResult: any;
  content_visibility = '';

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

  uid = '';

  profesor = '';
  nombreProfesor = '';


  asistAlumno = 0;
  asistTotal = 0;
  public porcAsistencia = 0;
  public progresbarrAsis = 0;

  newAsistAlumno: AsistenciaCopia = {
    id: this.firestore.getId(),
    fecha: new Date(),
    seccionId: '',
    presente: false
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
      //console.log(this.uid)
      this.getUserInfo();
      this.getSeccionInfo();
      this.getAsistenciaInfo();
      this.getAsistenciaAlumno();
    } else {
      console.log(null)
    }
  }

  getUserInfo() {
    const path = 'Usuarios';
    const id = this.uid;
    this.firestore.getDoc<Alumno>(path, id).subscribe(res => {
      if (res) {
        this.userLogged = res;
      }
    })
  }

  getProfesorInfo() {
    const path = 'Usuarios';
    const id = this.profesor;
    this.firestore.getDoc<Profesor>(path, id).subscribe(res => {
      if (res) {
        this.nombreProfesor = res.nombre + ' ' + res.apellidoPat
      }
    })
  }

  getSeccionInfo() {
    const path = 'Usuarios/' + this.uid + '/secciones'
    const id = this.uid;
    this.firestore.getDoc<Seccion>(path, this.activeID).subscribe(res => {
      if (res) {
        this.seccion = res
        this.profesor = res.idProfesor
        //console.log(this.seccion)
        this.getProfesorInfo();
      }
    })
  }

  getAsistenciaInfo() {
    //Usuarios/4Q5RkyRFoqRaFffoTUGlrxUpAhi1/secciones/ARC005D/Asistencia
    const path = 'Usuarios/' + this.uid + '/secciones/' + this.activeID + '/Asistencia'
    const id = this.uid;
    this.firestore.getCollection<Asistencia>(path).subscribe(res => {
      if (res) {
        this.asistTotal = res.length

      }
    })
  }

  getAsistenciaAlumno() {
    const path = 'Usuarios/' + this.uid + '/secciones/' + this.activeID + '/Asistencia';
    const id = this.uid;
    this.firestore.getCollectionQuery(path, 'presente', '==', true).subscribe(res => {
      if (res) {

        this.asistAlumno = res.length

        this.porcAsistencia = (this.asistAlumno / this.asistTotal) * 100;
        this.progresbarrAsis = this.porcAsistencia / 100;

      } else {
        console.log('Sin respuesta')
      }
    })


  }

  async checkPermission() {
    // check or request permission
    const status = await BarcodeScanner.checkPermission({ force: true });

    if (status.granted) {
      // the user granted permission
      return true;
    }

    return false;
  };

  async startScan() {
    try {
      const permission = await this.checkPermission();
      if (!permission) {
        return;
      }
      await BarcodeScanner.hideBackground();
      document.querySelector('body')?.classList.add('scanner-active');
      this.content_visibility = 'hidden';
      const result = await BarcodeScanner.startScan();
      console.log(result);
      this.content_visibility = '';
      BarcodeScanner.showBackground();

      document.querySelector('body')?.classList.remove('scanner-active');
      //this.content_visibility = 'show';
      if (result?.hasContent) {
        this.scannedResult = result.content;
        this.newAsistAlumno = JSON.parse(this.scannedResult);
        this.newAsistAlumno.presente = true
        const data = this.newAsistAlumno;
        const path = 'Usuarios/' + this.uid + '/secciones/' + this.activeID + '/Asistencia';
        if (path) {
          this.firestore.updateDoc(data, path, this.newAsistAlumno.id);
          this.interaction.presentToast('Asistencia registrada con éxito. ')
        }
        else {
          this.interaction.presentToast('No se pudo registrar la asistencia.')
        }
        //this.crearDocPrueba();
        this.router.navigate(['home'])
        //console.log(this.scannedResult);
      }
    } catch (e) {
      console.log(e);
      this.stopScan();
    }
  }

  stopScan() {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    document.querySelector('body')?.classList.add('scanner-active')
    this.content_visibility = '';

  }

  ngOnDestroy(): void {
    this.stopScan();
  }



  UpdateDocPrueba() {
    const path = 'Usuarios/' + this.uid + '/secciones/' + this.activeID + '/Asistencia';

    //this.firestore.createDoc(this.newAsist, path, this.newAsist.id);
  }

}

export interface AsistenciaCopia {
  id: string,
  fecha: Date,
  seccionId: string,
  presente: boolean
}
