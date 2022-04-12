import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CityListItem } from '../core/city-list-item';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-city-card',
  templateUrl: './city-card.component.html',
  styleUrls: ['./city-card.component.scss']
})
export class CityCardComponent implements OnInit {
  selectedCitiesMap: Observable<{selectedCitiesMap: CityListItem[]}>;

  constructor( private store: Store<{cityMap:{selectedCitiesMap:CityListItem[]}}>) { }

  ngOnInit(): void {
    this.selectedCitiesMap = this.store.select('cityMap');
  }
  
  but() {
    this.selectedCitiesMap.subscribe(res=>console.log('r',res.selectedCitiesMap));

  }
  deleteCard(id:number) {
    console.log(id);
    //this.selectedCitiesMap.delete(id);
  }
}
