import { AfterViewInit, Component, OnInit } from '@angular/core';
import { PlacesService } from 'src/app/services/map/places/places.service';
import { FormControl } from '@angular/forms';
import { MeteoService } from 'src/app/services/meteo/meteo.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit, AfterViewInit
{
  map!: any
  service!: any;
  infowindow!: any;
  placeToSearch = new FormControl('');
  places: any[] = []
  loading!: boolean;

  constructor(private MapService: PlacesService, private MeteoService: MeteoService) { }

  ngAfterViewInit(): void
  {
    this.MapService.initMap() //init map default on Sydney
  }

  ngOnInit(): void
  {
    this.MapService
      .places
        .subscribe(
          places => {
            this.places = places
            console.log(places);
            this.loading = false
          }
        )
  }

  searchPlace(event: any): void
  {
    this.loading = true;
    event.preventDefault()
    this.MapService.findPlace(this.placeToSearch.value)
    this.placeToSearch.setValue('')
  }

  loadWeather(place: any): void
  {
    console.log(place);
    this.MeteoService.getWeather({ lat: place.geometry.location.lat(), lng: place.geometry.location.lng()}).subscribe(data => this.MeteoService.placeSource.next(data))
  }

}
