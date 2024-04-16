import { yupResolver } from '@hookform/resolvers/yup';
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
  // TODO: styles: validation errors
  return (
    <div>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div>
          <label htmlFor='name'>Name</label>
          <input {...register('name')} />
          {errors.name && <div>{errors.name.message}</div>}
        </div>

        <div>
          <label htmlFor='location'>Location</label>
          <select {...register('location')}>
            {locationList.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
          {errors.location && <div>{errors.location.message}</div>}
        </div>

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
