import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss'],
})
export class DownloadComponent implements OnInit {
  myAngularxQrCode = 'saa';
  isMobileWeb = false;
  constructor(
    private platform: Platform,
    private router: Router
  ) {
    const plat = this.platform.platforms();
    plat.forEach((x) => {
      if (x === 'mobileweb') {
        this.isMobileWeb = true;
        console.log(this.isMobileWeb);
      } else {
        console.log(this.isMobileWeb)
      }
    })
  }

  ngOnInit() { }

  goLoginAd() {
    this.router.navigateByUrl('/loginAd')
  }

}
