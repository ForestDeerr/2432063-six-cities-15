import {createAction} from '@reduxjs/toolkit';

import { CityMap, OffersType } from '../types/types';
import { SortType, AuthorizationStatus } from '../const';

export const setCityActive = createAction('mainPage/setCityActive', (value: string)=>({payload: value}));
export const getOffersActive = createAction('mainPage/getOffersActive');
export const setMapActive = createAction('mainPage/setMapActive', (value: CityMap) => ({ payload: value }));
export const getSortType = createAction('mainPage/getSortType', (value: SortType) => ({ payload: value }));
export const getSortOffers = createAction('getSortOffers');
export const loadOffers = createAction<OffersType>('data/loadOffers');
export const setOffersIsLoading = createAction<boolean>('setOffersIsLoading');
export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

