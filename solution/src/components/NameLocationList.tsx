import React from 'react';
import { NameLocationEntry } from './types';

export interface NameLocationListProps {
  value: NameLocationEntry[];
}

export function NameLocationList({
  value: nameLocationList,
}: NameLocationListProps): JSX.Element {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>
        {nameLocationList.map(({ name, location }, index) => (
          <tr key={index}>
            <td>{name}</td>
            <td>{location}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
