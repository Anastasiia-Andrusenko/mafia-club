// components/ReviewForm/ReviewForm.tsx
import React, { useState } from "react";
import css from './ReviewForm.module.css';
import Container from "../Container/Container";
import Button from "../Button/Button";

interface ReviewFormProps {
  onReviewAdded: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ onReviewAdded }) => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const newReview = {
      name,
      comment,
      date: new Date().toISOString(),
    };

    try {
      const response = await fetch('/api/reviews', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReview),
      });

      if (!response.ok) {
        throw new Error('Failed to add review');
      }

      // Викликаємо onReviewAdded для оновлення списку відгуків
      onReviewAdded();

      // Очищаємо форму після успішного додавання
      setName("");
      setComment("");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message || "Error submitting review");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();  // Якщо це Enter, не даємо йому виконати стандартну дію
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      handleSubmit(e as any);  // Викликаємо submit програмно
    }
  };

  return (
    <Container>
    <form onSubmit={handleSubmit} className={css.form}> 
      <label className={css.label}>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className={css.input}
        />
      </label>
      <label  className={css.label}>
        Review:
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyDown={handleKeyDown}  // Додаємо обробку клавіші Enter
          required
          className={css.textArea}
        />
      </label>
      <Button text={isSubmitting ? "Submitting..." : "Submit Review"} typeBtn={"submit"} disabled={isSubmitting}  className={css.submit}></Button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
    </Container>
  );
};

export default ReviewForm;
