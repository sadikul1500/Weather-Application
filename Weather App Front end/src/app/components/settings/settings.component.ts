import { Component, OnDestroy, OnInit } from '@angular/core';
import { LocationService } from 'src/app/services/location/location.service';
import { SettingsService } from 'src/app/services/settings/settings.service';
import { LocationData } from 'src/app/shared/model/location';
import { FilterLocationComponent } from '../../shared/components/filter-location/filter-location.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css'],
    standalone: true,
    imports: [ReactiveFormsModule, FormsModule, FilterLocationComponent]
})

export class SettingsComponent implements OnInit, OnDestroy{
  unit: string = '';
  location: LocationData | undefined;
  locations: LocationData[] = [];
  locationListSubscriber: any;
  locationSubscriber: any;
  unitSubscriber: any;
  unitUpdateSubscriber: any;
  locationUpdateSubscriber: any;

  constructor(private locationService: LocationService, private settingsService: SettingsService){}

  ngOnInit(){
    const userId = localStorage.getItem('user-id') || null;
    if(userId){
      this.locationSubscriber = this.settingsService.getSavedLocation(userId).subscribe(data =>{
        if(data){
          this.location = data;
        }
        else{
          console.warn('no saved location');
        }
      });
      this.unitSubscriber = this.settingsService.getSettings(userId).subscribe(data =>{
        if(data && data.unit){
          this.unit = data.unit;
        }
        else{
          console.warn('no saved units');
        }
      })
    }
    this.locationListSubscriber = this.locationService.getLocations().subscribe((data)=>{
      this.locations = data;
    });
  }
  
  onTemperatureChange(){
    this.unitUpdateSubscriber = this.settingsService.updateSettingsUnit(this.unit).subscribe(data=>{
      if(data){
        console.log(data.unit);
      }
      else{
        console.warn('could not change unit');
      }
    })
  }

  onChangeLocation(location: LocationData){
    this.locationUpdateSubscriber = this.settingsService.updateSettingsLocation(location.id).subscribe(data => {
      if(data && data.locationId){
        this.locationService.getLocationObject(data.locationId).subscribe(l=>{
          this.location = l;
        })
      }
      else{
        console.warn('could not change location');
      }
    })    
  }

  ngOnDestroy(){
    if(this.locationListSubscriber){
      this.locationListSubscriber.unsubscribe();
    }
    if(this.locationSubscriber){
      this.locationSubscriber.unsubscribe();
    }
    if(this.unitSubscriber){
      this.unitSubscriber.unsubscribe();
    }
    if(this.unitUpdateSubscriber){
      this.unitUpdateSubscriber.unsubscribe();
    }
    if(this.locationUpdateSubscriber){
      this.locationUpdateSubscriber.unsubscribe();
    }
  }
}
