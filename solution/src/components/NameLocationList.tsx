import './NameLocationList.css';

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React from 'react';
import { NameLocationEntry } from './types';

export interface NameLocationListProps {
  value: NameLocationEntry[];
}

const columns: GridColDef<NameLocationEntry>[] = [
  {
    field: 'name',
    headerName: 'Name',
    valueGetter: (_, row) => row.name,
    width: 300,
  },
  {
    field: 'location',
    headerName: 'Location',
    valueGetter: (_, row) => row.location,
    width: 300,
  },
];

export function NameLocationList({
  value: nameLocationList,
}: NameLocationListProps): JSX.Element {
  return (
    <DataGrid
      className='NameLocationList'
      columns={columns}
      rows={nameLocationList.map((entry, index) => ({ id: index, ...entry }))}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 5 },
        },
      }}
      pageSizeOptions={[5, 10]}
    />
  );
}
