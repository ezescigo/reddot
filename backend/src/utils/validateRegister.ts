import { UsernamePasswordInput } from "src/resolvers/types/UsernamePasswordInput";
import { checkEmailInString } from "./checkEmailInString";

export const validateRegister = (options: UsernamePasswordInput) => {
  if (options.username.length <= 2) {
    return [
        {
          field: 'username',
          message: 'Username length must be longer than 2 characters.'
        }
      ]
  }

  if (checkEmailInString(options.username)) {
    return [
        {
          field: 'username',
          message: 'Username cannot include @ sign.'
        }
      ]
  }

  if (!checkEmailInString(options.email)) {
    return  [
        {
          field: 'email',
          message: 'Email is not a valid email address.'
        }
      ]
  }

  if (options.password.length <= 2) {
    return [
        {
          field: 'password',
          message: 'Password length must be longer than 2 characters.'
        }
      ]
  }

  return null;
}