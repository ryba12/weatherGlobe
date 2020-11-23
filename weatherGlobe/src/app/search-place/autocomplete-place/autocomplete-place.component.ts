import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Gps, Place } from 'src/app/models/models';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-autocomplete-place',
  templateUrl: './autocomplete-place.component.html',
  styleUrls: ['./autocomplete-place.component.scss']
})
export class AutocompletePlaceComponent implements OnInit {

  placeControl = new FormControl();
  filteredOptions$: Observable<Array<Place>>;
  @Output() locationEmitter = new EventEmitter<Gps>();

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.searchPlace()
  }

  searchPlace(): void {
    this.filteredOptions$ = this.placeControl.valueChanges
    .pipe(
    filter((query: string) =>  query?.length > 2),
    debounceTime(500),
    distinctUntilChanged(),
    switchMap(val => 
       this.httpService.getPlaces(val)
    ),
    map(m => m.features.filter(f => f.place_type.includes("place")))
    );
  }

  obtainWeatherForPlace(gps: [number, number]): void {
    const location: Gps  = { longitude: gps[0], latitude: gps[1]};
    this.locationEmitter.emit(location);
  }

}
