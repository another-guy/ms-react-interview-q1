import { yupResolver } from '@hookform/resolvers/yup';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const allowedLocations = Object.freeze(['China', 'USA', 'Brazil'] as const);
const locationList = Object.freeze(['', ...allowedLocations] as const);

const nameLocationSchema = yup
  .object()
  .shape({
    name: yup.string().required(),
    location: yup.string().required().oneOf(allowedLocations),
  })
  .required();

type NameLocationFormSchema = yup.InferType<typeof nameLocationSchema>;

export interface NameLocationFormProps {
  onValidSubmit: (data: NameLocationFormSchema) => void;
}

export function NameLocationForm({
  onValidSubmit,
}: NameLocationFormProps): JSX.Element {
  const {
    register,
    reset,
    formState,
    handleSubmit,
  } = useForm<NameLocationFormSchema>({
    resolver: yupResolver(nameLocationSchema),
    defaultValues: createDefaultValues(),
  });

  const { errors } = formState;

  const submitHandler = (data: NameLocationFormSchema) => {
    onValidSubmit(data);
    reset();
  };

  // TODO: styles: layout
  return (
    <div>
      <form onSubmit={handleSubmit(submitHandler)}>
        <TextField
          label='Name'
          {...register('name')}
          error={!!errors.name}
          helperText={errors.name?.message}
        />

        <FormControl fullWidth>
          <InputLabel>Location (required)</InputLabel>
          <Select
            {...register('location')}
            error={!!errors.location}
          >
            {locationList.map((location) => (
              <MenuItem key={location} value={location}>{location}</MenuItem>
            ))}
          </Select>
          {errors.location && <FormHelperText error={!!errors.location}>{errors.location.message}</FormHelperText>}
        </FormControl>

        <div>
          <button onClick={() => { reset(); }}>Clear</button>
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  );
}

export function createDefaultValues(): NameLocationFormSchema {
  return { name: '', location: '' as unknown as typeof allowedLocations[number] };
}
