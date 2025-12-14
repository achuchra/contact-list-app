import { memo } from "react";
import { usePersonsWriteContext } from "src/contexts";
import { Person } from "src/types";
import { Button } from "src/ui";
import { getInitials } from "src/utils";
import styles from "./personInfo.module.css";

type PersonInfoProps = Person & {
  isSelected: boolean;
};

export const PersonInfo = memo(
  ({
    id,
    emailAddress,
    firstNameLastName,
    jobTitle,
    isSelected,
  }: PersonInfoProps) => {
    const { togglePerson } = usePersonsWriteContext();

    return (
      <Button
        semanticOnly
        onClick={() => togglePerson(id)}
        data-testid={`person-info-${id}`}
      >
        <article className={styles.personInfo} data-selected={isSelected}>
          <div className={styles.personDetailsHeader}>
            <div className={styles.personInitials}>
              {getInitials(firstNameLastName)}
            </div>
            <div>
              <h3 className={styles.personName}>{firstNameLastName}</h3>
              <p className={styles.jobTitle}>{jobTitle}</p>
            </div>
          </div>
          <p className={styles.emailAddress}>{emailAddress}</p>
        </article>
      </Button>
    );
  }
);

PersonInfo.displayName = "PersonInfo";
