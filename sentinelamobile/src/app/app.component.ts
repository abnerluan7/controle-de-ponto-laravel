import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Router } from '@angular/router';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router : Router,
    private auth: AuthServiceProvider
  ) {
    auth.isAuthenticated().then(response => {
      if(response) {
        this.router.navigateByUrl('/');
      } else {
        this.router.navigateByUrl('/login');
      }
    }); 
    
    this.initializeApp();
  }

  initializeApp() {
    if (this.platform.is('cordova')) {
      this.platform.ready().then(() => {
        this.statusBar.styleDefault();
        this.splashScreen.hide();
      });
    }
  }

}
