import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { LocationService } from 'src/app/services/location/location.service';
import { LocationData } from '../../model/location';
import { SettingsService } from 'src/app/services/settings/settings.service';
import { NgIf, NgFor } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
    selector: 'app-filter-location',
    templateUrl: './filter-location.component.html',
    styleUrls: ['./filter-location.component.css'],
    standalone: true,
    imports: [ReactiveFormsModule, FormsModule, NgIf, NgFor],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class FilterLocationComponent implements OnInit, OnDestroy {
  locations: LocationData[] = [];
  @Output() onLocationChange = new EventEmitter();
  location: LocationData | undefined;
  locationId = 0;
  locationListSubscriber: any;
  savedLocationSubscriber: any;

  constructor(private locationService: LocationService, private settingsService: SettingsService, private cdr: ChangeDetectorRef){}

  ngOnInit(){
    const userId = localStorage.getItem('user-id') || null;
    if(userId){
      this.savedLocationSubscriber = this.settingsService.getSavedLocation(userId).subscribe(data =>{
        if(data){
          this.location = data;
          this.locationId = data.id;
          this.cdr.markForCheck();
        }
      })
    }
    
    this.locationListSubscriber = this.locationService.getLocations().subscribe((data)=>{
      this.locations = data;
      this.cdr.markForCheck();
    });
  }

  onLocationChangeClick(){
      const newLocation = this.locations.find(l => l.id == this.locationId);
      this.onLocationChange.emit(newLocation);
  }

  ngOnDestroy(){
    if(this.locationListSubscriber){
      this.locationListSubscriber.unsubscribe();
    }
    if(this.savedLocationSubscriber){
      this.savedLocationSubscriber.unsubscribe();
    }
  }
}
