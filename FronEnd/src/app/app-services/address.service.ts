import {Address} from '../app-models/address.model';
import {ApplicationProperties} from '../properties/applicationproperties';
import {HttpHeaders} from '@angular/common/http';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class AddressService {
  private getAddressUrl = ApplicationProperties.BackendRestUrl + 'getAddress';
  private saveAddressUrl = ApplicationProperties.BackendRestUrl + 'saveAddress';

  constructor(private httpClient: HttpClient) {}


  getAddress() {
    const headers = new HttpHeaders({
      'x-auth-token': localStorage.getItem('xAuthToken')
    });
    return this.httpClient.get<Address[]>(this.getAddressUrl, {headers: headers});
  }

  saveAddress(address:Address) {
    return this.httpClient.post<Address>(this.saveAddressUrl, address);
  }

}
