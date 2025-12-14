import { Button } from "src/ui";
import { LOAD_MORE_BUTTON_TEXT } from "src/const";
import { usePersonsWriteContext } from "src/contexts";
import { PersonsRead } from "src/types";
import styles from "./loadMoreButton.module.css";

export const LoadMoreButton = ({
  status,
}: {
  status: PersonsRead["status"];
}) => {
  const { getNextPersons } = usePersonsWriteContext();
  const buttonTextKey = status === "success" ? "idle" : status;

  return (
    <Button
      onClick={getNextPersons}
      data-testid="load-more-button"
      disabled={status === "loading"}
      style={{ minWidth: "15rem" }}
    >
      <div className={styles.loadMoreButtonContent}>
        {status === "loading" ? <span className="loader"></span> : null}
        {LOAD_MORE_BUTTON_TEXT[buttonTextKey]}
      </div>
    </Button>
  );
};
