import { Component, OnInit } from '@angular/core';
import {LoginService} from '../app-services/login.service';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html'
})
export class ProductListingComponent implements OnInit {

  loggedIn = false;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    if (!this.loggedIn) {
      this.loginService.checkSession().subscribe(
        response => {
          this.loggedIn = true;
        },
        error => {
          this.loggedIn = false;
        }
      );
    }
  }
  logout() {
    this.loginService.logout().subscribe(
      response => {
        console.log(JSON.stringify(response));
        this.loggedIn = false;
      },
      error => {
        console.log(JSON.stringify(error));
        this.loggedIn = false;
      }
    );
  }
}
