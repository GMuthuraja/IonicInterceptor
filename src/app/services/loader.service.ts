import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class LoaderService {

  loader: any;

  constructor(public loadingController: LoadingController) { }


  async showLoader(){
    this.loader = await this.loadingController.create({
      message: "Please Wait",
      showBackdrop: true,
      spinner: 'bubbles',
      backdropDismiss: true
    })

    await this.loader.present();
  }

  async hideLoader(){
    await this.loader.dismiss();
  }
}
