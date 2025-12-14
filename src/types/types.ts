export type Person = {
  id: string;
  jobTitle: string;
  firstNameLastName: string;
  emailAddress: string;
};

export type PersonsFetchStatus = "idle" | "loading" | "error" | "success";

export type PersonsReducerState = {
  status: PersonsFetchStatus;
  persons: Person[];
  selectedIds: Set<Person["id"]>;
};

export type PersonsRead = {
  status: PersonsFetchStatus;
  persons: Person[];
  isSelected: (id: Person["id"]) => boolean;
  selectedCount: number;
};

export type PersonsWrite = {
  togglePerson: (id: Person["id"]) => void;
  getNextPersons: () => Promise<void>;
};
