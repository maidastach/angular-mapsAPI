import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeteoService {

  placeSource = new BehaviorSubject<any>('')  
  place = this.placeSource.asObservable();

  constructor(private http: HttpClient) { }


  getWeather(request: any): Observable<any>
  {
    return this.http.get<any>(`https://api.open-meteo.com/v1/forecast?latitude=${request.lat}&longitude=${request.lng}&hourly=temperature_2m&daily=sunrise,sunset&timezone=Australia%2FSydney&past_days=0`)
  }
}
