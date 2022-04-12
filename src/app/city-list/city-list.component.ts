import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  FormBuilder,
} from "@angular/forms";
import cities from "../../assets/cities.json";
import { CityListService } from "./city-list.service";
import { map } from "rxjs/operators";
import { CityListItem } from "../core/city-list-item";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import * as CityListAction from "./city-list.actions";

@Component({
  selector: "app-city-list",
  templateUrl: "./city-list.component.html",
  styleUrls: ["./city-list.component.scss"],
})
export class CityListComponent implements OnInit {
  cityList: { name: string; latitude: number; longitude: number }[] = cities;
  currentSelectedCity: string;
  citySelectionList: FormGroup;
  selectedCitiesMap: Observable<{ selectedCitiesMap: CityListItem[] }>;
  idSet = new Set();
  constructor(
    private cityListService: CityListService,
    private store: Store<{ cityMap: { selectedCitiesMap: CityListItem[] } }>
  ) {}

  ngOnInit(): void {
    this.citySelectionList = new FormGroup({
      cityName: new FormControl(null, Validators.required),
    });
    navigator.geolocation
    navigator.geolocation.getCurrentPosition(position => {
    this.insertData(position.coords.longitude,position.coords.latitude);
    });

    this.selectedCitiesMap = this.store.select("cityMap");
    this.selectedCitiesMap.subscribe((res) => console.log(res));
  }

  onSubmit() {
    let long: number = 0;
    let lat: number = 0;

    for (let x in this.cityList) {
      if (this.cityList[x].name == this.currentSelectedCity) {
        long = this.cityList[x].longitude;
        lat = this.cityList[x].latitude;
        break;
      }
    }
    this.insertData(long, lat);
  }

  insertData(long: number, lat: number) {
    if (long && lat) {
      this.cityListService.getCityWeather(lat, long).subscribe((res) => {
        if (!this.idSet.has(res.id)) {
          this.store.dispatch(
            new CityListAction.AddCard(
              new CityListItem(
                res.id,
                typeof this.currentSelectedCity == 'undefined' ? res.name: this.currentSelectedCity,
                Math.round(res.main.temp - 273.15)
              )
            )
          );
          this.idSet.add(res.id);
        }
      });
    }
  }

}
