// components/ReviewsList/ReviewsList.tsx
import React, { useEffect, useState } from "react";
import css from "./ReviewsList.module.css";
import Container from "../Container/Container";

// Тип для одного відгуку
interface Review {
  id: string;
  name: string;
  comment: string;
  date: string;
}

// Тип для пропсів компонента
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
  // const sortedReviews = [...reviews].sort((a, b) => parseInt(b.id) - parseInt(a.id));

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
