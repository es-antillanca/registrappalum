import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Alumno, Seccion } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { InteractionService } from 'src/app/services/interaction.service';


@Component({
  selector: 'app-profesor-home',
  templateUrl: './profesor-home.component.html',
  styleUrls: ['./profesor-home.component.scss'],
})
export class ProfesorHomeComponent implements OnInit {
  login = false;
  rol = '';

  slideOpts = {
    slidesPerView: 2,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }
  }

  secciones: Seccion[] = [];

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

  constructor(
    private auth: AuthService,
    private router: Router,
    private interaction: InteractionService,
    private firestore: FirestoreService
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

  async ngOnInit() {
    const uid = await this.auth.getUid();
  }

  getUserData(uid: string) {
    const path = 'Usuarios';
    const id = uid;
    this.firestore.getDoc<Alumno>(path, id).subscribe(res => {
      if (res) {
        this.userLogged = res;
        this.rol = res.tipo;
        this.getSeccionesProfesor(id);
      }
    })
  }

  async getSeccionesProfesor(uid: string) {
    await this.interaction.showLoading('Verificando datos...')
    const path = 'Secciones/'
    this.firestore.getCollectionQuery<Seccion>(path, 'idProfesor', '==', uid).subscribe(
      res => {
        this.secciones = res;
        this.interaction.closeLoading();
      }
    )
  }


}
