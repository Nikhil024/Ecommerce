import { Order } from '../app-models/order.model';
import { ApplicationProperties } from '../properties/applicationproperties';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class OrderService {

  private saveNewOrderUrl = ApplicationProperties.BackendRestUrl + 'saveOrder';
  
  constructor(private httpClient:HttpClient) { }
  
  saveOrder(order: Order) {
    return this.httpClient.post(this.saveNewOrderUrl, order);
  }

}
