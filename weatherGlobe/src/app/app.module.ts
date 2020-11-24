import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { SearchPlaceComponent } from './search-place/search-place.component';
import {MatDialogModule} from '@angular/material/dialog';
import { AutocompletePlaceComponent } from './search-place/autocomplete-place/autocomplete-place.component';
import {MatButtonModule} from '@angular/material/button';
import { ShareModule } from './shared/share.module';
import { RequestInterceptor } from './services/http.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    MainDashboardComponent,
    SearchPlaceComponent,
    AutocompletePlaceComponent,
    
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    ShareModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
  ],
  entryComponents: [
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
