// pages/reviews.tsx
import React, { useState, useEffect } from "react";
import ReviewsList from "@/components/ReviewsList/ReviewsList";
import ReviewForm from "@/components/ReviewForm/ReviewForm";
import ScrollTopBtn from "@/components/ScrollTopBtn/ScrollTopBtn";
import { useTranslation } from "@/hooks/useTranslation";
import css from "../styles/Reviews.module.css";

interface Review {
  id: string;
  name: string;
  comment: string;
  date: string;
}

const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [updateTrigger, setUpdateTrigger] = useState(0);
  const { t } = useTranslation();
  const handleReviewAdded = () => {
    setUpdateTrigger((prev) => prev + 1);
  };

  // Завантажуємо відгуки з API
  const fetchReviews = async () => {
    try {
      const response = await fetch("/api/reviews");
      if (!response.ok) {
        throw new Error("Failed to fetch reviews");
      }
      const data: Review[] = await response.json();
      data.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      setReviews(data);
      console.log(data); // лог такий я я хочу
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [updateTrigger]);

  return (
    <>
      <h2 className={css.title}>{t.reviews.giveFeedBack}</h2>
      <p className={css.description}>{t.reviews.description}</p>
      <ReviewForm onReviewAdded={handleReviewAdded} />
      {reviews.length > 0 ? (
        <>
          <h2 className={css.title}>{t.reviews.title}</h2>
          <ReviewsList reviews={reviews} />
        </>
      ) : (
        <p>{t.reviews.noReviews}</p>
      )}
      <ScrollTopBtn />
    </>
  );
};

export default Reviews;
