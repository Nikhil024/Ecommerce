import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApplicationProperties} from '../properties/applicationproperties';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class LoginService implements OnInit {
  private loginUrl = ApplicationProperties.BackendRestUrl + 'login';
  private tokenUrl = ApplicationProperties.BackendRestUrl + 'token';
  private checkSessionUrl = ApplicationProperties.BackendRestUrl + 'token';
  private logoutUrl =  ApplicationProperties.BackendRestUrl + 'userLogout';
  public loginBanner = new Subject();
  public searchFilter = new Subject();

  ngOnInit() { }

  constructor(private httpClient: HttpClient) {}

  login (username: string, password: string) {
    const encodedCredentials = btoa(username + ':' + password);
    const basicHeader = 'Basic ' + encodedCredentials;
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': basicHeader
    });
    return this.httpClient.post(this.loginUrl , 'username=' + username + '&password=' + password, { headers: headers});
  }

  getToken (username: string, password: string) {
    const encodedCredentials = btoa(username + ':' + password);
    const basicHeader = 'Basic ' + encodedCredentials;
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': basicHeader
    });
    return this.httpClient.get(this.tokenUrl , {headers: headers});
  }


  checkSession () {
    const headers = new HttpHeaders({
      'x-auth-token': localStorage.getItem('xAuthToken')
    });
    return this.httpClient.get(this.checkSessionUrl , {headers: headers});
  }

  logout() {
    const headers = new HttpHeaders({
      'x-auth-token': localStorage.getItem('xAuthToken')
    });
    return this.httpClient.post(this.logoutUrl, {headers: headers});
  }

  isAuthenticated() {
    console.log('aaaaa ' + localStorage.getItem('xAuthToken'));
    return localStorage.getItem('xAuthToken') != null;
  }

}
