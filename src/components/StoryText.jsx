import { useEffect, useMemo, useState } from "react";

function StoryText({
  as: Tag = "p",
  text,
  className = "",
  delay = 0,
  speed = 55,
}) {
  const words = useMemo(() => text.split(" "), [text]);
  const [visibleCount, setVisibleCount] = useState(0);
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (prefersReducedMotion) {
      return undefined;
    }

    let intervalId;
    const startTimer = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        setVisibleCount((current) => {
          if (current >= words.length) {
            window.clearInterval(intervalId);
            return current;
          }

          return current + 1;
        });
      }, speed);
    }, delay);

    return () => {
      window.clearTimeout(startTimer);
      if (intervalId) {
        window.clearInterval(intervalId);
      }
    };
  }, [delay, prefersReducedMotion, speed, words]);

  const currentCount = prefersReducedMotion ? words.length : visibleCount;
  const visibleText = words.slice(0, currentCount).join(" ");
  const isDone = currentCount >= words.length;

  return (
    <Tag className={`story-text ${className}`.trim()} aria-label={text}>
      <span>{visibleText}</span>
      {!isDone ? <span className="story-cursor" aria-hidden="true" /> : null}
    </Tag>
  );
}

export default StoryText;
