import { Component, OnInit } from '@angular/core';
import {OrderService} from '../app-services/order.service';
import {Order} from '../app-models/order.model';
import {CartService} from '../app-services/cart.service';

@Component({
  selector: 'app-comfirmation',
  templateUrl: './product-confirmation.component.html',
  styleUrls: ['./product-confirmation.component.css']
})
export class ProductConfirmationComponent implements OnInit {

  constructor(private orderService: OrderService,
              private cartService: CartService) { }
  public order: number;
  ngOnInit() {
    this.orderService.order.subscribe(
      (order: number) => {
        this.order = order;
        console.log(JSON.stringify(order));
        this.cartService.removeCartUser().subscribe(
          response => {
            console.log('yes!!');
          }
        );
    }
    );
  }

  mail(order: Order) {
    window.open('mailto:admin@shop.com?subject=AboutOrder' + order.id + '&body=Query', '_self');
  }

}
