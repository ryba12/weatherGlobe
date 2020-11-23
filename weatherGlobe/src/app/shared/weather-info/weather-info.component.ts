import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherResponse } from 'src/app/models/models';

@Component({
  selector: 'app-weather-info',
  templateUrl: './weather-info.component.html',
  styleUrls: ['./weather-info.component.scss']
})
export class WeatherInfoComponent implements OnInit {

  @Input() weather: WeatherResponse;

  constructor() { }

  ngOnInit(): void {
  }

}
