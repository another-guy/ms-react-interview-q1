import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React from 'react';
import { NameLocationEntry } from './types';

export interface NameLocationListProps {
  value: NameLocationEntry[];
}

const columns: GridColDef<NameLocationEntry>[] = [
  { field: 'name', headerName: 'Name', valueGetter: (_, row) => row.name, width: 130 },
  { field: 'location', headerName: 'Location', valueGetter: (_, row) => row.location, width: 130 },
];

export function NameLocationList({
  value: nameLocationList,
}: NameLocationListProps): JSX.Element {
  return (
    <DataGrid
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
