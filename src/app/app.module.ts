import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CityListComponent } from './city-list/city-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormModule } from '@fundamental-ngx/core/form';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CityCardComponent } from './city-card/city-card.component';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { CityListItem } from './core/city-list-item';
import { cityListReducer } from './city-list/city-list.reducer';

@NgModule({
  declarations: [
    AppComponent,
    CityListComponent,
    CityCardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormModule,
    ButtonModule,
    TypeaheadModule.forRoot(),  
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({cityMap: cityListReducer})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
