import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private api: ApiService) {  }
  
  watch(){
    this.api.getUsersList().subscribe((res)=>{
      console.log(res);
    });
  }

}
