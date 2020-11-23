import { Location } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Gps, Places, WeatherResponse } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }


  getPlaces(name: string): Observable<Places> {
    let params = new HttpParams().set('access_token', environment.apiKeys.mapBoxAccessToken);
    params = params.set('language', 'pl');
    return this.http.get<Places>(environment.apiUrls.mapBoxUrl + name + environment.apiUrls.mapBoxUrlTwo, {params: params});
  }

  getWeatherWithLocation(location: Gps): Observable<WeatherResponse> {
    let params = new HttpParams().set('appid', environment.apiKeys.weatherMapToken);
    params = params.set('lon', location.longitude.toString());
    params = params.set('lat', location.latitude.toString());
    params = params.set('units', 'metric');
    params = params.set('lang', 'pl');
    return this.http.get<WeatherResponse>(environment.apiUrls.weatherMapUrl, {params: params});
  }

  getWeatherWithId(id: number): Observable<WeatherResponse> {
    let params = new HttpParams().set('appid', environment.apiKeys.weatherMapToken);
    params = params.set('id', id.toString());
    params = params.set('units', 'metric');
    params = params.set('lang', 'pl');
    return this.http.get<WeatherResponse>(environment.apiUrls.weatherMapUrl, {params: params});
  }
}
