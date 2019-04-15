import { Component } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';;
import { UserServiceProvider } from '../../../../providers/user-service/user-service';
import { LoginPage } from '../login/login';

import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { EmailValidator } from '../../../../validators/email';
import { PasswordValidator } from '../../../../validators/password';
import { NameValidator } from '../../../../validators/name';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  formGroup : FormGroup;
  txtName: AbstractControl;
  txtEmail: AbstractControl;
  txtPassword: AbstractControl;

  constructor(public navCtrl: NavController, private userService: UserServiceProvider, private alertCtrl: AlertController, public formBuilder: FormBuilder ) {
    this.formGroup = formBuilder.group({
      txtName: ['', Validators.compose([Validators.required, Validators.maxLength(50), NameValidator.isValid])],
      txtEmail: ['', Validators.compose([Validators.required, Validators.maxLength(50), EmailValidator.isValid])],
      txtPassword: ['', Validators.compose([Validators.required, Validators.maxLength(10), PasswordValidator.isValid])]
    });
    this.txtName = this.formGroup.controls['txtName'];
    this.txtEmail = this.formGroup.controls['txtEmail'];
    this.txtPassword = this.formGroup.controls['txtPassword'];
  }
  signUp() {
    this.userService.signUp(
      this.txtName.value.trim(),
      this.txtEmail.value.trim(),
      this.txtPassword.value.trim())
      .then(response => {
        if(response['status']==200){
          //this.navCtrl.push(LoginPage);
        }else
        {
          /*const alert = this.alertCtrl.create({
            title: response['entity'].mensagens[0].tipo,
            subTitle: response['entity'].mensagens[0].descricao,
            buttons: ['Fechar']
          });
          alert.present();*/
        }
      })
      .catch(error => {
        /*const alert = this.alertCtrl.create({
          title: 'Erro',
          subTitle: "Erro ao conectar o servidor. Por favor, entre em contato com a equipe técnica.",
          buttons: ['Fechar']
        });
        alert.present();*/
      })
  }
}
