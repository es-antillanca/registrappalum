import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  isMobile = false;

  constructor(
    private platform: Platform,
    private router: Router
  ) {
    const mobile = this.platform.platforms();
    mobile.forEach((x) => {
      if (x === 'desktop' || x === 'mobileweb') {
        this.isMobile = false;
      }
      else {
        this.isMobile = true;
      }
    })

  }

  goLoginAd() {
    this.router.navigateByUrl('/loginAd')
  }
}
