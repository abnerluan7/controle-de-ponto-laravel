import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ApiProvider } from '../api-service/api';

@Injectable()
export class AuthServiceProvider {

  constructor(private api: ApiProvider, private storage: Storage) {
  }

  login(username: String, password: String) {
    let postParams = {
      password: password,
      email: username
    }
    return this.api.post(`/login`, postParams)
    .then((response) => {
      return this.storage.set('isLoggedIn', true).then(() => {
        return this.storage.set('accessToken', response['data']['token'])
      });
    }).catch((response) => {
      this.storage.set('isLoggedIn', false);
      return Promise.reject(response);
    });
  }

  logout() {
      return this.storage.clear();
  }

  isAuthenticated() {
    return this.storage.get('isLoggedIn');
  }
  token() {
    return this.storage.get('accessToken');
  }
}
