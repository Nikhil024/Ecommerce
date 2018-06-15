import { Component, OnInit } from '@angular/core';
import {LoginService} from '../app-services/login.service';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  providers: [LoginService]
})
export class ProductListingComponent implements OnInit {

  private loggedIn = false;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  login() {
    this.loginService.login('hh','p').subscribe(
      res => {
        console.log(JSON.stringify(res['token']));
        localStorage.setItem("xAuthToken", res['token'])
        this.loggedIn = true;
      },
      error => {
        console.log('a::::::::::: ' + error)
      }
    );
  }

}
