import React, {useEffect, useState} from "react";
import {DataGrid, GridColDef, GridRowSelectionModel, GridSortModel} from "@mui/x-data-grid";
import { Person } from "../types";
import { Box } from "@mui/material";

interface TableProps {
  items: Person[];
  rowCount: number;
  loading: boolean;
  pageSize: number;
  rowSelectionModel: GridRowSelectionModel;
  sort: keyof Person | null;
  sortDirection: "asc" | "desc" | null | undefined;
  setRowSelectionModel: React.Dispatch<
    React.SetStateAction<GridRowSelectionModel>
  >;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
  // setSort: keyof Person | null; // Threw a wobbly when using the same key as defined in index.tsx
  setSort: any;
  setSortDirection: React.Dispatch<React.SetStateAction<"asc" | "desc" | null | undefined>>;
}

export default function Table(props: TableProps) {
  const [sortModel, setSortModel] = useState<GridSortModel>();

  const {
    items,
    loading,
    rowCount,
    pageSize,
    rowSelectionModel,
    setRowSelectionModel,
    setPageSize,
    setOffset,
    setSort,
    setSortDirection
  } = props;
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "firstName",
      headerName: "First Name",
      width: 150,
      editable: true,
    },
    { field: "lastName", headerName: "Last Name", width: 150, editable: true },
    {
      field: "role",
      headerName: "Role",
      width: 150,
      editable: true,
      type: "singleSelect",
      valueOptions: ["STUDENT", "EMPLOYEE"],
    },
    {
      field: "employeeType",
      headerName: "Employee Type",
      width: 150,
      editable: true,
      type: "singleSelect",
      valueOptions: ["FULL_TIME", "PART_TIME"],
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 150,
      editable: true,
      type: 'string',
    }
  ];

  return (
    <Box mb={10}>
      <DataGrid<Person>
        rows={items}
        columns={columns}
        isCellEditable={() => false}
        loading={loading}
        disableColumnFilter
        disableRowSelectionOnClick
        sortingMode="server"
        onSortModelChange={(sortModel: GridSortModel) => {
          // NOTE: This will only be good for sorting single columns at the moment.
          setSort(sortModel?.[0]?.field); // as keyof Person
          setSortDirection(sortModel?.[0]?.sort); // as "asc" | "desc" | null | undefined
        }}
        paginationMode="server"
        rowCount={rowCount}
        initialState={{
          pagination: { paginationModel: { pageSize } }
        }}
        pageSizeOptions={[10, 20, 50]}
        onPaginationModelChange={({ page, pageSize }) => {
          setPageSize(pageSize);
          setOffset(pageSize * page);
        }}
        checkboxSelection={true}
        rowSelectionModel={rowSelectionModel}
        onRowSelectionModelChange={(newRowSelectionModel) => {
          setRowSelectionModel(newRowSelectionModel);
        }}
      />
    </Box>
  );
}
