import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import cities from '../../assets/cities.json';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.scss']
})
export class CityListComponent implements OnInit {
  cityList: {name:string, latitude:number, longitude: number}[] = cities; 
  selectedCity: string;
  citySelectionList: FormGroup;

  constructor() { }

  ngOnInit(): void {
    console.log(this.cityList);
    this.citySelectionList = new FormGroup({
      'cityName': new FormControl(null, Validators.required),
    })

  }

}
