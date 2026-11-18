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
  const [isLoaded, setIsLoaded] = useState(false);
  const [updateTrigger, setUpdateTrigger] = useState(0);
  const { t } = useTranslation();
  const handleReviewAdded = () => {
    setUpdateTrigger((prev) => prev + 1);
  };

  const fetchReviews = async () => {
    try {
      const response = await fetch("/api/reviews");
      if (!response.ok) {
        throw new Error("Failed to fetch reviews");
      }
      const data: Review[] = await response.json();
      data.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
      setReviews(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [updateTrigger]);

  return (
    <>
      <h1 className={css.title}>{t.reviews.giveFeedBack}</h1>
      <p className={css.description}>{t.reviews.description}</p>
      <ReviewForm onReviewAdded={handleReviewAdded} />
      {/* The list arrives from /api/reviews after hydration. Reserve its
          space so the footer below does not jump down when it is inserted. */}
      <div className={css.listSlot}>
        {reviews.length > 0 ? (
          <>
            <h2 className={css.title}>{t.reviews.title}</h2>
            <ReviewsList reviews={reviews} />
          </>
        ) : (
          isLoaded && <p>{t.reviews.noReviews}</p>
        )}
      </div>
      <ScrollTopBtn />
    </>
  );
};

export default Reviews;
