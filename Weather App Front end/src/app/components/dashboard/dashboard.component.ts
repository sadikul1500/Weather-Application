import { Component, OnDestroy, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { SettingsService } from 'src/app/services/settings/settings.service';
import { WeatherService } from 'src/app/services/weather/weather.service';
import { LocationData } from 'src/app/shared/model/location';
import { WeatherData } from 'src/app/shared/model/weather';
import { UnitPipe } from '../../shared/helper/pipes/unit.pipe';
import { ExcludeLastKeyPipe } from '../../shared/helper/pipes/excludeLastKey';
import { FilterLocationComponent } from '../../shared/components/filter-location/filter-location.component';
import { NgIf, NgFor, TitleCasePipe } from '@angular/common';
import { ProfileDataComponent } from '../../shared/components/profile-data/profile-data.component';
import { RouterLink } from '@angular/router';
import { AccordionComponent } from '../../shared/components/accordion/accordion.component';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    standalone: true,
    imports: [AccordionComponent, RouterLink, ProfileDataComponent, NgIf, FilterLocationComponent, NgFor, TitleCasePipe, ExcludeLastKeyPipe, UnitPipe]
})
export class DashboardComponent implements OnInit, OnDestroy{
  unit: string = '';
  username: string = '';
  userId!: string | null;
  location!: LocationData | null;
  weatherData!: WeatherData | null;

  // unitMapping : Record<string, string[]> = {"Kelvin": ["K", "K", "", "%", "metre/sec", "hPa"], "Celsius": ["C", "C", "", "%", "metre/sec", "hpa"], 
  //                                           "Farenheit": ["F", "F", "", "%", "miles/hr", "hPa"]};
  subscriber: any;
  locationObservable: any;
  settingsObservable: any;
  forkJoinSubscriber: any;


  constructor(private weatherService: WeatherService, private settingsService: SettingsService){}

  ngOnInit(): void {
    this.userId = localStorage.getItem('user-id') || null;
    this.username = localStorage.getItem('user-name') || '';
    if(this.userId){
      this.locationObservable = this.settingsService.getSavedLocation(this.userId);
      this.settingsObservable = this.settingsService.getSettings(this.userId);

      forkJoin({
        settings: this.settingsObservable,
        location: this.locationObservable
      }).subscribe((combinedResponse: { settings: any, location: any }) => {
        if(combinedResponse.settings && combinedResponse.settings){
          this.unit = combinedResponse.settings.unit;
        }
        if(combinedResponse.location){
          this.location = combinedResponse.location;
        }
        this.fetchWeatherData();
      });
    }
  }

  fetchWeatherData(): void {
    if(this.unit && this.location){
      this.subscriber = this.weatherService.fetchWeatherData(this.unit, this.location).subscribe((weatherData) => {
        this.weatherData = weatherData;
      })
    }
    else{
      console.log('did not find lat and lon');
    }
  }

  onChangeLocation(newLocation: LocationData): void {
    this.location = newLocation;
    this.fetchWeatherData();
  }

  ngOnDestroy(){
    if(this.subscriber){
      this.subscriber.unsubscribe();
    }
    if(this.forkJoinSubscriber){
      this.forkJoinSubscriber.unsubscribe();
    }
  }
}