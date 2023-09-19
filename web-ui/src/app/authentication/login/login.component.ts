import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';
import { BehaviorSubject, Subject, catchError, of, tap } from 'rxjs';
import { DeclarationListEmitMode } from '@angular/compiler';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit{

  username:string ='';
  password:string ='';
  editFormGroup : FormGroup;

  genericErrorMessage$:BehaviorSubject<string> = new BehaviorSubject<string>('');


  constructor(private formBuilder: FormBuilder,
            private accountService:AccountService,
            private router:Router,private detector:ChangeDetectorRef ){
    
  }

  ngOnInit(): void {
    this.buildForm();
  }

  onSubmitLoginForm() {
    if(this.editFormGroup.valid){

      this.genericErrorMessage$.next(''); //clear any error message


      this.accountService
      .login$(this.editFormGroup.value)
      .pipe(
        tap(() => this.router.navigateByUrl('app/todo')),
        catchError((error) => of(this.handleLoginError(error)))
      )
      .subscribe();
     
    }
  }

  handleLoginError(error: any): any {
    this.genericErrorMessage$.next("Invalid credentials.");
    this.detector.detectChanges();
  }

  private buildForm(){
    this.editFormGroup = this.formBuilder.group({
      username: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required),
      rememberMe : [false]
    });
  }

}
