import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { FormValidator } from 'src/app/shared/helper/formValidator';
import { MoreInfo } from 'src/app/shared/model/more-info';
import { NgIf, NgClass } from '@angular/common';
import { InputRefDirective } from '../../directives/input-ref.directive';
import { InputComponentComponent } from '../../shared/components/input-component/input-component.component';
@Component({
    selector: 'app-more-info',
    templateUrl: './more-info.component.html',
    styleUrls: ['./more-info.component.css'],
    standalone: true,
    imports: [ReactiveFormsModule, InputComponentComponent, InputRefDirective, NgIf, NgClass]
})
export class MoreInfoComponent implements OnInit{
  moreInfoSubscriber: any;
  moreInfoUpdateSubscriber: any;
  constructor(private profileService: ProfileService, private toastr: ToastrService){}

  moreInfoForm = new FormGroup({
    address: new FormControl('', [FormValidator.addressValidator()]),
    phone: new FormControl('', [Validators.pattern('^[0-9]+$'), FormValidator.lengthValidator(5)]),
    email: new FormControl('', [Validators.email])
  });

  ngOnInit(){
    const userId = localStorage.getItem('user-id');
    
    if(userId){
      this.moreInfoSubscriber = this.profileService.getProfileMoreInfo(userId).subscribe(data =>{
        if(data){
          this.moreInfoForm.patchValue({ address: data.address });
          this.moreInfoForm.patchValue({ phone: data.phone });
          this.moreInfoForm.patchValue({ email: data.email });
        }
      })
    }
  }

  onClickSave(){
    if(this.moreInfoForm.valid){
      const moreInfo: MoreInfo ={
        address: this.address ?? '',
        phone: this.phone ?? '',
        email: this.email ?? ''
      };
      this.moreInfoUpdateSubscriber = this.profileService.updateMoreInfo(moreInfo).subscribe(response =>{
        if(response){
          this.toastr.success('successfully updated');
        }
        else{
          this.toastr.error('something went wrong. Please try again');
        }
      });
    }
  }

  get address(){
    return this.moreInfoForm.get('address')?.value;
  }

  get phone(){
    return this.moreInfoForm.get('phone')?.value;
  }

  get email(){
    return this.moreInfoForm.get('email')?.value;
  }

  ngOnDestroy(): void {
    if(this.moreInfoSubscriber){
      this.moreInfoSubscriber.unsubscribe();
    }
    if(this.moreInfoUpdateSubscriber){
      this.moreInfoUpdateSubscriber.unsubscribe();
    }
  }

}
