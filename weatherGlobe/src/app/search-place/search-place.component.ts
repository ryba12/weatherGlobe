import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Gps, WeatherResponse } from 'src/app/models/models';
import { map, tap } from 'rxjs/operators';
import { HttpService } from 'src/app/services/http.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-search-place',
  templateUrl: './search-place.component.html',
  styleUrls: ['./search-place.component.scss']
})
export class SearchPlaceComponent implements OnInit {

  public placeControl = new FormControl();
  public weather$: Observable<WeatherResponse>;
  
  constructor(private httpService: HttpService, private apiService: ApiService) {}

  ngOnInit(): void {
 
  }

  getEmitLocation(location: Gps): void {
    this.getWeatherAndMap(location)
  }

  getWeatherAndMap(location: Gps): void {
   this.weather$ = this.httpService.getWeatherWithLocation(location).pipe(
      map(w => {
        const { id, name, weather, main }: WeatherResponse = w;
        return {id, name, weather, main} as WeatherResponse
      }))
  }
  
  closeWeatherInfo(): void {
    this.weather$ = null;
  }

  addLocation(weather: WeatherResponse): void {
    this.apiService.setLocations(weather);
    this.weather$ = null;
   }
}
