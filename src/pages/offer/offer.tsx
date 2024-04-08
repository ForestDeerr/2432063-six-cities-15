import { Helmet } from 'react-helmet-async';
import { useParams, Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import Spinner from '../../components/spinner/spinner';
import NavList from '../../components/nav-list';
import ReviewsList from '../../components/reviews-list';
import Map from '../../components/map';
import NearPlaceCardList from '../../components/near-places-card-list';
import { store } from '../../store';
import { fetchOfferAction, fetchReviewsAction, fetchNearOffersAction } from '../../store/api-action';
import { AppRoute } from '../../const';

const MIN_NEAR_OFFERS_COUNT = 0;
const MAX_NEAR_OFFERS_COUNT = 3;

function Offer(): JSX.Element {

  const params = useParams();
  const offerId = params.id;
  const cityMapActive = useAppSelector((state) => state.city);
  const selectedOffer = useAppSelector((state) => state.offer);
  const offerIsLoading = useAppSelector((state) => state.offerIsLoading);
  const offerIsNotFound = useAppSelector((state) => state.offerIsNotFound);
  const reviewsActive = useAppSelector((state) => state.reviews);
  const nearOffers = useAppSelector((state) => state.nearOffers);
  const nearOffersIsLoading = useAppSelector((state) => state.nearOffersIsLoading);
  const activeNearOffers = nearOffers.slice(MIN_NEAR_OFFERS_COUNT, Math.min(MAX_NEAR_OFFERS_COUNT, nearOffers.length));

  const nearOfferPlusSelectedOffer = [...activeNearOffers];
  if(selectedOffer) {
    nearOfferPlusSelectedOffer.push(selectedOffer);
  }

  useEffect(() => {
    store.dispatch(fetchOfferAction(offerId));
    store.dispatch(fetchReviewsAction(offerId));
    store.dispatch(fetchNearOffersAction(offerId));
  }, [offerId]);

  return (
    <div className="page">
      <Helmet>
        <title>Six cities. Offer.</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link" href="main.html">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </a>
            </div>
            <NavList />
          </div>
        </div>
      </header>
      <main className="page__main page__main--offer">
        {offerIsLoading && <Spinner />}
        {offerIsNotFound && <Navigate to={AppRoute.NotFound} />}
        {selectedOffer && !offerIsNotFound && !offerIsLoading && (
          <section className="offer">
            <div className="offer__gallery-container container">
              <div className="offer__gallery">
                {selectedOffer.images
                  .map((url, id) => {
                    const keyValue = `${id}-${url}`;
                    return (
                      <div key={keyValue} className="offer__image-wrapper">
                        <img className="offer__image" src={url} alt="Photo studio" />
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="offer__container container">
              <div className="offer__wrapper">
                {selectedOffer.isPremium ?
                  <div className="offer__mark">
                    <span>Premium</span>
                  </div>
                  : ''}
                <div className="offer__name-wrapper">
                  <h1 className="offer__name">
                    {selectedOffer.title}
                  </h1>
                  <button className="offer__bookmark-button button" type="button">
                    <svg className={`offer__bookmark-icon ${selectedOffer.isFavorite ? 'offer__bookmark-button--active' : ''}`} width={31} height={33}>
                      <use xlinkHref="#icon-bookmark" />
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>
                </div>
                <div className="offer__rating rating">
                  <div className="offer__stars rating__stars">
                    <span style={{ width: `${selectedOffer.rating * 100 / 5 }%`}} />
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="offer__rating-value rating__value">{selectedOffer.rating}</span>
                </div>
                <ul className="offer__features">
                  <li className="offer__feature offer__feature--entire">{selectedOffer.type}</li>
                  <li className="offer__feature offer__feature--bedrooms">
                    {selectedOffer.bedrooms} Bedrooms
                  </li>
                  <li className="offer__feature offer__feature--adults">
                  Max {selectedOffer.maxAdults} adults
                  </li>
                </ul>
                <div className="offer__price">
                  <b className="offer__price-value">€{selectedOffer.price}</b>
                  <span className="offer__price-text">&nbsp;night</span>
                </div>
                {selectedOffer.goods && (
                  <div className="offer__inside">
                    <h2 className="offer__inside-title">Whats inside</h2>
                    <ul className="offer__inside-list">
                      {selectedOffer.goods.map((good) => {
                        const keyValue = good;
                        return (<li key={keyValue} className="offer__inside-item">{good}</li>);
                      })}
                    </ul>
                  </div>
                )}
                <div className="offer__host">
                  <h2 className="offer__host-title">Meet the host</h2>
                  <div className="offer__host-user user">
                    {selectedOffer.host?.avatarUrl && (
                      <div className={`offer__avatar-wrapper ${selectedOffer.host.isPro ? 'offer__avatar-wrapper--pro' : ''} user__avatar-wrapper`}>
                        <img
                          className="offer__avatar user__avatar"
                          src={selectedOffer.host.avatarUrl}
                          width={74}
                          height={74}
                          alt="Host avatar"
                        />
                      </div>
                    )}
                    {selectedOffer.host?.hostName && (
                      <span className="offer__user-name">{selectedOffer.host.hostName}</span>
                    )}
                    {selectedOffer.host?.isPro && (
                      <span className="offer__user-status">Pro</span>
                    )}
                  </div>
                  <div className="offer__description">
                    <p className="offer__text">
                    A quiet cozy and picturesque that hides behind a a river by the
                    unique lightness of Amsterdam. The building is green and from
                    18th century.
                    </p>
                    <p className="offer__text">
                    An independent House, strategically located between Rembrand
                    Square and National Opera, but where the bustle of the city
                    comes to rest in this alley flowery and colorful.
                    </p>
                  </div>
                </div>
                {reviewsActive && (<ReviewsList reviewList={reviewsActive} offerId={offerId} />)}
              </div>
            </div>
            <Map mapType={'offer'} offers={nearOfferPlusSelectedOffer} cardHoverId={selectedOffer.id} CITY={cityMapActive} />
          </section>
        )}
        <div className="container">
          <section className="near-places places">
            <div className="near-places__list places__list">
              {!nearOffersIsLoading && (
                <NearPlaceCardList offers={activeNearOffers} />
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Offer;
