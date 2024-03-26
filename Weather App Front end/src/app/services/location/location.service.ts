import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, Subject, tap} from 'rxjs';
import { LocationData } from 'src/app/shared/model/location';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private baseApiUrl = `${environment.baseApiUrl}/location/`;
  private locations: LocationData[] = [];

  constructor(private http: HttpClient) {}

  getLocations(): Observable<LocationData[]>{
    if(this.locations.length > 0) return of(this.locations);
    
    else return this.http.get<LocationData[]>(this.baseApiUrl).pipe(
      tap((data: LocationData[]) => {
        this.locations = data;
      })
    );
  }

  getLocationObject(id: number): Observable<LocationData | undefined>{
    return this.http.get<LocationData>(`${this.baseApiUrl}${id}`).pipe(map(
      location => {
        if(location){
          return location;
        }
        else{
          return undefined;
        }
      }
    ),
    catchError((error: any) => {
      console.error('Error occurred while logging in:', error);
      return of(undefined); // Return undefined in case of an error
    }))
  }
}
