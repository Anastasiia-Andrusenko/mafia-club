// components/ReviewForm/ReviewForm.tsx
import React, { useState } from "react";
import css from "./ReviewForm.module.css";
import Container from "../Container/Container";
import Button from "../Button/Button";
import { useTranslation } from "@/hooks/useTranslation";

interface ReviewFormProps {
  onReviewAdded: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ onReviewAdded }) => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  // Honeypot: hidden from users, only bots fill it in. The API rejects non-empty values.
  const [website, setWebsite] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setError(null);

    const newReview = {
      name,
      comment,
      date: new Date().toISOString(),
      website,
    };

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newReview),
      });

      if (!response.ok) {
        // Never pretend the review was saved; show a localized reason.
        throw new Error(
          response.status === 429
            ? t.reviews.submitTooMany
            : response.status === 400
              ? t.reviews.submitInvalid
              : t.reviews.submitError,
        );
      }

      // Викликаємо onReviewAdded для оновлення списку відгуків
      onReviewAdded();

      // Очищаємо форму після успішного додавання
      setName("");
      setComment("");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // Network failures surface as TypeError("Failed to fetch"): keep it localized.
      setError(
        error instanceof TypeError
          ? t.reviews.submitError
          : error.message || t.reviews.submitError,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Якщо це Enter, не даємо йому виконати стандартну дію
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      handleSubmit(e as any); // Викликаємо submit програмно
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit} className={css.form}>
        <label className={css.label}>
          {t.reviews.name}:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            maxLength={100}
            className={css.input}
          />
        </label>
        <label className={css.label}>
          {t.reviews.review}:
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={handleKeyDown} // Додаємо обробку клавіші Enter
            required
            maxLength={2000}
            className={css.textArea}
          />
        </label>
        <input
          type="text"
          name="website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "-9999px",
            width: "1px",
            height: "1px",
            opacity: 0,
          }}
        />
        <Button
          text={
            isSubmitting ? `${t.reviews.submitting}` : `${t.reviews.submit}`
          }
          typeBtn={"submit"}
          disabled={isSubmitting}
          className={css.submit}
        ></Button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </Container>
  );
};

export default ReviewForm;
