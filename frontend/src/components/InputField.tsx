import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
  TextareaProps,
} from "@chakra-ui/react"
import { useField } from "formik"
import React, { InputHTMLAttributes } from "react"

type InputFieldProps = InputHTMLAttributes<HTMLInputElement & TextareaProps> & {
  name: string
  label?: string
  textArea?: boolean
}

export const InputField: React.FunctionComponent<InputFieldProps> = ({
  label,
  size,
  textArea,
  ...props
}) => {
  const [field, { error }] = useField(props)
  return (
    <FormControl isInvalid={!!error}>
      {label && <FormLabel htmlFor={field.name}>{label}</FormLabel>}
      {textArea ? (
        <Textarea {...field} {...props} id={field.name} />
      ) : (
        <Input {...field} {...props} id={field.name} />
      )}
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  )
}
