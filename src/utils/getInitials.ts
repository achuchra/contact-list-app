const INITIALS_MAX_LENGTH = 2;

export const getInitials = (name: string): string =>
  name
    .split(" ")
    .reduce(
      (acc, curr, index) =>
        index < INITIALS_MAX_LENGTH ? `${acc}${curr[0]}` : acc,
      ""
    );
