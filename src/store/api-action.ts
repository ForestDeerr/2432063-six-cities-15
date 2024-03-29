import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/staye';
import { OffersType } from '../types/types';
import { loadOffers, requireAuthorization, setOffersIsLoading, getOffersActive } from './action';
import { ApiRoute, AuthorizationStatus } from '../const';

export const fetchQuestionAction = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
  'data/fetchQuestions',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setOffersIsLoading(true));

    const { data } = await api.get<OffersType>(ApiRoute.Offers);
    dispatch(setOffersIsLoading(false));
    dispatch(loadOffers(data));
    dispatch(getOffersActive());
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    try {
      await api.get(ApiRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

