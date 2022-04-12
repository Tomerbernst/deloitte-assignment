import { Action } from "@ngrx/store";
import { CityListItem } from "../core/city-list-item";
import * as CityListAction from "./city-list.actions";

const initialState = {
    selectedCitiesMap:[]
};

export function cityListReducer(
  state = initialState,
  action: CityListAction.AddCard
) {
  switch (action.type) {
    case CityListAction.ADD_CARD:
        console.log('resude',action.payload);
      return {
          ...state,
          selectedCitiesMap:[ ...state.selectedCitiesMap,action.payload]
      }; 
    default: {
      return state;
    }
  }
}
