import { Component, OnInit } from '@angular/core';
import {LoginService} from '../app-services/login.service';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {RegisterService} from '../app-services/register.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 public loggedIn = false;
  constructor(private loginService: LoginService, private routerLink: ActivatedRoute,
              private router: Router,
              public registerService: RegisterService) { }

  ngOnInit() {
      this.loginService.loginBanner.subscribe(
    response => {
      if (response) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    },
    error => {
      this.loggedIn = false;
    }
  );
  }

  login(form: NgForm) {
    this.loginService.login(form.value.username, form.value.password).subscribe(
      res => {
            localStorage.setItem('xAuthToken', res['token']);
            console.log(JSON.stringify(res));
            this.loginService.loginBanner.next(true);
            this.router.navigate(['/']);
      },
      error => {
        document.getElementById('wrongLoginButton').click();
        console.log('error2:: ' + JSON.stringify(error));
      }
    );
  }

}
