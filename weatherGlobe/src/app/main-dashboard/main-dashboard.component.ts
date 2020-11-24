import { AfterViewInit, QueryList } from '@angular/core';
import { Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';
import { Gps, WeatherResponse } from '../models/models';
import { ApiService } from '../services/api.service';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss']
})
export class MainDashboardComponent implements OnInit, AfterViewInit {

  @ViewChild('sliderList') slider: ElementRef;

  weathers$: Observable<Array<WeatherResponse>>;
  userWeather$: Observable<WeatherResponse>;
  userPosition: Gps;
  navButton: boolean;

  constructor(private apiService: ApiService, private httpService: HttpService) { }

  ngOnInit(): void {
    this.getUserLocation();
    this.weathers$ = this.apiService.locationsSubject.pipe()
    this.apiService.checkLocationsSubject();
    this.toggleNavButtons()
  }
  ngAfterViewInit(): void {
    this.toggleNavButtons()
  }

  scroll(scroll: boolean): void {
    const slider = this.slider.nativeElement as HTMLElement;
    if (scroll) {
      slider.scroll({
        left: slider.scrollLeft += slider.firstElementChild.clientWidth,
        behavior: 'smooth'
      });
    } else {
      slider.scroll({
        left: slider.scrollLeft -= slider.firstElementChild.clientWidth,
        behavior: 'smooth'
      });
    }

  }

  getUserLocation(): void {
    if (window.sessionStorage.getItem('userPosition')) {
      this.userPosition = JSON.parse(window.sessionStorage.getItem('userPosition'));
      this.userWeather$ = this.httpService.getWeatherWithLocation(this.userPosition).pipe();
    } else {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          const { longitude, latitude } = position.coords;
          this.userPosition = { longitude: longitude, latitude: latitude }
          window.sessionStorage.setItem('userPosition', JSON.stringify(this.userPosition))
          this.userWeather$ = this.httpService.getWeatherWithLocation(this.userPosition).pipe(
            map(w => {
              const { id, name, weather, main }: WeatherResponse = w;
              return { id, name, weather, main } as WeatherResponse
            }))
        });
      }
    }
  }

  toggleNavButtons(): void {
    setTimeout(() => {
      if (this.slider) {
        const slider = this.slider.nativeElement as HTMLElement;
        if (slider.firstElementChild) {
          const sliderWidth = slider.clientWidth
          const childElementCount = slider.childElementCount;
          const singleBoxWidth = slider.firstElementChild.clientWidth
          let test: number;
          test = childElementCount * singleBoxWidth;
          if (sliderWidth <= childElementCount * singleBoxWidth) {
            this.navButton = true;
          } else {
            this.navButton = false;
          }
        }

      }
    }, 100);
  }

  removeLocation(id: number): void {
    this.apiService.removeLocation(id).then(() => {
      this.toggleNavButtons();
    })
  }

}
