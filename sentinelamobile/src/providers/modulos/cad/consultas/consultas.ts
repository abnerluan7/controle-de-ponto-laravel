import { Injectable } from '@angular/core';
import { ApiProvider } from '../../../api-service/api';
import { Storage } from '@ionic/storage';
import { ENV } from '../../../../environments/environment';

/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConsultasProvider {

  constructor(private api: ApiProvider, private storage: Storage) {}

  carregaConsultas() {
    return this.api.get(ENV.cadastro+'/solicitacao/index')
    .then((response) => {
      return Promise.resolve(response);
    }).catch((response) => {
      return Promise.reject(response);
    });
  }

  carregaCampos() {
    return this.api.get(ENV.cadastro+'/solicitacao/create')
    .then((response) => {
      return Promise.resolve(response);
    }).catch((response) => {
      return Promise.reject(response);
    });
  }

  resposta (resposta_cadastro: any) {
    const payload = {
      resposta_cadastro
    };
    return this.api.post(ENV.cadastro+`/solicitacao/store`, payload)
      .then((response) => {
        return Promise.resolve(response);
      }).catch((response) => {
        return Promise.reject(response);
      });
  }

  carregaResposta(id) {
    return this.api.get(ENV.cadastro+'/resp/show/'+id)
    .then((response) => {
      return Promise.resolve(response);
    }).catch((response) => {
      return Promise.reject(response);
    });
  }
}
