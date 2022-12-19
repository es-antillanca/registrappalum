import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { InteractionService } from 'src/app/services/interaction.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public credentials: FormGroup;

  constructor(
    private router: Router,
    private auth: AuthService,
    private interaction: InteractionService,
    private formBuilder: FormBuilder
  ) {
    this.credentials = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]]
    })
  }

  ngOnInit() { }

  async login() {
    let userLog = {
      email: '',
      password: ''
    }
    userLog = this.credentials.getRawValue();
    await this.interaction.showLoading('Verificando datos...')
    const res = await this.auth.login(userLog.email, userLog.password).catch(error => {
      this.interaction.closeLoading();
      this.interaction.presentToast('Usuario no encontrado');

    });
    if (res) {
      this.interaction.closeLoading();
      this.interaction.presentToast('Inicio correcto');
      localStorage.setItem('user', JSON.stringify(res.user))
      this.router.navigateByUrl('/home', { replaceUrl: true })
    }


  }

}
