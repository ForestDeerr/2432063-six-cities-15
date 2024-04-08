import { Review } from '../types/types';

type ReviewsItemProps = {
  reviewCard: Review;
}

function ReviewsItem({ reviewCard }: ReviewsItemProps): JSX.Element {
  const { comment, user, rating, date } = reviewCard;
  const { userName, avatarUrl } = user;
  const dueDate = new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric' }).format(new Date(date.split('T')[0]));
  return (
    <ul className="reviews__list">
      <li className="reviews__item">
        <div className="reviews__user user">
          <div className="reviews__avatar-wrapper user__avatar-wrapper">
            <img
              className="reviews__avatar user__avatar"
              src={avatarUrl}
              width={54}
              height={54}
              alt="Reviews avatar"
            />
          </div>
          <span className="reviews__user-name">{userName}</span>
        </div>
        <div className="reviews__info">
          <div className="reviews__rating rating">
            <div className="reviews__stars rating__stars">
              <span style={{width: `${rating * 20 }%`}}/>
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <p className="reviews__text">
            {comment}
          </p>
          <time className="reviews__time" dateTime={date}>
            {dueDate}
          </time>
        </div>
      </li>
    </ul>
  );
}
export default ReviewsItem;
