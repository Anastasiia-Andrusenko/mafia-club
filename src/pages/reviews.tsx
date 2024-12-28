// pages/reviews.tsx
import React, { useState, useEffect } from "react";
import ReviewsList from "@/components/ReviewsList/ReviewsList";
import ReviewForm from "@/components/ReviewForm/ReviewForm";
import ScrollTopBtn from "@/components/ScrollTopBtn/ScrollTopBtn";
import { useTranslation } from "@/hooks/useTranslation";
import css from "../styles/Reviews.module.css";

// Тип для одного відгуку
interface Review {
  id: string;
  name: string;
  comment: string;
  date: string;
}

const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]); // Типізуємо масив відгуків
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
      const data: Review[] = await response.json(); // Типізуємо дані
      setReviews(data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    fetchReviews(); // Викликаємо fetch при першому завантаженні
  }, [updateTrigger]); // Оновлюємо список відгуків кожен раз, коли додається новий

  return (
    <>
      <h2 className={css.title}>{t.reviews.giveFeedBack}</h2>
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
