
type RatingProps = {
    rating: number,
}

function Rating({rating}: RatingProps): JSX.Element {

  const stars = [1, 2, 3, 4, 5];

  return (
    <>
      {
        stars.map((star) => (
          <svg width="12" height="11" aria-hidden="true" key={star}>
            <use xlinkHref={(rating >= star) ? '#icon-full-star' : '#icon-star'}></use>
          </svg>
        ))
      }
      <p className="visually-hidden">Рейтинг: Хорошо</p>
    </>
  );
}

export default Rating;
