import { Action } from "@ngrx/store";
import { CityListItem } from "../core/city-list-item";
import * as CityListAction from "./city-list.actions";

const initialState = {
  cities: [],
};

export function cityListReducer(
  state = initialState,
  action: CityListAction.CityListAction
) {
  switch (action.type) {
    case CityListAction.ADD_CARD:
      let isExist: Boolean;
      isExist = state.cities.some(p=> p.id == action.payload.id );
      if (!isExist)
      return {
        ...state,
        cities: [...state.cities, action.payload],
      };
      else
      return state;
      case CityListAction.UPDATE_CARD:
        return {
          ...state,
          cities: state.cities.map((city) => {
            if (city.id == action.payload.id) {
              return {...city,temperature:action.payload.temperature}
            }
            return city;
          })
        };
    case CityListAction.DELETE_CARD:
      return {
        ...state,
        cities: state.cities.filter((city) => {
          return !(city.id == action.payload);
        })
      };
    default: {
      return state;
    }
  }
}
