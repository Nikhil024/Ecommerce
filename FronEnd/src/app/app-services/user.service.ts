import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApplicationProperties} from '../properties/applicationproperties';
import {User} from '../app-models/user.model';

@Injectable()
export class UserService {
  private getUserUrl =  ApplicationProperties.BackendRestUrl + 'getUser';

  constructor(private httpClient: HttpClient) {}

  getUser() {
    const headers = new HttpHeaders({
      'x-auth-token': localStorage.getItem('xAuthToken')
    });
    return this.httpClient.post<User>(this.getUserUrl, {headers: headers});
  }
}
