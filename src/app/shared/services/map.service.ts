/// <reference types="googlemaps" />
import { Injectable, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { Subject, Observable } from 'rxjs';

declare var google;

@Injectable({
  providedIn: 'root'
})
export class MapService {
  public static readonly coordinates_KEY = 'coordinates';
  
  place: google.maps.places.PlaceResult;
  coordinates:  Array<Number> = [];
  address: string;
  coordsSubject = new Subject();
  addressSubject = new Subject();
  
  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) { }
  autoCompleteCities(searchElement: ElementRef) {
    this.mapsAPILoader.load()
    .then(() => {
      console.log(searchElement);
      
      const autocomplete = new google.maps.places.Autocomplete(searchElement.nativeElement, { types: [] });
      
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          this.place = autocomplete.getPlace();
          
          this.coordinates.splice(0, 2);
          this.coordinates.push(this.place.geometry.location.lng())
          this.coordinates.push(this.place.geometry.location.lat())
          this.address = this.place.formatted_address;
          this.notifyCoords();
          this.notifyAddress();
          
          if (this.place.geometry === undefined || this.place.geometry === null) {
            return;
          } 
        });
      });
    });
  }
  
  notifyCoords():void{
    this.coordsSubject.next(this.coordinates);
  }
  notifyAddress():void{
    this.addressSubject.next(this.address);
  }
  
  onCoordsChanges(){
    return this.coordsSubject.asObservable();
  }
  onAddressChanges(){
    return this.addressSubject.asObservable();
  }
  
}
