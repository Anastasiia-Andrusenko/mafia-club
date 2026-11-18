import React, { useEffect, useState } from "react";
import css from "../Overlay/Overlay.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  /** Extra classes for the backdrop / the animated wrapper (e.g. the lead form). */
  overlayClassName?: string;
  wrapperClassName?: string;
};

const OverlayModal: React.FC<Props> = ({
  isOpen,
  onClose,
  children,
  overlayClassName,
  wrapperClassName,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEscPress = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    // Only while open: a closed instance must not release a scroll lock held
    // elsewhere (e.g. by the mobile menu).
    if (!isOpen) return;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscPress);
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscPress);
    };
  }, [isOpen, onClose]);

  if (!mounted) return null;

  const content = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={`${css.overlay} ${overlayClassName ?? ""}`}
          onClick={handleOverlayClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className={`${css.formWrapper} ${wrapperClassName ?? ""}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
  return createPortal(content, document.getElementById("overlay-root")!);
};

export default OverlayModal;
