import { useCallback, type Dispatch } from "react";
import apiData from "src/api";
import { Person } from "src/types";

type PersonsDispatch = Dispatch<
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: Person[] }
  | { type: "FETCH_ERROR" }
  | { type: "TOGGLE_PERSON"; payload: Person["id"] }
>;

export const usePersonsActions = (dispatch: PersonsDispatch) => {
  const getNextPersons = useCallback(async () => {
    dispatch({ type: "FETCH_START" });
    try {
      const data: Person[] = await apiData();
      dispatch({ type: "FETCH_SUCCESS", payload: data });
    } catch {
      dispatch({ type: "FETCH_ERROR" });
    }
  }, [dispatch]);

  const togglePerson = useCallback(
    (id: string) => {
      dispatch({ type: "TOGGLE_PERSON", payload: id });
    },
    [dispatch]
  );

  return { getNextPersons, togglePerson };
};
