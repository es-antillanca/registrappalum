import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';


@Component({
  selector: 'app-scanqr',
  templateUrl: './scanqr.component.html',
  styleUrls: ['./scanqr.component.scss'],
})
export class ScanqrComponent implements OnDestroy {

  qrString = 'Esto es un string';
  scannedResult: any;
  content_visibility = '';
  constructor(
    private router: Router
  ) {

  }

  async checkPermission() {
    // check or request permission
    const status = await BarcodeScanner.checkPermission({ force: true });

    if (status.granted) {
      // the user granted permission
      return true;
    }

    return false;
  };

  async startScan() {
    try {
      const permission = await this.checkPermission();
      if (!permission) {
        return;
      }
      await BarcodeScanner.hideBackground();
      document.querySelector('body')?.classList.add('scanner-active');
      this.content_visibility = 'hidden';
      const result = await BarcodeScanner.startScan();
      console.log(result);
      this.content_visibility = '';
      BarcodeScanner.showBackground();

      document.querySelector('body')?.classList.remove('scanner-active');
      //this.content_visibility = 'show';
      if (result?.hasContent) {
        this.scannedResult = result.content;
        alert('Registrado correctamente, vayase a lavar')
        this.router.navigate(['login'])
        console.log(this.scannedResult);
      }
    } catch (e) {
      console.log(e);
      this.stopScan();
    }
  }

  stopScan() {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    document.querySelector('body')?.classList.add('scanner-active')
    this.content_visibility = '';

  }

  ngOnDestroy(): void {
    this.stopScan();
  }

}
