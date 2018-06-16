import { Component, OnInit } from '@angular/core';
import {NgModel} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  register(form: NgModel) {
    const username = form.value.username;
    const password = form.value.password;
    const confirmPassword = form.value.confirmPassword;

  }
}
