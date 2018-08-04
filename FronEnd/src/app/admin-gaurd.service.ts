import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {LoginService} from './app-services/login.service';
import {Injectable} from '@angular/core';
import {UserService} from './app-services/user.service';
import {User} from './app-models/user.model';

@Injectable()
export class AdminGaurd implements CanActivate {

  constructor (private loginService: LoginService,
               private userService: UserService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
   if (this.loginService.isAuthenticated()) {
      this.userService.getUser().subscribe(
        (user: User) => {
          if (user.role === 'ROLE_ADMIN') {
            return true;
          } else {
            return false;
          }
     }
      );
   } else {
     return false;
   }
  }

}
