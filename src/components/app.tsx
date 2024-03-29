import { Route, BrowserRouter, Routes} from 'react-router-dom';
import PrivateRoute from './private-route';
import { AuthorizationStatus } from '../const';
import { useAppSelector } from '../hooks';
import MainPage from '../pages/main-page/main-page';
import LoginScreen from '../pages/login/login';
import FavoritesScreen from '../pages/favorites/favorites';
import Offer from '../pages/offer/offer';
import Error from '../pages/error/error';

import { OffersType, Reviews } from '../types/types';
import Spinner from './spinner/spinner';


type AppProps = {
  offers: OffersType;
  reviews: Reviews;
  citiesList: string[];
}

function App({offers, reviews, citiesList}: AppProps): JSX.Element {

  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const isOffersDataLoading = useAppSelector((state) => state.offersIsLoading);

  if (authorizationStatus === AuthorizationStatus.Unknown || isOffersDataLoading) {
    return (
      <Spinner />
    );
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage citiesList={citiesList} />} />
        <Route path='login' element={<LoginScreen />} />
        <Route path='favorites' element={
          <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
            <FavoritesScreen />
          </PrivateRoute>
        }
        />
        <Route path='offer/:id' element={<Offer offers={offers} reviews={reviews} />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
