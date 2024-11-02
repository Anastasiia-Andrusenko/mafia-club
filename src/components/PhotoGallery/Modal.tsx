// components/Modal.tsx
import React, { useEffect } from "react";
import Image from "next/image";
import css from "./Modal.module.css";
import { TfiClose } from "react-icons/tfi";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: { src: string; alt: string }[];
  currentIndex: number;
  onChangeIndex: (index: number) => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  images,
  currentIndex,
  onChangeIndex,
}) => {
  const handlePrev = () => {
    if (currentIndex > 0) {
      onChangeIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      onChangeIndex(currentIndex + 1);
    }
  };
  // Обробка клавіш і блокування скролу
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowLeft":
          handlePrev();
          break;
        case "ArrowRight":
          handleNext();
          break;
        case "Escape":
          onClose();
          break;
        default:
          break;
      }
    };

    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.documentElement.style.overflow = ""; // Повернути скрол
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, currentIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div className={css.overlay} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button className={css.closeButton} onClick={onClose}>
          <TfiClose className={css.icon} />
        </button>
        <button className={css.prevButton} onClick={handlePrev}>
          <GrPrevious className={css.icon} />
        </button>
        <Image
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          width={1000}
          height={1000}
          className={css.bigImg}
        />
        <button className={css.nextButton} onClick={handleNext}>
          <GrNext className={css.icon} />
        </button>
      </div>
    </div>
  );
};

export default Modal;
