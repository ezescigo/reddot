import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { FieldHookConfig, useField } from "formik";
import React from "react";

type InputFieldProps = FieldHookConfig<any> & {
  name: string;
  label: string;
  placeholder: string;
};

export const InputField: React.FunctionComponent<InputFieldProps> = (props) => {
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{props.label}</FormLabel>
      <Input {...field} id={field.name} placeholder={props.placeholder} />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
