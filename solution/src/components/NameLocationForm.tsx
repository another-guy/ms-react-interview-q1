import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const nameLocationSchema = yup
  .object()
  .shape({
    name: yup.string().required(),
    location: yup.string().required().oneOf(['China', 'USA', 'Brazil']),
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

  return (
    <div>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div>
          <label htmlFor='name'>Name</label>
          <input {...register('name')} />
          {errors.name && <div>{errors.name.message}</div>}
        </div>

        <div>
          {/* TODO: dropdown */}
          <label htmlFor='location'>Location</label>
          <input {...register('location')} />
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
  return { name: '', location: '' };
}
