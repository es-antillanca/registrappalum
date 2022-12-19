import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: AngularFireAuth
  ) { }

  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    this.auth.signOut()
  }

  stateUser() {
    return this.auth.authState
  }

  async getUid() {
    const user = await this.auth.currentUser;
    if (user) {
      return user.uid
    } else {
      return null
    }
  }
}
