import { Inject, Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginResponse } from 'src/app/authentication/authenticationTypes';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(@Inject('apiBaseUrl') private apiBaseUrl: string) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

   let tokenLoginResponse:LoginResponse = null ;

   if(localStorage.getItem('access_token'))
   {
     tokenLoginResponse =  JSON.parse(localStorage.getItem('access_token')) as LoginResponse;
   }

    const newRequest = request.clone({
      url: `${this.apiBaseUrl}${request.url}`,
      setHeaders: { 'Content-Type': 'application/json','Authorization':`Bearer ${tokenLoginResponse?.token}` }
    });

    return next.handle(newRequest);
  }
}
