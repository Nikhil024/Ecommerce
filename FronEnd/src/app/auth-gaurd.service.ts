import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {LoginService} from './app-services/login.service';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthGaurd implements CanActivate {

  constructor (private loginService: LoginService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.loginService.isAuthenticated();
  }

}
