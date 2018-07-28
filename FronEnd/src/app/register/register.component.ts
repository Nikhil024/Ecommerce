import { Component, OnInit } from '@angular/core';
import {NgModel} from '@angular/forms';
import {RegisterService} from '../app-services/register.service';
import {User} from '../app-models/user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private user: User;
  public alreadyExists = false;
  constructor(private registerService: RegisterService,
              private router: Router) { }

  ngOnInit() {
  }

  register(form: NgModel) {
    const user = new User(form.value.username, form.value.password, form.value.confirmPassword);
    this.registerService.register(user).subscribe(
      response => {
        console.log('success ' + response);
        this.registerService.status = true;
        this.router.navigate(['/login']);
      },
      error => {
         const errorMessage = error['error'];
          if (errorMessage === 'User already Exists') {
              this.alreadyExists = true;
          } else {
            this.router.navigate(['/errorpage']);
          }
      }
    );
  }
}
