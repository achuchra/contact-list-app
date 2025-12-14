import { useEffect, useState } from "react";

const DEFAULT_DEBOUNCE_MS = 700;

export const useScrollTop = (debounce = DEFAULT_DEBOUNCE_MS) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const onScroll = () => {
      clearTimeout(timer);

      timer = setTimeout(() => {
        setIsVisible(window.scrollY > 150);
      }, debounce);
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [debounce]);

  return isVisible;
};
