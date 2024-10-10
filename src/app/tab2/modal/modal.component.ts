import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements AfterViewInit {
  private listener: any;
  constructor(private modalCtrl: ModalController) { }

  ngAfterViewInit() {
    setTimeout(() => {
      this.startScan().then((result: any)=>{
        this.modalCtrl.dismiss(result);
      });
    }, 250)
  }

  startScan(){
    return new Promise(async (resolve) => {
      document.querySelector('body')?.classList.add('barcode-scanner-active');
      this.listener = await BarcodeScanner.addListener('barcodesScanned', result => {
        this.stopScan();
        resolve(result);
      })
      await BarcodeScanner.startScan();
    })
  }

  async stopScan(){
    await this.listener.remove();
    document.querySelector('body')?.classList.remove('barcode-scanner-active');
    return await BarcodeScanner.stopScan();
  }

  closeModal(){
    this.stopScan();
    this.modalCtrl.dismiss();
  }

}
