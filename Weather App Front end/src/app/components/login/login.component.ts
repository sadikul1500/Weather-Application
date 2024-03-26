import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormValidator } from 'src/app/shared/helper/formValidator';
import { NgIf, NgClass } from '@angular/common';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    standalone: true,
    imports: [ReactiveFormsModule, NgIf, NgClass]
})
export class LoginComponent implements OnInit, OnDestroy{
  subscriber: any;
  constructor(private authService: AuthService, private route: Router, private toastr: ToastrService){}

  ngOnInit(){
  }

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, FormValidator.usernameValidator()]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)])
  });

  onLoginUserClick(){
    if(this.loginForm.valid && this.username && this.password){
      this.subscriber = this.authService.loginUser(this.username, this.password).subscribe((matcheduser)=> {
        if(matcheduser){
          this.route.navigate(['settings']);
        }
        else{
          this.loginForm.reset();
          this.toastr.error('Invalid username or password', 'Login Failed');
        }
      });      
    }
  }

  get username(){
    return this.loginForm.get('username')?.value;
  }

  get password(){
    return this.loginForm.get('password')?.value;
  }

  ngOnDestroy(){
    if(this.subscriber){
      this.subscriber.unsubscribe();
    }
  }
}
