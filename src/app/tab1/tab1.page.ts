import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page{
  public ic: string = '';
  public staff: any;
  public showResult: boolean = false;
  public token: any = null;
  constructor(
    private api: ApiService,
    private storageService: StorageService,
    private router: Router
  ) {}
  
  async ionViewWillEnter() {
    this.token = await this.storageService.getStorage('TOKEN');
    if(!this.token){
      alert('Unauthorized. Please login first');
      this.router.navigateByUrl('/tabs');
    }
  }

  async doSearch(){
    try {
      const response: any = await this.api.doGet('/staff?ic=' + this.ic);
      console.log(response);
      if(!response.message){
        this.staff = response;
        this.showResult = true;
      } else {
        alert(response.message);
      }
    } catch(error: any) {
      alert(error.message);
    }
  }

  doReset(){
    this.ic = '';
    this.showResult = false;
  }

}
