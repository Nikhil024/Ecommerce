import { Address } from '../app-models/address.model';
import { ApplicationProperties } from '../properties/applicationproperties';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AddressService {
getAddressUrl = ApplicationProperties.BackendRestUrl + 'getAddress';
  
  constructor(private httpClient: HttpClient) { }
  
  
  getAddress() {
    return this.httpClient.get<Address[]>(this.getAddressUrl);
  }

}
