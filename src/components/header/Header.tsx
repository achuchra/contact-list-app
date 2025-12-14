import { usePersonsReadContext } from "src/contexts";
import styles from "./header.module.css";

export const Header = () => {
  const { selectedCount } = usePersonsReadContext();

  return (
    <header className={styles.header}>
      <p>
        Selected contacts:{" "}
        <strong data-testid="selected-count">{selectedCount}</strong>
      </p>
    </header>
  );
};
