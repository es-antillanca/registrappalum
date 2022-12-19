import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  constructor(
    private toastController: ToastController,
    private loadingCtrl: LoadingController
  ) { }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      cssClass: 'custom-toast',

    });

    await toast.present();

  }

  async closeToast() {
    this.toastController.dismiss();
  }

  async showLoading(message: string) {
    const loading = await this.loadingCtrl.create({
      message: message,
      duration: 5000,
      spinner: 'circles',
    });

    loading.present();
  }

  async closeLoading() {
    this.loadingCtrl.dismiss();
  }
}
