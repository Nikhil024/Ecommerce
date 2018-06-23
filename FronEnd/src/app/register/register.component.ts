import { Component, OnInit } from '@angular/core';
import {NgModel} from '@angular/forms';
import {RegisterService} from '../app-services/register.service';
import {User} from '../app-models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private user: User;
  constructor(private registerService: RegisterService) { }

  ngOnInit() {
  }

  register(form: NgModel) {
    const user = new User(form.value.username, form.value.password, form.value.confirmPassword);
    this.registerService.register(user).subscribe(
      response => { console.log('success ' + JSON.stringify(response)); },
      error => { console.log('error ' + JSON.stringify(error)); }
    );
  }
}
