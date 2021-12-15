import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
declare const google: any;

@Injectable({
  providedIn: 'root'
})

export class PlacesService
{
  map!: any
  service!: any;
  infowindow!: any;
  location!: any
  placesSource = new BehaviorSubject<any[]>([])
  places = this.placesSource.asObservable();

  constructor() { }

  initMap(lat: number = -33.867, lng: number = 151.195): void //default view on Sydney
  {
    this.location = new google.maps.LatLng(lat, lng);
    this.infowindow = new google.maps.InfoWindow();

    this.map = new google.maps.Map(
        document.getElementById('map'),
        { center: this.location, zoom: 15 }
    )
  }

  findPlace(place: string): void
  {
    const createMarker = (place: any): void =>
    {
      if(!place.geometry || !place.geometry.location)
        return

      const marker = new google.maps.Marker(
        {
          map: this.map,
          position: place.geometry.location
        }
      )

      google.maps.event.addListener(marker, "click", () => {
        this.infowindow.setContent(place.name || "");
        this.infowindow.open(this.map);
      });
    }

    const request = {
      query: place,
      fields: ['name', 'geometry', 'formatted_address'],
      locationBias: {radius: 100000, center: this.location }
    }

    const callback = (results: any, status: any): void =>
    {
      if(status === google.maps.places.PlacesServiceStatus.OK && results)
      {
        for(let i = 0; i < results.length; i++)
          createMarker(results[i])
        this.placesSource.next(results)
        this.map.setCenter(results[0].geometry.location)
      }
    }

    const service = new google.maps.places.PlacesService(this.map)

    service.findPlaceFromQuery(
      request,
      callback
    )
  }

}
