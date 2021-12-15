import { Component, OnInit } from '@angular/core';
import { PlacesService } from 'src/app/services/map/places/places.service';
import { MeteoService } from 'src/app/services/meteo/meteo.service';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-meteo',
  templateUrl: './meteo.component.html',
  styleUrls: ['./meteo.component.css']
})
export class MeteoComponent implements OnInit {
  place!: any;

  constructor(private MeteoService: MeteoService) { }

  ngOnInit(): void {

    this.MeteoService.place.subscribe(place => this.place = place)
  
    //this.MapService.places.subscribe(data => this.places = data)
    // this.MeteoService.getWeather().subscribe(data => this.weather = data);
  }

}
