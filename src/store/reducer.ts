import {createReducer} from '@reduxjs/toolkit';
import {setCityActive, getOffersActive, setMapActive, getSortType, getSortOffers, loadOffers, requireAuthorization, setUser, loadNearOffers, setNearOffersIsLoading, loadOffer, setOfferIsNotFound, addReviews, setOfferIsLoading, setNearOffersIsNotFound} from './action';
import { DEFAULT_CITY, defaultLocation, SortType } from '../const';
import { getSortedOffers } from '../utils/get-sort-offers';
import { AuthorizationStatus } from '../const';
import { OffersType, OfferType, Reviews, CityMap } from '../types/types';
import { UserLogIn } from '../types/date';

type InitalState = {
  cityActive: string;
  allOffers: OffersType;
  offer: OfferType | null;
  offers: OffersType;
  nearOffers: OffersType;
  offersIsLoading: boolean;
  offerIsLoading: boolean;
  nearOffersIsLoading: boolean;
  nearOffersIsNotFound: boolean;
  offerIsNotFound: boolean;
  city: CityMap;
  sortType: SortType;
  authorizationStatus: AuthorizationStatus;
  error: string | null;
  user: UserLogIn | null;
  reviews: Reviews;
}

const initialState: InitalState = {
  cityActive: DEFAULT_CITY,
  allOffers: [],
  offer: null,
  offers: [],
  nearOffers: [],
  offersIsLoading: false,
  offerIsLoading: false,
  offerIsNotFound: false,
  nearOffersIsLoading: false,
  nearOffersIsNotFound: false,
  city: defaultLocation,
  sortType: SortType.Popular,
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
  user: null,
  reviews: [],
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
    .addCase(loadOffer, (state, action) => {
      state.offer = action.payload;
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
    })
    .addCase(loadNearOffers, (state, action) => {
      state.nearOffers = action.payload;
    })
    .addCase(setOfferIsNotFound, (state, action) => {
      state.offerIsNotFound = action.payload;
    })
    .addCase(setNearOffersIsLoading, (state, action) => {
      state.nearOffersIsLoading = action.payload;
    })
    .addCase(setNearOffersIsNotFound, (state, action) => {
      state.nearOffersIsNotFound = action.payload;
    })
    .addCase(addReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(setOfferIsLoading, (state, action) => {
      state.offerIsLoading = action.payload;
    });

});

export {reducer};
