import { Inject, Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(@Inject('apiBaseUrl') private apiBaseUrl: string) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const newRequest = request.clone({
      url: `${this.apiBaseUrl}${request.url}`,
      setHeaders: { 'Content-Type': 'application/json' }
    });

    console.log('Interceptor works',newRequest);
    return next.handle(newRequest);
  }
}
