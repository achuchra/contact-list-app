import { exhaustiveCheck, Person, PersonsReducerState } from "src/types";

type PersonsAction =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: Person[] }
  | { type: "FETCH_ERROR" }
  | { type: "TOGGLE_PERSON"; payload: Person["id"] };

export const personsReducer = (
  state: PersonsReducerState,
  action: PersonsAction
): PersonsReducerState => {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, status: "loading" };

    case "FETCH_SUCCESS":
      const newPersons = action.payload;
      return {
        ...state,
        status: "success",
        persons: [...state.persons, ...newPersons],
      };

    case "FETCH_ERROR":
      return { ...state, status: "error" };

    case "TOGGLE_PERSON":
      const toggledId = action.payload;

      const updatedSelectedIds = new Set(state.selectedIds);
      if (state.selectedIds.has(toggledId)) {
        updatedSelectedIds.delete(toggledId);
      } else {
        updatedSelectedIds.add(toggledId);
      }

      return { ...state, selectedIds: updatedSelectedIds };

    default:
      return exhaustiveCheck(action);
  }
};
