import React, { useEffect, useState } from "react";
import css from "./ReviewsList.module.css";
import Container from "../Container/Container";

interface Review {
  id: string;
  name: string;
  comment: string;
  date: string;
}

interface ReviewsListProps {
  reviews: Review[];
}

const ReviewsList: React.FC<ReviewsListProps> = ({ reviews }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, [reviews]);

  if (isLoading) {
    return <p>Loading reviews...</p>;
  }

  return (
    <Container>
      <ul className={css.list}>
        {reviews.map((review) => (
          <li key={review.id} className={css.item}>
            <p className={css.name}>
              <strong>{review.name}</strong>
            </p>
            <p className={css.date}>
              {new Date(review.date).toLocaleDateString()}
            </p>
            <p className={css.text}>{review.comment}</p>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default ReviewsList;
