import { Component } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';

import { HomePage } from '../../pasageway/home/home.page';
import { SignupPage } from '../signup/signup';
import { PasswordRecoveryPage} from '../resetPassword/resetPassword';
import { AuthServiceProvider } from '../../../../providers/auth-service/auth-service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { EmailValidator } from '../../../../validators/email';
import { PasswordValidator } from '../../../../validators/password';
import { App } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  formGroup : FormGroup;
  txtEmail: AbstractControl;
  txtPassword: AbstractControl;

  constructor(
    public appCtrl: App, 
    public navCtrl: NavController, 
    public auth: AuthServiceProvider, 
    public alertCtrl: AlertController, 
    public formBuilder: FormBuilder,
    private router : Router,
    ) {
    this.formGroup = formBuilder.group({
      txtEmail: ['', Validators.compose([Validators.required, Validators.maxLength(50), EmailValidator.isValid])],
      txtPassword: ['', Validators.compose([Validators.required, Validators.maxLength(10), PasswordValidator.isValid])]
    });
    this.txtEmail = this.formGroup.controls['txtEmail'];
    this.txtPassword = this.formGroup.controls['txtPassword'];
  }

  login() {
    this.auth.login(this.txtEmail.value, this.txtPassword.value).then((response) => {
      this.router.navigateByUrl('/');
      //this.appCtrl.getRootNav().setRoot(HomePage);
    }).catch((err) => {
      /*const alert = this.alertCtrl.create({
        title: 'Autenticação',
        subTitle: 'Email ou senha inválidos. Tente novamente.',
        buttons: ['Fechar']
      });
      alert.present();*/
    })
  }

  signUp() {
    //this.navCtrl.push(SignupPage);
  }

  passwordRecovery(){
    //this.navCtrl.push(PasswordRecoveryPage);
  }
}
