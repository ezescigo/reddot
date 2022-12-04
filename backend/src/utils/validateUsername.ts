import { checkEmailInString } from "./checkEmailInString";

export const validateUsername = (username: string) => {
  if (username.length <= 2) {
    return [
      {
        field: "username",
        message: "Username length must be longer than 2 characters.",
      },
    ];
  }

  if (checkEmailInString(username)) {
    return [
      {
        field: "username",
        message: "Username cannot include @ sign.",
      },
    ];
  }

  return null;
};
