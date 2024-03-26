import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { FormValidator } from 'src/app/shared/helper/formValidator';
import { NgIf, NgClass } from '@angular/common';
import { InputRefDirective } from '../../directives/input-ref.directive';
import { InputComponentComponent } from '../../shared/components/input-component/input-component.component';

@Component({
    selector: 'app-basic-info',
    templateUrl: './basic-info.component.html',
    styleUrls: ['./basic-info.component.css'],
    standalone: true,
    imports: [ReactiveFormsModule, InputComponentComponent, InputRefDirective, NgIf, NgClass]
})
export class BasicInfoComponent implements OnInit, OnDestroy{
  basicInfoSubscriber: any;
  basicInfoUpdateSubscriber: any;
  constructor(private profileService: ProfileService, private toastr: ToastrService){}

  basicInfoForm = new FormGroup({
    username: new FormControl('', [Validators.required, FormValidator.usernameValidator()]),
    fullname: new FormControl('', [Validators.required, Validators.minLength(4)])
  });

  ngOnInit(): void {
    const userId = localStorage.getItem('user-id');
    
    if(userId){
      this.basicInfoSubscriber = this.profileService.getProfileBasicInfo(userId).subscribe(data =>{
        if(data){
          this.basicInfoForm.patchValue({ fullname: data.fullName });
          this.basicInfoForm.patchValue({ username: data.username });
        }
      })
    }
  } 

  onClickSave(){
    if(this.basicInfoForm.valid && this.fullname){
      this.basicInfoUpdateSubscriber = this.profileService.updateBasicInfo(this.fullname).subscribe(response =>{
        if(response){
          this.toastr.success('successfully updated');
        }
        else{
          this.toastr.error('something went wrong. Please try again');
        }
      });
    }
  }

  get username(){
    return this.basicInfoForm.get('username')?.value;
  }

  get fullname(){
    return this.basicInfoForm.get('fullname')?.value;
  }

  ngOnDestroy(): void {
    if(this.basicInfoSubscriber){
      this.basicInfoSubscriber.unsubscribe();
    }
    if(this.basicInfoUpdateSubscriber){
      this.basicInfoUpdateSubscriber.unsubscribe();
    }
  }
}
