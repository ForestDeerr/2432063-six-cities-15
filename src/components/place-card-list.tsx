import PlaceCard from './place-card';
import { OffersType } from '../types/types';

type PlaceCardListProps = {
  offers: OffersType;
  setCardHoverId(id: string | null): void;
}

function PlaceCardList({ offers, setCardHoverId }: PlaceCardListProps): JSX.Element {

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => {
        const keyValue = offer.id;
        return (
          <PlaceCard key={keyValue} offerCard={offer} setCardHoverId={setCardHoverId}/>
        );
      })}
    </div>
  );
}

export default PlaceCardList;
