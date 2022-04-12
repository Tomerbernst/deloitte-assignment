import { Action } from '@ngrx/store';
import { CityListItem } from '../core/city-list-item';

export const ADD_CARD = 'ADD_CARD';

export class AddCard implements Action {
    readonly type = ADD_CARD;
    constructor(public payload:CityListItem){}
}   

