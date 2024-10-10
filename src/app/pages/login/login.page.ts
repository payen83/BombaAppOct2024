import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public user: any = { email: 'test1@email.com', password: 'test1234'};
  constructor(private storageService: StorageService, private api: ApiService, private router: Router) { }

  async doLogin(){
    try {
      const response: any = await this.api.doPost('/login', this.user);
      console.log(response);
      if(response){
        await this.storageService.setStorage('TOKEN', response.token);
        await this.storageService.setStorage('STAFF', response.staff);
        this.storageService.publishLoginEvent(response);
        this.router.navigateByUrl('/tabs', {replaceUrl: true});
      }
    } catch(error){
      alert('Invalid login');
    }
  }

  ngOnInit() {
  }

}
