import {createAction} from '@reduxjs/toolkit';

import { CityMap, OffersType, OfferType, Reviews } from '../types/types';
import { SortType, AuthorizationStatus, NameSpace, AppRoute } from '../const';
import { UserLogIn } from '../types/date';

export const setCityActive = createAction('mainPage/setCityActive', (value: string)=>({payload: value}));
export const getOffersActive = createAction('mainPage/getOffersActive');
export const setMapActive = createAction('mainPage/setMapActive', (value: CityMap) => ({ payload: value }));
export const getSortType = createAction('mainPage/getSortType', (value: SortType) => ({ payload: value }));
export const getSortOffers = createAction('getSortOffers');

export const loadOffers = createAction<OffersType>('data/loadOffers');

export const loadOffer = createAction<OfferType | null>('data/loadOffer');
export const setOffersIsLoading = createAction<boolean>('setOffersIsLoading');
export const setOfferIsLoading = createAction<boolean>('setOfferIsLoading');
export const setOfferIsNotFound = createAction<boolean>('setOfferIsNotFound');
export const addReviews = createAction<Reviews>('data/addReviews');
export const loadNearOffers = createAction<OffersType>('data/loadNearOffers');
export const setNearOffersIsLoading = createAction<boolean>('data/setNearOffersIsLoading');
export const setNearOffersIsNotFound = createAction<boolean>('data/setNearOffersIsNotFound');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
export const setError = createAction<string | null>('setError');
export const setUser = createAction<UserLogIn | null>(`${NameSpace.User}/setUser`);
export const redirectToRoute = createAction<AppRoute>('game/redirectToRoute');

