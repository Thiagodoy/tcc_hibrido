import { Injectable } from '@angular/core';
import { Http} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';

/*
  Generated class for the HttpProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class HttpProvider {

  url:string ='';

  constructor(public http: Http) {}

  saveLog(log:any){
    return this.http.post(this.url,log);
  }

}
