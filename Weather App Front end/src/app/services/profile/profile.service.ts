import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, of } from 'rxjs';
import { BasicInfo } from 'src/app/shared/model/basic-info';
import { MoreInfo } from 'src/app/shared/model/more-info';
import { Profile } from 'src/app/shared/model/profile';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private baseApiUrl = `${environment.baseApiUrl}/profile/`;
  profile : Profile | undefined;
  basicInfo: BasicInfo | undefined;
  moreInfo: MoreInfo | undefined;

  constructor(private http: HttpClient) { }

  getProfile(userId: string): Observable<Profile | undefined> {
    return this.http.get<Profile>(`${this.baseApiUrl}user/${userId}`).pipe(
      map(data => {
        this.profile = data;
        return this.profile;
      }),
      catchError((error: any) => {
        console.error('Error occurred while retrieving profile:', error);
        return of(undefined); // Return undefined in case of an error
      })
    );
  }

  getProfileBasicInfo(userId: string): Observable<BasicInfo | undefined> {
    return this.http.get<BasicInfo>(`${this.baseApiUrl}user/${userId}/basic-info`).pipe(
      map(data => {
        this.basicInfo = data;
        return this.basicInfo;
      }),
      catchError((error: any) => {
        console.error('Error occurred while retrieving profile:', error);
        return of(undefined); // Return undefined in case of an error
      })
    );
  }

  getProfileMoreInfo(userId: string): Observable<MoreInfo | undefined> {
    return this.http.get<MoreInfo>(`${this.baseApiUrl}user/${userId}/more-info`).pipe(
      map(data => {
        this.moreInfo = data;
        return this.moreInfo;
      }),
      catchError((error: any) => {
        console.error('Error occurred while retrieving profile:', error);
        return of(undefined); // Return undefined in case of an error
      })
    );
  }

  updateBasicInfo(fullname: string): Observable<Profile | undefined>{
    if(this.profile !== undefined){
      this.profile.fullName = fullname;
      return this.http.put<Profile>(`${this.baseApiUrl}${this.profile.id}`, this.profile);
    }
    else{
      const userId = localStorage.getItem('user-id');
        if(userId){
          this.profile = {
            userId: parseInt(userId),
            fullName: fullname
          };
          return this.http.post<Profile>(`${this.baseApiUrl}`, this.profile);
        }
        else{
          return of(undefined);
        }
    }      
  }

  updateMoreInfo(moreInfo: MoreInfo): Observable<Profile | undefined>{
    if(this.profile !== undefined){
      this.profile.address = moreInfo.address;
      this.profile.phone = moreInfo.phone;
      this.profile.email = moreInfo.email;
      return this.http.put<Profile>(`${this.baseApiUrl}${this.profile.id}`, this.profile);
    }
    else{
      const userId = localStorage.getItem('user-id');
        if(userId){
          this.profile = {
            userId: parseInt(userId),
            address: moreInfo.address,
            phone: moreInfo.phone,
            email: moreInfo.email
          };
          return this.http.post<Profile>(`${this.baseApiUrl}`, this.profile);
        }
        else{
          return of(undefined);
        }
    }      
  }
}
