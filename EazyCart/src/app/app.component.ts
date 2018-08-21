import {Component, OnInit} from '@angular/core';
import {ProductService} from './app-services/product.service';
import {LoginService} from './app-services/login.service';
import {RegisterService} from './app-services/register.service';
import {UserService} from './app-services/user.service';
import {ProductCategoryService} from './app-services/product.category.service';
import {CartService} from './app-services/cart.service';
import { RoleService } from './app-services/role.service';
import {OrderService} from './app-services/order.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ProductService,
              LoginService,
              RegisterService,
              UserService,
              ProductCategoryService,
              CartService,
              RoleService,
              OrderService
  ]
})
export class AppComponent implements OnInit {
  title = 'app';
  constructor() { }
  ngOnInit() { }
}
