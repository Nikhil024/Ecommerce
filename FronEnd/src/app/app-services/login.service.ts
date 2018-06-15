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
    this.url = 'http://localhost:1234/personal/token';
    this.encodedCredentials = btoa(username + ':' + password);
    this.basicHeader = 'Basic ' + this.encodedCredentials;
    this.headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': this.basicHeader
    });
    return this.httpClient.get(this.url , {headers: this.headers});
  }


}
