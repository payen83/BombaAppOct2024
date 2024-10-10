import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

interface Bulletin {
  title: string,
  imageURL: string
}

interface Menu {
  title: string,
  imageURL: string
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  public listBulletin: Array<Bulletin> = [
    { title: "Bantuan Banjir", imageURL: 'assets/images/bulletin-2.jpeg' },
    { title: "Hari Ibu Bapa", imageURL: 'assets/images/bulletin-1.jpeg' },
    { title: "Hari Bomba Sedunia", imageURL:'assets/images/bulletin-default.png' }
  ];

  public listMenu: Array<Menu> = [
    { title: "Senarai", imageURL: 'assets/menu/Buletin.png' },
    { title: "Carian", imageURL: 'assets/menu/Carian.png' },
    { title: "Dokumen", imageURL:'assets/menu/Dokumen.png' }
  ];

  public staff: any = {
    first_name: '',
    last_name: '',
    department: ''
  };

  public token: any = null;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private storageService: StorageService) { }

  goLogin(){
    if(this.token){
      this.alertConfirmation();
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  async alertConfirmation(){
    const alert = await this.alertController.create({
      header: 'Authentication',
      message: 'Are you sure you want to logout?',
      buttons: [
        { text: 'Yes', handler: () => { this.doLogout(); } },
        { text: 'No', handler: () => { return; } }
      ]
    });
    return await alert.present();
  }

  async doLogout(){
    await this.storageService.clearStorage();
    this.router.navigateByUrl('/login');
  }



  async ionViewDidEnter(){
    // console.log('test');
    let response: any = await this.storageService.getStorage('STAFF');
    if(response){
      this.staff = response;
    }
    let response2: any = await this.storageService.getStorage('TOKEN');
    if(response2){
      this.token = response2;
    }
  }

  ngOnInit() {
    this.storageService.observeLoginEvent().subscribe((data: any)=>{
      this.staff = data.staff;
      this.token = data.token;
    });
  }

}
