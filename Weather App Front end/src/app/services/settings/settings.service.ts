import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, switchMap } from 'rxjs';
import { LocationData } from 'src/app/shared/model/location';
import { Settings } from 'src/app/shared/model/settings';
import { environment } from 'src/environment';
import { LocationService } from '../location/location.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private baseApiUrl = `${environment.baseApiUrl}/user-settings/`;
  settings : Settings | undefined;
  savedLocation: LocationData | undefined;

  constructor(private http: HttpClient, private locationService: LocationService) { }

  getSettings(userId: string): Observable<Settings | undefined> {
    if(this.settings !== undefined){
      return of(this.settings);
    }
    return this.http.get<Settings>(`${this.baseApiUrl}user/${userId}`).pipe(
      map(data => {
        this.settings = data;
        return this.settings;
      }),
      catchError((error: any) => {
        console.error('Error occurred while retrieving settings:', error);
        return of(undefined); // Return undefined in case of an error
      })
    );
  }

  getSavedLocation(userId: string): Observable<LocationData | undefined> {
    if(this.savedLocation !== undefined){
      return of(this.savedLocation);
    }
    return this.getSettings(userId).pipe(
      switchMap(data => {
        if (data && data.locationId) {
          return this.locationService.getLocationObject(data.locationId).pipe(
            map(locationData => {
              this.savedLocation = locationData;
              return this.savedLocation;
            }),
            catchError((error: any) => {
              console.error('Error occurred while retrieving location:', error);
              return of(undefined); // Return undefined in case of an error
            })            
          );
        } else {
          return of(undefined);
        }
      })
    );
  }

  updateSettingsUnit(unit: string): Observable<Settings | undefined>{
    if(this.settings !== undefined){
      this.settings.unit = unit;
      return this.http.put<Settings>(`${this.baseApiUrl}${this.settings.id}`, this.settings);
    }
    else{
      const userId = localStorage.getItem('user-id');
        if(userId){
          this.settings = {
            userId: parseInt(userId),
            unit: unit
          };
          return this.http.post<Settings>(`${this.baseApiUrl}`, this.settings);
        }
        else{
          return of(undefined);
        }
    }      
  }

  updateSettingsLocation(locationId: number): Observable<Settings | undefined>{
    this.savedLocation = undefined;
    if(this.settings !== undefined){
      this.settings.locationId = locationId;
      return this.http.put<Settings>(`${this.baseApiUrl}${this.settings.id}`, this.settings).pipe(map(response=>{
        if(response){
          this.savedLocation = undefined;
        }
        return response;
      }));
    }
    else{
      const userId = localStorage.getItem('user-id');
        if(userId){
          this.settings = {
            userId: parseInt(userId),
            locationId: locationId
          };
          return this.http.post<Settings>(`${this.baseApiUrl}`, this.settings).pipe(map(response=>{
            if(response){
              this.savedLocation = undefined;
            }
            return response;
          }));
        }
        else{
          return of(undefined);
        }
    }
  }

  destroySettings(){
    this.settings = undefined;
    this.savedLocation = undefined;
  }
}
