import { Injectable } from '@angular/core';
import { LoginRequest, LoginResponse } from './authenticationTypes';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http:HttpClient) { }

  login$(loginParams: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('/account/login', loginParams).pipe(
      tap((response) => {
        //this.user = response.user;
        //this.setCurrentUserType(UserTypeEnum.ScootMember);
        this.handleAuthentication(response as LoginResponse, loginParams);
      }),
      catchError((error) => this.handleLoginError(error, loginParams.username))
    );
  }



  private handleLoginError(error: HttpErrorResponse, email: string) {
    let errorMessage = '';

    console.log('handleError',error)
    if (error.status == 401) {
      // this.incrementInvalidLoginCount(email);
      //errorMessage = this.getInvalidLoginMessage(email);
    } else {
      // errorMessage = this.keyErrorMes['label.login.member.generic.error.label'];
    }

    return throwError(() => errorMessage);
  }

  private handleAuthentication(loginResponse: LoginResponse, LoginRequest: LoginRequest) {
    console.log('handleAuthentication',loginResponse);

    localStorage.removeItem("access_token");

    localStorage.setItem("access_token", JSON.stringify(loginResponse));

    //TODO : implement remember me
    // if (loginParams.rememberMe) {
    //   localStorage.setItem(Constants.localStorage.UserName, loginParams.email);
    // } else {
    //   localStorage.removeItem(Constants.localStorage.UserName);
    // }

    // this.currentUserSource.next(user);
  }
}
