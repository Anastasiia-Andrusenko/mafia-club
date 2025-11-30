import React, { useMemo } from "react";
import css from "./SnowContainer.module.css";

interface SnowContainerProps {
  children: React.ReactNode;
  snowflakeCount?: number;
  className?: string;
}

const SnowContainer: React.FC<SnowContainerProps> = ({
  children,
  snowflakeCount = 30,
  className = "",
}) => {
  const snowflakes = useMemo(() => {
    return Array.from({ length: snowflakeCount }).map((_, index) => {
      const randomLeft = Math.random() * 100;
      const randomDuration = 5 + Math.random() * 10;
      const randomDelay = Math.random() * -15;
      const randomSize = 2 + Math.random() * 3;
      const randomOpacity = 0.3 + Math.random() * 0.5;

      return (
        <span
          key={index}
          className={css.snowflake}
          style={
            {
              "--left": `${randomLeft}%`,
              "--duration": `${randomDuration}s`,
              "--delay": `${randomDelay}s`,
              "--size": `${randomSize}px`,
              "--opacity": randomOpacity,
            } as React.CSSProperties
          }
        />
      );
    });
  }, [snowflakeCount]);

  return (
    <div className={`${css.container} ${className}`}>
      <div className={css.snowLayer} aria-hidden="true">
        {snowflakes}
      </div>

      <div className={css.content}>{children}</div>
    </div>
  );
};

export default SnowContainer;
