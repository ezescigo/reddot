import { UsernamePasswordInput } from "src/resolvers/types/UsernamePasswordInput";
import { validateEmail } from "./validateEmail";
import { validatePassword } from "./validatePassword";
import { validateUsername } from "./validateUsername";

export const validateRegister = (options: UsernamePasswordInput) => {
  const emailErrors = validateEmail(options.email);
  if (emailErrors) {
    return emailErrors;
  }

  const usernameErrors = validateUsername(options.username);
  if (usernameErrors) {
    return usernameErrors;
  }

  const passwordErrors = validatePassword(options.password);
  if (passwordErrors) {
    return passwordErrors;
  }

  return null;
};
