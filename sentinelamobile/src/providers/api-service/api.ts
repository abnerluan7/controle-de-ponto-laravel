import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import { ENV } from '../../environments/environment';

@Injectable()
export class ApiProvider {
  constructor(public http: Http, private storage: Storage) {
  }

  loadHeaders() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.storage.get('accessToken').then(response => {
      if(response) {
        headers.append('Authorization',`Bearer ${response}`);
      }
      return Promise.resolve(headers);
    })
  }

  post(url: string, params: any){
    return new Promise((resolve, reject) => {
      const fullUrl: string = `${ENV.api}${url}`;
      return this.loadHeaders().then((headers) => {
        const options = new RequestOptions({ headers });
        return this.http.post(fullUrl, params, options).subscribe(
          response => {
            return resolve(response.json());
          },
          error => {
            return reject(error.json());
          }
        );
      });  
    });
  }

  get(url: string){
    return new Promise((resolve, reject) =>{
      const fullUrl: string = `${ENV.api}${url}`;
      return this.loadHeaders().then((headers) => {
        const options = new RequestOptions({ headers });
        return this.http.get(fullUrl, options).subscribe(
          response =>{
            return resolve(response.json());
          },
          error =>{
            return reject(error.json());
          }
        );
      });
    });
  }

  head(url: string){
    return new Promise((resolve, reject) => {
      const fullUrl: string = `${ENV.api}${url}`;
      return this.loadHeaders().then((headers) => {
        const options = new RequestOptions({ headers });
        return this.http.head(fullUrl, options).subscribe(
          response => {
            return resolve(response);
          },
          error => {
            return reject(error);
          }
        );
      });  
    });
  }

}
