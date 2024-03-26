import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, of, tap, map, catchError } from 'rxjs';
import { User } from 'src/app/shared/model/user';
import { environment } from 'src/environment';
import { SettingsService } from '../settings/settings.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseApiUrl: string = `${environment.baseApiUrl}/user/`;
  private subject = new Subject<any>();
  private loggedIn: boolean = false;
  
  constructor(private http: HttpClient, private settingsService: SettingsService) {}

  loginUser(username: string, password: string): Observable<User | undefined> {
    const body = { username, password };
    return this.http.post<User>(`${this.baseApiUrl}login`, body).pipe(
      map(user=> {
        if(user){
          console.log(user);
          console.log(user.username);
          localStorage.setItem('token', user.token);
          localStorage.setItem('user-id', user.id.toString());
          localStorage.setItem('user-name', user.username);
          this.isLoggedIn();
          return user;
        }
        else{
          return undefined;
        }
      }),
      catchError((error: any) => {
        console.error('Error occurred while logging in:', error);
        return of(undefined); // Return undefined in case of an error
      })
    )
  }

  isLoggedIn(){
    this.loggedIn = localStorage.getItem('token') != null;
    this.subject.next(this.loggedIn);
    return this.loggedIn;
  }

  logOut(){
    localStorage.clear();
    this.settingsService.destroySettings();
    this.loggedIn = false;
    this.subject.next(this.loggedIn);
  }

  getLoggedInState(): Observable<any>{
    return this.subject.asObservable();
  }
}
