import { Component, Input, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { CityListItem } from "../core/city-list-item";
import { Store } from "@ngrx/store";
import * as CityListAction from "../city-list/city-list.actions";
import { CityListService } from "../city-list/city-list.service";

@Component({
  selector: "app-city-card",
  templateUrl: "./city-card.component.html",
  styleUrls: ["./city-card.component.scss"],
})
export class CityCardComponent implements OnInit {
  cities: Observable<{ cities: CityListItem[] }>;

  constructor(
    private store: Store<{ cityMap: { cities: CityListItem[] } }>,
    private cityListService: CityListService
  ) {}

  ngOnInit(): void {
    this.cities = this.store.select("cityMap");
  }

  deleteCard(cityId: any) {
    this.store.dispatch(new CityListAction.DeleteCard(cityId));
  }

  updateCard(cityId: any) {
    this.cityListService.getWeatherByCityId(cityId).subscribe((res) => {
      this.store.dispatch(
        new CityListAction.UpdateCard({
          id: cityId,
          temperature:Math.round(res.main.temp - 273.15)
        })
      );
    })
  }
}
