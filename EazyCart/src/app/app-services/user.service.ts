import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApplicationProperties} from '../properties/applicationproperties';
import {User} from '../app-models/user.model';

@Injectable()
export class UserService {
  private getUserUrl = ApplicationProperties.BackendRestUrl + 'getUser';
  private getAllUsersUrl = ApplicationProperties.BackendRestUrl + 'getAllUsers';
  private enableUsersUrl = ApplicationProperties.BackendRestUrl + 'admin/enableUser';

  constructor(private httpClient: HttpClient) {}

  getUser() {
    const headers = new HttpHeaders({
      'x-auth-token': localStorage.getItem('xAuthToken')
    });
    return this.httpClient.post<User>(this.getUserUrl, {headers: headers});
  }

  getAllUsers() {
    const headers = new HttpHeaders({
      'x-auth-token': localStorage.getItem('xAuthToken')
    });
    return this.httpClient.post<User[]>(this.getAllUsersUrl, {headers: headers});
  }

  enableUser(user: User) {
    const headers = new HttpHeaders({
      'x-auth-token': localStorage.getItem('xAuthToken')
    });
    return this.httpClient.post(this.enableUsersUrl, user, {headers: headers});
  }
}
