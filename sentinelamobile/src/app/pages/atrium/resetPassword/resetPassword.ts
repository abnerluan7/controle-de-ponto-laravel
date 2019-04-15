import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { ApiProvider } from '../../../../providers/api-service/api';


@Component({
  selector: 'page-reset',
  templateUrl: 'resetPassword.html'
})
export class PasswordRecoveryPage {

  @ViewChild('email') txtEmail;
  constructor(public navCtrl: NavController, public api: ApiProvider, public alertCtrl: AlertController) {
  }
  sendEmail() {
    if (this.txtEmail.value == "" ) {
      /*const alert = this.alertCtrl.create({
        title: 'Erro',
        subTitle: 'Email não pode ser Vazio',
        buttons: ['Fechar']
      });
      alert.present();*/
    } else {
        let postParams = {
          email: this.txtEmail.value
        }

        this.api.post("/password/email", postParams)
          .then(data => {
            /*const alert = this.alertCtrl.create({
              title: 'Sucesso',
              subTitle: 'Email enviado com sucesso',
              buttons: ['Fechar']
            });
            alert.present();*/
          }).catch(error => {
            /*const alert = this.alertCtrl.create({
              title: 'Sucesso',
              subTitle: 'Email enviado com sucesso',
              buttons: ['Fechar']
            });
            alert.present();*/
          });

      }
    }
}
