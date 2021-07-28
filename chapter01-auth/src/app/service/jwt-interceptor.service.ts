import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class JwtInterceptorService implements HttpInterceptor {

  constructor(
    private auth: AuthService,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // User data cannot be accessed without a token.
    const currentToken = this.auth.lastToken;
    //const currentUser = this.auth.currentUserValue;


    if (currentToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentToken}`
        }
      });
    }


    return next.handle(request);
  }

  //   if (currentUser && currentUser.token) {
  //     request = request.clone({
  //       setHeaders: {
  //         Authorization: `Bearer ${currentUser.token}`
  //       }
  //     });
  //   }
  //   return next.handle(request);
  // }
}
