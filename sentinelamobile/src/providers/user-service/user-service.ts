import { Injectable } from '@angular/core';
import { ApiProvider } from '../api-service/api';

/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserServiceProvider {

  constructor(private api: ApiProvider) {}

  signUp(nome: string, email: string, senha: string) {
    const payload = {
      nome,
      email,
      senha
    };

    return this.api.post(`/users/cadastro`, payload)
    .then((response) => {
      return Promise.resolve(response);
    }).catch((response) => {
      return Promise.reject(response);
    });
  }
}
