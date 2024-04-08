import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/staye';
import { OfferType, OffersType, Reviews } from '../types/types';
import { Comments } from '../types/comments';
import { loadOffers,
  requireAuthorization,
  setOffersIsLoading,
  getOffersActive,
  redirectToRoute,
  setUser,
  setError,
  loadOffer,
  setOfferIsLoading,
  setOfferIsNotFound,
  loadNearOffers,
  setNearOffersIsLoading,
  setNearOffersIsNotFound,
  addReviews, } from './action';


import { ApiRoute, AuthorizationStatus, AppRoute, TIMEOUT_SHOW_ERROR } from '../const';
import { AuthData } from '../types/date';
import { saveToken, dropToken } from '../services/token';
import { store } from '.';
import { UserLogIn } from '../types/date';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setOffersIsLoading(true));

    const { data } = await api.get<OffersType>(ApiRoute.Offers);
    dispatch(setOffersIsLoading(false));
    dispatch(loadOffers(data));
    dispatch(getOffersActive());
  },
);

export const fetchOfferAction = createAsyncThunk<void, number | string | undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'data/fetchOffer',
    async (_arg, { dispatch, extra: api }) => {
      dispatch(setOfferIsLoading(true));
      dispatch(setOfferIsNotFound(false));
      const id = _arg;

      try {
        const { data } = await api.get<OfferType>(`${ApiRoute.Offers}/${id}`);

        if (data) {
          dispatch(loadOffer(data));
        }
      } catch {
        dispatch(setOfferIsNotFound(true));
      } finally {
        dispatch(setOfferIsLoading(false));
      }
    },
  );

export const fetchNearOffersAction = createAsyncThunk<void, number | string | undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'fetchNearPlacesAction', async (_arg, { dispatch, extra: api }) => {
      const id = _arg;

      dispatch(setNearOffersIsLoading(true));
      dispatch(setNearOffersIsNotFound(false));

      try {
        const { data } = await api.get<OffersType>(
          `${ApiRoute.Offers}/${id}/nearby`
        );

        if (data) {
          dispatch(loadNearOffers(data));
        }
      } catch {
        dispatch(setNearOffersIsNotFound(true));
      } finally {
        dispatch(setNearOffersIsLoading(false));
      }
    });

export const fetchReviewsAction = createAsyncThunk<void, number | string | undefined, {
      dispatch: AppDispatch;
      state: State;
      extra: AxiosInstance;
    }>(
      'data/fetchReviews',
      async (_arg, { dispatch, extra: api }) => {
        const id = _arg;
        const { data } = await api.get<Reviews>(`${ApiRoute.Comments}/${id}`);

        dispatch(addReviews(data));
      });

export const submitCommentAction = createAsyncThunk<void, Comments, {
        dispatch: AppDispatch;
        state: State;
        extra: AxiosInstance;
      }
      >(
        'submitComments',
        async ({ id, comment, rating }, { dispatch, extra: api }) => {
          await api.post<Comments>(`${ApiRoute.Comments}/${id}`, {
            comment: comment,
            rating: rating,
          });

          dispatch(fetchReviewsAction(id));
        }
      );

export const clearErrorAction = createAsyncThunk(
  'game/clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);

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

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const {data} = await api.post<UserLogIn>(ApiRoute.Login, {email, password});
    const {token} = data;

    saveToken(token);
    dispatch(setUser(data));
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Main));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(ApiRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);
