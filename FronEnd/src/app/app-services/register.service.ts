import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApplicationProperties} from '../properties/applicationproperties';
import {User} from '../app-models/user.model';
import { HttpHeaders } from '@angular/common/http';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class RegisterService {
  private registerUrl = ApplicationProperties.BackendRestUrl + 'register';
  private createNewUserUrl = ApplicationProperties.BackendRestUrl + 'admin/addUser';
  public status = false;
  constructor (private httpClient: HttpClient) {}

  register(user: User) {
    return this.httpClient.post(this.registerUrl, user, {responseType: 'text'});
  }
  registerNewUser(user: User) {
    const headers = new HttpHeaders({
      'x-auth-token': localStorage.getItem('xAuthToken')
    });
     return this.httpClient.post(this.createNewUserUrl, user, {headers: headers});
  }
}
