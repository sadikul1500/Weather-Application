import { Component, Input, OnInit } from '@angular/core';
import { Profile } from '../../model/profile';
import { ProfileService } from 'src/app/services/profile/profile.service';

@Component({
    selector: 'app-profile-data',
    templateUrl: './profile-data.component.html',
    styleUrls: ['./profile-data.component.css'],
    standalone: true
})
export class ProfileDataComponent implements OnInit{
  @Input() userId!: string | null;
  profileData: Profile | undefined;
  constructor(private profileService: ProfileService){}
  
  ngOnInit(){
    if(this.userId){
      this.profileService.getProfile(this.userId).subscribe(data=>{
        this.profileData = data;
      })
    }
  }
}
