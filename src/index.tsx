import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app';

import {Provider} from 'react-redux';
import {store} from './store';

import { offers } from './mocks/offers';
import { reviews } from './mocks/reviews';
import { citiesList } from './const';

import { fetchQuestionAction, checkAuthAction } from './store/api-action';
store.dispatch(fetchQuestionAction());
store.dispatch(checkAuthAction());


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <App
        offers = {offers}
        reviews = {reviews}
        citiesList = {citiesList}
      />
    </Provider>
  </React.StrictMode>
);
