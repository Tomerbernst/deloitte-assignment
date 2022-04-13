import { Action } from '@ngrx/store';
import { CityListItem } from '../core/city-list-item';

export const ADD_CARD = 'ADD_CARD';
export const DELETE_CARD = 'DELETE_CARD';
export const UPDATE_CARD = 'UPDATE_CARD';


export class AddCard implements Action {
    readonly type = ADD_CARD;
    constructor(public payload:CityListItem){}
}   

export class UpdateCard implements Action {
    readonly type = UPDATE_CARD;
    constructor(public payload:{id:number, temperature: number}){}
}   

export class DeleteCard implements Action {
    readonly type = DELETE_CARD;
    constructor(public payload:number){}
}   

export type CityListAction = AddCard | UpdateCard | DeleteCard;