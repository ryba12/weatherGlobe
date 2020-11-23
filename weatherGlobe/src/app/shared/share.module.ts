import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherInfoComponent } from './weather-info/weather-info.component';
import { TemperaturePipe } from '../pipes/temperature.pipe';



@NgModule({
  declarations: [
    WeatherInfoComponent,
    TemperaturePipe,

  ],
  imports: [
    CommonModule
  ],
  exports: [WeatherInfoComponent, TemperaturePipe,
  ]
})
export class ShareModule { }
