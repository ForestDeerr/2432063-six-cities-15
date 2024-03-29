import {createReducer} from '@reduxjs/toolkit';
import {setCityActive, getOffersActive, setMapActive, getSortType, getSortOffers, loadOffers, requireAuthorization} from './action';
import { DEFAULT_CITY, defaultLocation, SortType } from '../const';
import { offers } from '../mocks/offers';
import { getSortedOffers } from '../utils/get-sort-offers';
import { AuthorizationStatus } from '../const';
import { OffersType } from '../types/types';
import { CityMap } from '../types/types';

type InitalState = {
  cityActive: string;
  allOffers: OffersType;
  offers: OffersType;
  offersIsLoading: boolean;
  city: CityMap;
  sortType: SortType;
  authorizationStatus: AuthorizationStatus;
}

const initialState: InitalState = {
  cityActive: DEFAULT_CITY,
  allOffers: [],
  offers: [],
  offersIsLoading: false,
  city: defaultLocation,
  sortType: SortType.Popular,
  authorizationStatus: AuthorizationStatus.Unknown
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
    });

});

export {reducer};
