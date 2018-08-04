import { Order } from '../app-models/order.model';
import { ApplicationProperties } from '../properties/applicationproperties';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Subject} from '../../../node_modules/rxjs/Subject';

@Injectable()
export class OrderService {

  private saveNewOrderUrl = ApplicationProperties.BackendRestUrl + 'saveOrder';
  constructor(private httpClient: HttpClient) { }
  order = new Subject();

  saveOrder(order: Order) {
    return this.httpClient.post(this.saveNewOrderUrl, order);
  }

}
