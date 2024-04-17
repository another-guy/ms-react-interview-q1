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
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { getLocations, isNameValid } from '../mock-api/apis';

// Igor's comment:
//
// Many things in this solution are intentionally trivialized.
// While the real project would be more complex for robustness, scalability,
// user-friendlyness, etc., I strongly believe that the code should be as
// simple as possible.
//
// This project does not handle i11n, a11y, error handling, loading states, and
// is not covered with automated tests.

export interface NameLocationFormProps {
  onValidSubmit: (nameLocationForm: NameLocationFormType) => void;
}

export function NameLocationForm({
  onValidSubmit,
}: NameLocationFormProps): JSX.Element {

  // Igor's comment:
  //
  // The following useState + useEffect is a trivial way to fetch the locations.
  // It does not handle possible location changes, errors, loading states, etc.
  // In real project we would use a library like SWR, React Query, or similar,
  // and populate a state in the application store.
  const [allowedLocations, setAllowedLocations] = React.useState<string[]>([]);
  useEffect(() => {
    const triggerLocationsFetch = async () => {
      try {
        setAllowedLocations(await getLocations());
      } catch {
        alert('Failed to fetch locations. Please try to refresh the page later.')
      }
    };
    triggerLocationsFetch();
  }, [],);

  const nameLocationSchema = createNameLocationSchema({ isNameValid, allowedLocations });

  const {
    register,
    reset,
    formState,
    handleSubmit,
    watch,
  } = useForm<NameLocationFormType>({
    resolver: yupResolver(nameLocationSchema),
    defaultValues: createDefaultValues(),
  });

  const { errors } = formState;

  const submitHandler = (nameLocationForm: NameLocationFormType) => {
    onValidSubmit(nameLocationForm);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={4}>
            <TextField
              fullWidth
              label='Name'
              {...register('name')}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <FormControl fullWidth>
              <InputLabel>Location (required)</InputLabel>
              <Select
                {...register('location')}
                value={watch('location')}
                error={!!errors.location}
              >
                {(['', ...allowedLocations]).map((location) => (
                  <MenuItem key={location} value={location}>{location || 'Not selected'}</MenuItem>
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

export function createDefaultValues(): NameLocationFormType {
  return { name: '', location: '' };
}

export function createNameLocationSchema({
  isNameValid,
  allowedLocations,
}: {
  isNameValid: (name: string) => Promise<boolean>,
  allowedLocations: string[],
}) {
  return yup
    .object()
    .shape({
      // Igor's comment:
      //
      // Besides the required field, we also validate the name asynchronously
      // by calling the callback (that delegates the work to the mock API).
      name: yup.string().required().test(
        'is-name-valid-according-to-api',
        (name) => `The name "${name.value}" is invalid, please try another one.`,
        async (name) => {
          // Igor's comment:
          //
          // It is worth debouncing here, but I'm keeping it simple.
          // In real project we don't want to spam the API endpoint with
          // requests on each and every key stroke.
          return await isNameValid(name);
        },
      ),
      location: yup.string().required().oneOf(allowedLocations),
    })
    .required();
}
type NameLocationSchema = ReturnType<typeof createNameLocationSchema>;
type NameLocationFormType = yup.InferType<NameLocationSchema>;
