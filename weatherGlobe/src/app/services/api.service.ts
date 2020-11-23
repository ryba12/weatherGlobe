import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { concatAll, map, tap } from 'rxjs/operators';
import { Gps, WeatherResponse } from '../models/models';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  locationsSubject: BehaviorSubject<Array<WeatherResponse>> = new BehaviorSubject<Array<WeatherResponse>>(null);

  constructor(private httpService: HttpService) { }


  setLocations(weather: WeatherResponse) {
    const storage = window.sessionStorage;
    if (storage.getItem('location')) {
      const locationIds: number[] = JSON.parse(storage.getItem('location'));
      if (!locationIds.includes(weather.id)) {
        locationIds.push(weather.id);
        storage.setItem('location', JSON.stringify(locationIds));
        let weathersTemp: WeatherResponse[] = this.locationsSubject.getValue() ? this.locationsSubject.getValue() : [];
        weathersTemp.push(weather);
        this.locationsSubject.next(weathersTemp);
      }
    } else {
      const newArray: number[] = [weather.id];
      storage.setItem('location', JSON.stringify(newArray));
      const weathersTemp: WeatherResponse[] = [weather];
      this.locationsSubject.next(weathersTemp);
    }
  }

  checkLocationsSubject() {
    if (!this.locationsSubject.getValue()) {
      this.getWeathersFromSessionIds()
    }
  }

  getWeathersFromSessionIds(): void {
    if (window.sessionStorage.getItem('location')) {
      const idArray: number[] = JSON.parse(window.sessionStorage.getItem('location')) as number[];
      let reqArray = [];
      idArray.forEach((item) => {
        const req = this.httpService.getWeatherWithId(item);
        reqArray.push(req);
      });

      forkJoin(reqArray).pipe(
        concatAll(),
        map(w => {
          const { id, name, weather, main }: WeatherResponse = w as WeatherResponse
          return { id, name, weather, main } as WeatherResponse
        }),
        tap(weather => {
          const locationsSubjectValue = this.locationsSubject.getValue() ? this.locationsSubject.getValue() : []
          locationsSubjectValue.push(weather);
          this.locationsSubject.next(locationsSubjectValue);
        }
        )
      ).subscribe()
    }

  }

  removeLocation(id: number): Promise<unknown> {
    return new Promise((resolve) => {
      let locationsTmp = this.locationsSubject.getValue();
      locationsTmp = locationsTmp.filter(l => l.id !== id);
      this.locationsSubject.next(locationsTmp);
      let locationsStorage: number[] = JSON.parse(window.sessionStorage.getItem('location')) as number[];
      locationsStorage = locationsStorage.filter(l => l !== id);
      window.sessionStorage.setItem('location', JSON.stringify(locationsStorage))
      resolve()
    });

  }

}