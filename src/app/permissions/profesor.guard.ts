import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Storage } from '@ionic/storage-angular';
import { FirestoreService } from '../services/firestore.service';
import { Profesor, Usuario } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ProfesorGuard implements CanActivate {

  private rol = localStorage.getItem('rol')
  constructor(
    private auth: AuthService,
    private firestore: FirestoreService,
    private router: Router,
  ) {
    console.log(this.rol)

  }


  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.rol === 'Profesor') {
      return true;
    }
    alert('sin permiso')
    this.router.navigateByUrl('/login', { replaceUrl: true })
    return false
  }

}
