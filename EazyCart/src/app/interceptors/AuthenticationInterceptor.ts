import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  private authReq: HttpRequest<any>;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.authReq = req;
    if (localStorage.getItem('xAuthToken') !== null) {
      this.authReq = req.clone({ headers: req.headers.set('Authorization', 'Basic ' + localStorage.getItem('xAuthToken'))});
    }
    return next.handle(this.authReq);
  }
}
