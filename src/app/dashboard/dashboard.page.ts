import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';

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

  constructor(private storageService: StorageService) { }

  async ionViewDidEnter(){
    // console.log('test');
    let response: any = await this.storageService.getStorage('STAFF');
    if(response){
      this.staff = response;
    }
  }

  ngOnInit() {
    this.storageService.observeLoginEvent().subscribe((data: any)=>{
      this.staff = data.staff;
    });
  }

}
