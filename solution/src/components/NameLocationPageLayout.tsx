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

type NameLocationForm = yup.InferType<typeof nameLocationSchema>;

export function NameLocationPageLayout(): JSX.Element {

  const {
    register,
    reset,
    formState,
    handleSubmit,
  } = useForm<NameLocationForm>({
    resolver: yupResolver(nameLocationSchema),
    defaultValues: createDefaultValues(),
  });

  return (
    <div>
      <form onSubmit={() => {
        // TODO:
      }}>
        <input {...register('name')} />
        <input {...register('location')} />
        <button onClick={() => {
          // TODO:
        }}>
          Clear
        </button>
        <button type="submit">
          Add
        </button>
      </form>
    </div>
  );
}

export function createDefaultValues(): NameLocationForm {
  return { name: '', location: '' };
}
