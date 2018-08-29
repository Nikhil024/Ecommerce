import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {LoginService} from './app-services/login.service';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthGaurd implements CanActivate {

  constructor (private loginService: LoginService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.loginService.isAuthenticated()) {
        return true;
    } else {
      return false;
    }
  }
}
