import { Component, OnInit } from '@angular/core';

interface Bulletin {
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

  constructor() { }

  ngOnInit() {
  }

}
