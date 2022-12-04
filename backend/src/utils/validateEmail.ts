import { checkEmailInString } from "./checkEmailInString";

export const validateEmail = (email: string) => {
  if (!checkEmailInString(email)) {
    return [
      {
        field: "email",
        message: "Email is not a valid email address.",
      },
    ];
  }

  return null;
};
