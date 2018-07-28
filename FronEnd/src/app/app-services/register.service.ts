import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApplicationProperties} from '../properties/applicationproperties';
import {User} from '../app-models/user.model';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class RegisterService {
  private registerUrl = ApplicationProperties.BackendRestUrl + 'register';
  public status = false;
  constructor (private httpClient: HttpClient) {}

  register(user: User) {
    return this.httpClient.post(this.registerUrl, user, {responseType: 'text'});
  }
}
