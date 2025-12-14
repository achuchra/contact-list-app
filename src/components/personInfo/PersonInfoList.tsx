import { PersonInfo } from "src/components";
import { usePersonsReadContext } from "src/contexts";
import styles from "./personInfo.module.css";

export const PersonInfoList = () => {
  const { persons, isSelected } = usePersonsReadContext();

  return (
    <div className={styles.personInfoList}>
      {persons.map((personInfo) => (
        <PersonInfo
          key={personInfo.id}
          {...personInfo}
          isSelected={isSelected(personInfo.id)}
        />
      ))}
    </div>
  );
};
