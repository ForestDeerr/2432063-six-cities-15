import ReviewsItem from './reviews-item';
import ReviewsForm from './reviews-form';
import { Reviews } from '../types/types';
import { AuthorizationStatus } from '../const';
import { useAppSelector } from '../hooks';


type ReviewsListProps = {
  reviewList: Reviews;
  offerId?: string;
}

function ReviewsList({ reviewList, offerId }: ReviewsListProps): JSX.Element {

  const MIN_REVIEWS_COUNT = 0;
  const MAX_REVIEWS_COUNT = 10;
  const maxReviews = reviewList.slice(MIN_REVIEWS_COUNT, Math.min(MAX_REVIEWS_COUNT, reviewList.length))
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  return (
    <section className="offer__reviews reviews">
      <div>
        <h2 className="reviews__title">
          Reviews · <span className="reviews__amount">{maxReviews.length}</span>
        </h2>
        {maxReviews.map((review) => {
          const keyValue = review.id;
          return (
            <ReviewsItem key={keyValue} reviewCard={review} />
          );
        })}
        {authorizationStatus === AuthorizationStatus.Auth && (
          <ReviewsForm offerId={offerId} />
        )}
      </div>
    </section>
  );
}

export default ReviewsList;
