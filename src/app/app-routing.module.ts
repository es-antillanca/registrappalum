import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ProfesorSeccionComponent } from './backend/profesor-seccion/profesor-seccion.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MisseccionesComponent } from './pages/missecciones/missecciones.component';
import { SeccionAlumnoComponent } from './pages/seccion-alumno/seccion-alumno.component';
import { TutorialComponent } from './pages/tutorial/tutorial.component';

import { AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/compat/auth-guard';

import { ProfesorGuard } from './permissions/profesor.guard';
import { LoginprofesorComponent } from './backend/loginprofesor/loginprofesor.component';
import { ProfesorHomeComponent } from './backend/profesor-home/profesor-home.component';


const routes: Routes = [

  {
    path: '',
    redirectTo: 'tutorial',
    pathMatch: 'full'
  },
  {
    path: 'tutorial',
    component: TutorialComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AngularFireAuthGuard]
  },
  {
    path: 'missecciones',
    component: MisseccionesComponent,
    canActivate: [AngularFireAuthGuard]
  },
  {
    path: 'seccion/:idSeccion',
    component: SeccionAlumnoComponent,
    canActivate: [AngularFireAuthGuard]
  },
  {
    path: 'seccionProf/:idSeccion',
    component: ProfesorSeccionComponent,
    canActivate: [ProfesorGuard]
  },
  {
    path: 'loginAd',
    component: LoginprofesorComponent
  },
  {
    path: 'profesor',
    component: ProfesorHomeComponent,
    canActivate: [ProfesorGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
