import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import cities from '../../assets/cities.json';
import { CityListService } from  './city-list.service';
import { map } from 'rxjs/operators';

export interface cityListItem {
    name: string;
    temperature: number;
}


@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.scss']
})
export class CityListComponent implements OnInit {
  cityList: {name:string, latitude:number, longitude: number}[] = cities; 
  currentSelectedCity: string;
  citySelectionList: FormGroup;
  lat: number;
  long: number;
  selectedCitiesMap: Map<number, cityListItem> =new Map<number, cityListItem>();


  

  constructor(private cityListService: CityListService) { }

  ngOnInit(): void {
    console.log(this.cityList);
    this.citySelectionList = new FormGroup({
      'cityName': new FormControl(null, Validators.required),
    })

  }
  deleteCard(id:number) {
    console.log(id);
    this.selectedCitiesMap.delete(id);
  }

  onSubmit() {
    this.long = 0;
    this.lat = 0;
    for(let x in this.cityList) {
      if(this.cityList[x].name == this.currentSelectedCity){
        this.long = this.cityList[x].longitude;
        this.lat = this.cityList[x].latitude;
        break;
      }
   }
    if(this.long && this.lat) {
      console.log(this.long +' '+ this.lat+'' + this.currentSelectedCity) ;

      this.cityListService.getCityWeather(this.lat, this.long)
      .subscribe((res) => {
          console.log(res);
          this.selectedCitiesMap.set(res.id, {"name": this.currentSelectedCity, "temperature":Math.round(res.main.temp - 273.15)});
          console.log( this.selectedCitiesMap);
        }
      );
    }

  }

}
