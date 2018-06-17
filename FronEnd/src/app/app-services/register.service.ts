import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApplicationProperties} from '../properties/applicationproperties';
import {User} from '../app-models/user.model';

@Injectable()
export class RegisterService {

  constructor (private httpClient: HttpClient) {}

  register(user: User) {
    const url = ApplicationProperties.BackendRestUrl + 'register';
    console.log('user::::: ' + user.username + ' :::: ' + user.password + ' ::: ' + user.confirmPassword);
    return this.httpClient.post<User>(url, user);
  }
}
