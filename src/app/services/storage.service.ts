import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private loginSubject = new Subject();
  constructor(private storage: Storage) { }

  publishLoginEvent(data: any){
    this.loginSubject.next(data);
  }

  observeLoginEvent(): Subject<any>{
    return this.loginSubject;
  }

  async setStorage(key: string, value: any){
    return await this.storage.set(key, value);
  }
  
  async getStorage(key: string){
    return await this.storage.get(key);
  }

  async clearStorage(){
    this.publishLoginEvent({ 
        token: null, 
        staff: {first_name: '', last_name: '', department: ''}
      });
    return await this.storage.clear();
  }
}
