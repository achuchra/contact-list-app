import { useCallback, useMemo } from "react";
import { Person, PersonsReducerState } from "src/types";

export const usePersonsSelectors = (state: PersonsReducerState) => {
  const isSelected = useCallback(
    (id: Person["id"]) => state.selectedIds.has(id),
    [state.selectedIds]
  );

  const sortedPersonsView = useMemo<Person[]>(() => {
    const selected: Person[] = [];
    const unselected: Person[] = [];

    for (const person of state.persons) {
      if (state.selectedIds.has(person.id)) {
        selected.push(person);
      } else {
        unselected.push(person);
      }
    }

    return [...selected, ...unselected];
  }, [state.persons, state.selectedIds]);

  const selectedCount = useMemo(
    () => state.selectedIds.size,
    [state.selectedIds]
  );

  return {
    isSelected,
    sortedPersonsView,
    selectedCount,
  };
};
