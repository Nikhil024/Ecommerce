import { Component, OnInit } from '@angular/core';
import {LoginService} from '../app-services/login.service';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  providers: [LoginService]
})
export class ProductListingComponent implements OnInit {

  loggedIn = false;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    console.log('this.loggedIn3::: ' + this.loggedIn);
    this.loginService.checkSession().subscribe(
      response => {this.loggedIn = true;
        console.log('this.loggedIn4::: ' + this.loggedIn);
        },
      error => this.loggedIn = false

    );

  }

  login() {
    this.loginService.login('nikhil', 'p').subscribe(
      res => {
        this.loginService.getToken ('nikhil', 'p').subscribe(
          response => {
            localStorage.setItem('xAuthToken', response['token']);
            console.log(JSON.stringify(response));
          },
          error => console.log(JSON.stringify(error))
        );
        alert('Successfull Login!!!');
        this.loggedIn = true;
      },
      error => {
        alert('login Failed!!!');
      }
    );
  }

  logout() {
    console.log('this.loggedIn::: ' + this.loggedIn);
    this.loggedIn = false;
    console.log('this.loggedIn1::: ' + this.loggedIn);
    this.loginService.logout().subscribe(
      response => {
        console.log('this.loggedIn2::: ' + this.loggedIn);
        localStorage.clear();
      },
      error => {
        this.loggedIn = true;
      }
    );
  }
}
