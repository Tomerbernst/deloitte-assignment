import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  FormBuilder,
} from "@angular/forms";
import cityJson from "../../assets/cities.json";
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
  valueListCity: { name: string; latitude: number; longitude: number }[] =
    cityJson;
  currentSelectedCity: string;
  citySelectionForm: FormGroup;
  cities: Observable<{ cities: CityListItem[] }>;
  constructor(
    private cityListService: CityListService,
    private store: Store<{ cityMap: { cities: CityListItem[] } }>
  ) {}

  ngOnInit(): void {
    this.citySelectionForm = new FormGroup({
      'cityName': new FormControl(null, Validators.required),
    });
    navigator.geolocation.getCurrentPosition((position) => {
      this.insertData(position.coords.longitude, position.coords.latitude);
    }, this.error);

    this.cities = this.store.select("cityMap");
  }
  error(err) {
    if (err.code == 1) {
      alert("Error: Access is denied!");
    } else if (err.code == 2) {
      alert("Error: Position is unavailable!");
    }
  }
  insertData(long: number, lat: number) {
    if (long && lat) {
      this.cityListService.getWeatherByCityCoord(lat, long).subscribe((res) => {
          this.store.dispatch(
            new CityListAction.AddCard(
              new CityListItem(
                res.id,
                typeof this.currentSelectedCity == "undefined"
                  ? res.name
                  : this.currentSelectedCity,
                Math.round(res.main.temp - 273.15)
              )
            )
          );
      });
    }
  }

  onSubmit() {
    let long: number = 0;
    let lat: number = 0;

    for (let x in this.valueListCity) {
      if (this.valueListCity[x].name == this.currentSelectedCity) {
        long = this.valueListCity[x].longitude;
        lat = this.valueListCity[x].latitude;
        break;
      }
    }
    this.insertData(long, lat);
  }
}
