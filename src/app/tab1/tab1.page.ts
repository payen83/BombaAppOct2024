import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public ic: string = '';
  public staff: any;
  public showResult: boolean = false;
  constructor(private api: ApiService) {}

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
