import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { QRCodeModule } from 'angularx-qrcode';
import { HomeComponent } from './pages/home/home.component';
import { CommonModule } from '@angular/common';
import { ScanqrComponent } from './components/scanqr/scanqr.component';
import { MisseccionesComponent } from './pages/missecciones/missecciones.component';
import { SeccionAlumnoComponent } from './pages/seccion-alumno/seccion-alumno.component';
import { HeaderComponent } from './components/header/header.component';
import { ProfesorHomeComponent } from './backend/profesor-home/profesor-home.component';
import { ProfesorSeccionComponent } from './backend/profesor-seccion/profesor-seccion.component';
import { TutorialComponent } from './pages/tutorial/tutorial.component';
import { AuthGuard, AuthGuardModule } from '@angular/fire/auth-guard';
import { AuthService } from './services/auth.service';
import { DownloadComponent } from './components/download/download.component';
import { IonicStorageModule } from '@ionic/storage-angular';
import { ProfesorGuard } from './permissions/profesor.guard';
import { LoginprofesorComponent } from './backend/loginprofesor/loginprofesor.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ScanqrComponent,
    MisseccionesComponent,
    SeccionAlumnoComponent,
    HeaderComponent,
    ProfesorHomeComponent,
    ProfesorSeccionComponent,
    TutorialComponent,
    DownloadComponent,
    LoginprofesorComponent
  ],
  imports: [

    CommonModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    QRCodeModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    IonicStorageModule.forRoot()
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, ProfesorGuard],
  bootstrap: [AppComponent],
})
export class AppModule { }
