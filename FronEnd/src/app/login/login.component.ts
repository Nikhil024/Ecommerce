import { Component, OnInit } from '@angular/core';
import {LoginService} from '../app-services/login.service';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private routerLink: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
  }

  login(form: NgForm) {
    this.loginService.login(form.value.username, form.value.password).subscribe(
      res => {
        this.loginService.getToken (form.value.username, form.value.password).subscribe(
          response => {
            localStorage.setItem('xAuthToken', response['token']);
            console.log(JSON.stringify(response));
            this.loginService.loginBanner.next(true);
            this.router.navigate(['/']);
          },
          error => console.log('error:: ' + JSON.stringify(error))
        );
      },
      error => {
        alert('error:: ' + error['text']);
      }
    );
  }

}
