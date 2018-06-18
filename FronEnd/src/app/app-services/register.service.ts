import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApplicationProperties} from '../properties/applicationproperties';
import {User} from '../app-models/user.model';

@Injectable()
export class RegisterService {

  constructor (private httpClient: HttpClient) {}

  register(user: User) {
    const url = ApplicationProperties.BackendRestUrl + 'register';
    return this.httpClient.post<string>(url, user);
  }
}
