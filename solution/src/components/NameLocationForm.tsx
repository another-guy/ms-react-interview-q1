import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
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
    <form onSubmit={handleSubmit(submitHandler)}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label='Name'
              {...register('name')}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          </Grid>

          <Grid item xs={12}>
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
          </Grid>

          <Grid item xs={12}>
            <Button
              variant='outlined'
              onClick={() => { reset(); }}
              color='error'
            >
              Clear
            </Button>

            &nbsp;

            <Button
              variant='contained'
              type="submit"
              color='primary'
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
}

export function createDefaultValues(): NameLocationFormSchema {
  return { name: '', location: '' as unknown as typeof allowedLocations[number] };
}
