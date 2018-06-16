import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class LoginService implements OnInit {
  private url;
  private encodedCredentials;
  private basicHeader;
  private headers;

  ngOnInit() { }

  constructor(private httpClient: HttpClient) {}

  login (username: string, password: string) {
    this.url = 'http://localhost:8080/personal/login';
    this.encodedCredentials = btoa(username + ':' + password);
    this.basicHeader = 'Basic ' + this.encodedCredentials;
    this.headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    return this.httpClient.post(this.url , 'username=' + username + '&password=' + password, { headers: this.headers});
  }

  getToken (username: string, password: string) {
    this.url = 'http://localhost:8080/personal/token';
    this.encodedCredentials = btoa(username + ':' + password);
    this.basicHeader = 'Basic ' + this.encodedCredentials;
    this.headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': this.basicHeader
    });
    return this.httpClient.get(this.url , {headers: this.headers});
  }


  checkSession () {
    this.url = 'http://localhost:8080/personal/token';
    this.headers = new HttpHeaders({
      'x-auth-token': localStorage.getItem('xAuthToken')
    });
    return this.httpClient.get(this.url , {headers: this.headers});
  }

  logout() {
    this.headers = new HttpHeaders({
      'x-auth-token': localStorage.getItem('xAuthToken')
    });
    this.url = 'http://localhost:8080/personal/logouts';
    return this.httpClient.post(this.url, {headers: this.headers});
  }

}
