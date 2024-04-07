import { Helmet } from 'react-helmet-async';

import Map from '../../components/map';
import PlaceCardList from '../../components/place-card-list';
import LocationsList from '../../components/locations-list';
import PlacesSorting from '../../components/places-sorting';
import NavList from '../../components/nav-list';

import { useState } from 'react';
import { useAppSelector } from '../../hooks';

type MainPageProps = {
  citiesList: string[];
}


function MainPage({citiesList}: MainPageProps): JSX.Element {
  const [cardHoverId, setCardHoverId] = useState<string | null>(null);

  const offersActive = useAppSelector((state) => state.offers);
  const mapActions = useAppSelector((state) => state.city);
  const cityActive = useAppSelector((state) => state.cityActive);
  const placesCount = offersActive.length;

  const filteredOffersByCity = offersActive.filter((offer) => offer.city.name === cityActive);


  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>Six cities.</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"></img>
              </a>
            </div>
            <NavList />
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">

          <LocationsList citiesList={citiesList} />

        </div>


        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{placesCount} places to stay in {cityActive}</b>

              {<PlacesSorting />}

              {<PlaceCardList offers={filteredOffersByCity} setCardHoverId = {setCardHoverId} />}

            </section>
            <div className="cities__right-section">
              <Map offers={filteredOffersByCity} CITY={mapActions} cardHoverId={cardHoverId} mapType={'cities'}/>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
