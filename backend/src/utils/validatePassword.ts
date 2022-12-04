export const validatePassword = (
  password: string,
  passwordFieldName?: string
) => {
  if (password.length <= 2) {
    return [
      {
        field: passwordFieldName ?? "password",
        message: "Password length must be longer than 2 characters.",
      },
    ];
  }

  return null;
};
