import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'
import TextField, { TextFieldProps } from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import React from 'react'
import { useController, useForm } from 'react-hook-form'
import { Control, FieldValues, Path, PathValue, ValidationRule } from 'react-hook-form/dist/types'
import CenteredLayout from '../../../components/CenteredLayout'
import type { UserCreateRequest } from '../api/user/create'

type FormTextFieldProps<T extends FieldValues> = Omit<
  TextFieldProps,
  'name' | 'onChange' | 'onBlur' | 'value' | 'inputRef' | 'required'
> & {
  name: string
  required?: string | ValidationRule<boolean>
  pattern?: ValidationRule<RegExp>
  control: Control<T>
}

function FormTextField<T extends FieldValues>({
  name,
  control,
  error,
  required,
  pattern,
  ...props
}: FormTextFieldProps<T>) {
  const {
    field,
    fieldState: { invalid, isTouched, isDirty, error: fieldError },
    formState: { touchedFields, dirtyFields },
  } = useController({
    name: name as Path<T>,
    control,
    rules: { required, pattern },
    defaultValue: '' as PathValue<T, Path<T>>,
  })
  return (
    <TextField
      {...props}
      onChange={field.onChange}
      onBlur={field.onBlur}
      value={field.value}
      name={field.name}
      inputRef={field.ref}
      error={error ?? invalid}
      helperText={(invalid && fieldError?.message) || props.helperText}
    />
  )
}

export default function UserCreate() {
  const { control, handleSubmit } = useForm<UserCreateRequest>()
  function onSubmit(data: UserCreateRequest): void {
    console.log(data)
    fetch('/api/user/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(res => console.log(res))
  }

  return (
    <CenteredLayout>
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack padding={2} spacing={2}>
            <Typography variant="h6">Create a new user</Typography>
            <FormTextField required="Username is required" name="username" label="Username" control={control} />
            <FormTextField
              required="Email is required"
              name="email"
              label="Email"
              pattern={{
                message: 'Email must be valid',
                value:
                  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i,
              }}
              control={control}
            />
            <FormTextField
              required="Password is required"
              type="password"
              name="password"
              label="Password"
              control={control}
            />
            <Button type="submit">Create</Button>
          </Stack>
        </form>
      </Card>
    </CenteredLayout>
  )
}
