import { Component, OnInit, ViewChild } from '@angular/core';
// import { Router } from '@angular/router';

import { LoadingController, Content } from '@ionic/angular';
import { AuthServiceProvider } from '../../../../providers/auth-service/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  segment: string;
  page: number;
  @ViewChild(Content) content: Content;

  constructor(
    // private router: Router,
    private loadingCtrl: LoadingController, 
    public auth: AuthServiceProvider,
    private router : Router,
  ) {}

  ngOnInit() {
    this.onTabSelected('hottest');
  }

  onTabSelected(segmentValue: string) {
    this.segment = segmentValue;
    this.page = 1;
    this.content.scrollToTop();
  }

  logout(){
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }

  nav(){
    this.router.navigateByUrl('/consultas');
  }

  // onSearch() {
  //   this.router.navigate(['search']);
  // }



}
