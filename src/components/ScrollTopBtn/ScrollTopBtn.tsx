import css from "./ScrollTopBtn.module.css";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { useState, useEffect } from "react";

const ScrollTopBtn = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isRendered, setIsRendered] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1000) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!isVisible) {
      const timer = setTimeout(() => {
        setIsRendered(false);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      setIsRendered(true);
    }
  }, [isVisible]);

  return (
    <>
      {isRendered && (
        <div
          className={`${css.wrapper} ${isVisible ? css.show : ""}`}
          onClick={scrollToTop}
        >
          <FaArrowAltCircleUp />
        </div>
      )}
    </>
  );
};

export default ScrollTopBtn;
