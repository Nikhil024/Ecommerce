import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApplicationProperties} from '../properties/applicationproperties';
import {User} from '../app-models/user.model';

@Injectable()
export class RegisterService {
  private registerUrl = ApplicationProperties.BackendRestUrl + 'register';

  constructor (private httpClient: HttpClient) {}

  register(user: User) {
    return this.httpClient.post<string>(this.registerUrl, user);
  }
}
