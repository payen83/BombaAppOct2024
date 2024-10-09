import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-bulletin',
  templateUrl: './bulletin.page.html',
  styleUrls: ['./bulletin.page.scss'],
})
export class BulletinPage implements OnInit {
  public bulletinList: Array<any> = [];
  constructor(private api: ApiService) { }

  async ngOnInit() {
    try {
      const response: any = await this.api.doGet('/news');
      console.log(response);
      this.bulletinList = response;
    } catch(err) {
      console.log(err);
    }
  }

}
