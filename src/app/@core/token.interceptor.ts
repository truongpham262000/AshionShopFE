import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  headers = {
    "Access-Control-Allow-Origin": "http://localhost:8500",
  };

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const myToken = this.auth.getToken();

    if(myToken) {
      request = request.clone({
        setHeaders: {Authorization: `Bearer ${ myToken }`} //Set token authorization
      });
    }

    request = request.clone({ setHeaders: this.headers });

    return next.handle(request);
  }
}
