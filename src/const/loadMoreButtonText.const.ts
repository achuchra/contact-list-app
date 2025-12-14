import { PersonsFetchStatus } from "src/types";

export const LOAD_MORE_BUTTON_TEXT: Record<
  Exclude<PersonsFetchStatus, "success">,
  string
> = {
  idle: "Load More",
  loading: "Loading",
  error: "An error occured! Retry?",
};
