import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Alumno, Seccion } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  login = false;
  rol = '';

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

  secciones: Seccion[] = [];

  idProfesor = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private interaction: InteractionService,
    private firestore: FirestoreService,
    private storage: Storage
  ) {
    console.log(localStorage.getItem('user'))
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
    await this.storage.create();
  }

  getUserData(uid: string) {
    const path = 'Usuarios';
    const id = uid;
    this.firestore.getDoc<Alumno>(path, id).subscribe(res => {
      if (res) {
        this.userLogged = res;
        this.rol = res.tipo;

      }
    })
  }

  logout() {
    this.rol = '';
    this.auth.logout();
    this.interaction.presentToast('Sesión finalizada');
    localStorage.removeItem('isLog')
    localStorage.removeItem('user')
    this.router.navigateByUrl('/login', { replaceUrl: true })

  }





}
