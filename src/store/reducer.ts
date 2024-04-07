import {createReducer} from '@reduxjs/toolkit';
import {setCityActive, getOffersActive, setMapActive, getSortType, getSortOffers, loadOffers, requireAuthorization, setUser} from './action';
import { DEFAULT_CITY, defaultLocation, SortType } from '../const';
import { getSortedOffers } from '../utils/get-sort-offers';
import { AuthorizationStatus } from '../const';
import { OffersType } from '../types/types';
import { CityMap } from '../types/types';
import { UserLogIn } from '../types/date';

type InitalState = {
  cityActive: string;
  allOffers: OffersType;
  offers: OffersType;
  offersIsLoading: boolean;
  city: CityMap;
  sortType: SortType;
  authorizationStatus: AuthorizationStatus;
  error: string | null;
  user: UserLogIn | null;
  isFavorite: boolean;
}

const initialState: InitalState = {
  cityActive: DEFAULT_CITY,
  allOffers: [],
  offers: [],
  offersIsLoading: false,
  city: defaultLocation,
  sortType: SortType.Popular,
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
  user: null,
  isFavorite:false,
};


const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCityActive, (state, action) => {
      state.cityActive = action.payload;
    })
    .addCase(getOffersActive, (state) => {
      if (state.allOffers.length) {
        const offersByCity = state.allOffers.filter(
          (item) => item?.city?.name === state.cityActive
        );
        state.offers = getSortedOffers(state.sortType, offersByCity);
      }
    })
    .addCase(setMapActive, (state, action) => {
      state.city = action.payload;
    })
    .addCase(getSortType, (state, action) => {
      state.sortType = action.payload;
    })
    .addCase(getSortOffers, (state) => {
      state.offers = getSortedOffers(state.sortType, state.offers);
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUser, (state, action) => {
      state.user = action.payload;
    });

});

export {reducer};
