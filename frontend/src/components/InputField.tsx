import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputProps,
  OmitCommonProps,
} from "@chakra-ui/react";
import { FieldHookConfig, useField } from "formik";
import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
};

export const InputField: React.FunctionComponent<InputFieldProps> = ({
  label,
  size,
  ...props
}) => {
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Input {...field} {...props} id={field.name} />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
