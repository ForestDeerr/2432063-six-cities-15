import PlaceCardList from '../../components/place-card-list';
import Map from '../../components/map';
import LocationsList from '../../components/locations-list';
import PlacesSorting from '../../components/places-sorting';
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
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"></img>
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
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
