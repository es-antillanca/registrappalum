import { Component, OnInit } from '@angular/core';
import { Alumno, Asistencia, Seccion } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';


@Component({
  selector: 'app-missecciones',
  templateUrl: './missecciones.component.html',
  styleUrls: ['./missecciones.component.scss'],
})
export class MisseccionesComponent implements OnInit {

  login = false;

  userLogged = {
    uid: '',
    nombre: '',
    apellidoPat: '',
    apellidoMat: '',
    run: 0,
    dv: '',
    email: '',
    genero: "Otro",
    carrera: '',
    tipo: ''
  }

  uid = '';
  path = '/secciones/';
  seccion: Seccion[] = [];

  asistenciaAlumno = 0;
  asistenciaTotal = 0;
  porcAsistencia = 0;

  profesorId = '';

  constructor(
    private firestore: FirestoreService,
    private auth: AuthService
  ) {
    this.auth.stateUser().subscribe(res => {
      if (res) {
        this.login = true;
        this.getUserData(res.uid);
      } else {
        this.login = false
      }
    })
  }

  ngOnInit() {
    this.auth.stateUser().subscribe(res => {
      this.getUserId();
    })
  }

  getUserData(uid: string) {
    const path = 'Usuarios';
    const id = uid;
    this.firestore.getDoc<Alumno>(path, id).subscribe(res => {
      if (res) {
        this.userLogged = res;
      }
    })
  }

  async getUserId() {
    const uid = await this.auth.getUid();
    if (uid) {
      this.uid = uid;

      this.getUserInfo();
      this.getColl();
      //this.getPresente();

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

  async getColl() {
    ///Usuarios/4Q5RkyRFoqRaFffoTUGlrxUpAhi1/secciones/ARC005D
    const path = 'Usuarios/' + this.uid + '/secciones'
    this.firestore.getCollection<Seccion>(path).subscribe(res => {
      if (res) {

        this.seccion = res;
        this.asistenciaTotal = res.length

      }
    });
  }

}
