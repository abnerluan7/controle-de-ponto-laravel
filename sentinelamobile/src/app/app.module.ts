import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutes } from './app.routes';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { ApiProvider } from '../providers/api-service/api';
import { UserServiceProvider } from '../providers/user-service/user-service';
import { PasswordRecoveryPage } from './pages/atrium/resetPassword/resetPassword';
import { SignupPage } from './pages/atrium/signup/signup';
import { IonicStorageModule } from '@ionic/storage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginPage } from './pages/atrium/login/login';
import { HttpModule } from '@angular/http';
import { ConsultasPage } from './pages/modulos/cad/consultas/consultas.page';
import { ConsultasProvider } from '../providers/modulos/cad/consultas/consultas';
import { SolicitacaosPage } from './pages/modulos/cad/solicitacao/solicitacao.page';
import { RespostasPage } from './pages/modulos/cad/respostas/respostas.page';


@NgModule({
  declarations: [
    AppComponent,
    PasswordRecoveryPage,
    LoginPage,
    SignupPage,
    ConsultasPage,
    SolicitacaosPage,
    RespostasPage
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot({ backButtonText: 'Atrás' }),
    RouterModule.forRoot(AppRoutes),
    IonicStorageModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthServiceProvider,
    ApiProvider,
    UserServiceProvider,
    ConsultasProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
