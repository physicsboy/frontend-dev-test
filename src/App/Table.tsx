import React from "react";
import {DataGrid, GridColDef, GridSortModel} from "@mui/x-data-grid";
import { Person } from "../types";
import { Box } from "@mui/material";
import { useTableContext } from "../context/TableContext";

export default function Table() {
  const {
    items, loading, count: rowCount, pageSize, rowSelectionModel,
    setPageSize, setRowSelectionModel, setOffset,
    handleSortChange, handleSortDirectionChange
  } = useTableContext();

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
          handleSortChange(sortModel?.[0]?.field as keyof Person);
          handleSortDirectionChange(sortModel?.[0]?.sort);
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
