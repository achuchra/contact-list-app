import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useReducer,
} from "react";
import { usePersonsActions, usePersonsSelectors } from "src/hooks";
import { personsReducer } from "src/reducers";
import { PersonsRead, PersonsReducerState, PersonsWrite } from "src/types";

const PersonsReadContext = createContext<PersonsRead | undefined>(undefined);
const PersonsWriteContext = createContext<PersonsWrite | undefined>(undefined);

const initialState: PersonsReducerState = {
  status: "idle",
  persons: [],
  selectedIds: new Set(),
};

export const PersonsProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(personsReducer, initialState);
  const { getNextPersons, togglePerson } = usePersonsActions(dispatch);
  const { isSelected, sortedPersonsView, selectedCount } =
    usePersonsSelectors(state);

  const readContextValue: PersonsRead = useMemo(
    () => ({
      status: state.status,
      persons: sortedPersonsView,
      isSelected,
      selectedCount,
    }),
    [state.status, sortedPersonsView, isSelected, selectedCount]
  );

  const writeContextValue: PersonsWrite = useMemo(
    () => ({
      getNextPersons,
      togglePerson,
    }),
    [getNextPersons, togglePerson]
  );

  return (
    <PersonsWriteContext.Provider value={writeContextValue}>
      <PersonsReadContext.Provider value={readContextValue}>
        {children}
      </PersonsReadContext.Provider>
    </PersonsWriteContext.Provider>
  );
};

export const usePersonsReadContext = () => {
  const context = useContext(PersonsReadContext);

  if (!context) {
    throw new Error(
      "usePersonsReadContext must be used within a PersonsProvider"
    );
  }
  return context;
};

export const usePersonsWriteContext = () => {
  const context = useContext(PersonsWriteContext);

  if (!context) {
    throw new Error(
      "usePersonsWriteContext must be used within a PersonsProvider"
    );
  }
  return context;
};
