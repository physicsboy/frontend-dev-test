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
  setRowSelectionModel: React.Dispatch<
    React.SetStateAction<GridRowSelectionModel>
  >;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
}

export default function Table(props: TableProps) {
  const [sortModel, setSortModel] = useState<GridSortModel>();

  useEffect(() => {
    console.log('sortModel changed', {sortModel});
  }, [sortModel]);

  const {
    items,
    loading,
    rowCount,
    pageSize,
    rowSelectionModel,
    setRowSelectionModel,
    setPageSize,
    setOffset,
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
        sortModel={sortModel}
        onSortModelChange={(sortModel: GridSortModel) => {
          setSortModel(sortModel);
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
