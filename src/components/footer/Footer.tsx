import styles from "./footer.module.css";
import { LoadMoreButton, ScrollTopButton } from "src/components";
import { usePersonsReadContext } from "src/contexts";

export const Footer = () => {
  const { status } = usePersonsReadContext();

  return (
    <footer className={styles.footer}>
      <LoadMoreButton status={status} />
      <ScrollTopButton />
    </footer>
  );
};
