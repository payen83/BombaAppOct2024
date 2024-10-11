import { Component } from '@angular/core';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from './modal/modal.component';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public QRText: string = '';
  constructor(public modalCtrl: ModalController) {}

  async requestPermission(){
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera == 'granted' || camera == 'limited';
  }
  
  async scanQR(){
    const granted = await this.requestPermission();

    if(granted){
      const modal = await this.modalCtrl.create({
        component: ModalComponent,
        cssClass: 'barcode-scanner-modal',
        showBackdrop: false
      });
      await modal.present();
      const response: any = await modal.onWillDismiss();
      // this.QRText = JSON.stringify(data);
      this.QRText = response.data.barcodes[0].displayValue;
      Browser.open({ url: this.QRText });
    } else {
      alert('Please enable camera permission');
    }
  }

}
