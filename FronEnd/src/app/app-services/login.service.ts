import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApplicationProperties} from '../properties/applicationproperties';

@Injectable()
export class LoginService implements OnInit {
  private encodedCredentials;
  private basicHeader;
  private headers;

  ngOnInit() { }

  constructor(private httpClient: HttpClient) {}

  login (username: string, password: string) {
    const url = ApplicationProperties.BackendRestUrl + 'login';
    this.encodedCredentials = btoa(username + ':' + password);
    this.basicHeader = 'Basic ' + this.encodedCredentials;
    this.headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    return this.httpClient.post(url , 'username=' + username + '&password=' + password, { headers: this.headers});
  }

  getToken (username: string, password: string) {
    const url = ApplicationProperties.BackendRestUrl + 'token';
    this.encodedCredentials = btoa(username + ':' + password);
    this.basicHeader = 'Basic ' + this.encodedCredentials;
    this.headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': this.basicHeader
    });
    return this.httpClient.get(url , {headers: this.headers});
  }


  checkSession () {
    const url = ApplicationProperties.BackendRestUrl + 'token';
    this.headers = new HttpHeaders({
      'x-auth-token': localStorage.getItem('xAuthToken')
    });
    return this.httpClient.get(url , {headers: this.headers});
  }

  logout() {
    this.headers = new HttpHeaders({
      'x-auth-token': localStorage.getItem('xAuthToken')
    });
    const url =  ApplicationProperties.BackendRestUrl + 'userLogout';
    return this.httpClient.post(url, {headers: this.headers});
  }


}
