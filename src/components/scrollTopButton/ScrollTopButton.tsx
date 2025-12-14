import { Button } from "src/ui";
import { useScrollTop } from "src/hooks";
import styles from "./scrollTopButton.module.css";

export const ScrollTopButton = () => {
  const visible = useScrollTop();

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Button
      className={styles.scrollTopButton}
      data-visible={visible}
      disabled={!visible}
      onClick={scrollTop}
      aria-label="Scroll to top"
    >
      🔝
    </Button>
  );
};
