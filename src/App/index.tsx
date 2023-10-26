import React, { useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Drawer,
  Paper,
  Snackbar,
  Typography,
} from "@mui/material";
import { queryApi } from "../api";
import { GridRowSelectionModel } from "@mui/x-data-grid";
import { EmployeeType, Person, PersonRole } from "../types";
import Table from "./Table";
import { Filter } from "./Filter";
import {useSearchParams} from "react-router-dom";

function App() {
  let [searchParams, setSearchParams] = useSearchParams();

  const [rowSelectionModel, setRowSelectionModel] =
    React.useState<GridRowSelectionModel>([]);
  const [search, setSearch] = React.useState<string>(searchParams.get('search') || '');
  const [offset, setOffset] = React.useState<number>(0);
  const [pageSize, setPageSize] = React.useState<number>(10);
  const [role, setRole] = React.useState<PersonRole>(searchParams.get('role') as PersonRole || "ANY");
  const [employeeType, setEmployeeType] = React.useState<EmployeeType>(searchParams.get('employeeType') as EmployeeType ||"ANY");
  const [showDrawer, setShowDrawer] = React.useState<boolean>(false);
  const [sort, setSort] = React.useState<keyof Person | null>(searchParams.get('sort') as keyof Person || null);
  const [sortDirection, setSortDirection] = React.useState<
    "asc" | "desc" | null | undefined
  >(searchParams.get('searchDirection') as "asc" | "desc" | null | undefined || null);
  const [items, setItems] = React.useState<Person[]>([]);
  const [count, setCount] = React.useState<number>(0);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const updateSearchParams = (newSearchParams: any): void => {
    const [key, val] = Object.entries(newSearchParams)[0];

    setSearchParams(params => {
      params.set(key, val as string);
      return params;
    });
  }

  const handleSearchChange = (search: string): void => {
    setSearch(search);
    updateSearchParams({search});
  };

  const handleRoleChange = (role: PersonRole): void => {
    setRole(role);
    role === 'STUDENT' && setEmployeeType('ANY');
    updateSearchParams({role});
  }

  const handleEmployeeTypeChange = (employeeType: EmployeeType): void => {
    setEmployeeType(employeeType);
    updateSearchParams({employeeType});
  };

  // TODO: Update type
  const handleSortChange = (sort: any): void => {
    console.log('handleSortChange', {sort});
    setSort(sort);
    updateSearchParams({sort});
  }

  // TODO: Update type
  const handleSortDirectionChange = (sortDirection: any): void => {
    console.log('handleSortDirectionChange', {sortDirection});
    setSortDirection(sortDirection);
    updateSearchParams({sortDirection});
  }

  useEffect(() => {
    setShowDrawer(rowSelectionModel.length > 0);
  }, [rowSelectionModel]);

  useEffect(() => {
    setLoading(true);
    queryApi(search, role, employeeType, offset, pageSize, sort, sortDirection)
      .then(({ items, count }) => {
        setItems(items);
        setCount(count);
        setLoading(false);
      })
      .catch(() =>
        setErrorMessage("There has been an error loading from the API.")
      );
  }, [search, role, employeeType, offset, pageSize, sort, sortDirection]);

  return (
    <Container>
      <Paper sx={{ p: 2 }}>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={errorMessage !== null}
          autoHideDuration={6000}
          onClose={() => setErrorMessage(null)}
          message={errorMessage}
        />

        <Box>
          <Typography variant="h4">Person Admin</Typography>
        </Box>

        <Filter
          {...{
            search,
            setSearch: handleSearchChange,
            role,
            setRole: handleRoleChange,
            employeeType,
            setEmployeeType: handleEmployeeTypeChange,
          }}
        />

        <Table
          items={items}
          loading={loading}
          rowCount={count}
          pageSize={pageSize}
          rowSelectionModel={rowSelectionModel}
          sort={sort}
          sortDirection={sortDirection}
          setRowSelectionModel={setRowSelectionModel}
          setOffset={setOffset}
          setPageSize={setPageSize}
          setSort={handleSortChange}
          setSortDirection={handleSortDirectionChange}
        />

        <Drawer
          anchor="bottom"
          open={showDrawer}
          onClose={setShowDrawer}
          hideBackdrop={true}
          variant="persistent"
        >
          <Box sx={{ bgcolor: "black", p: 4, color: "white" }}>
            <Button color="primary" onClick={() => setRowSelectionModel([])}>
              Export {rowSelectionModel.length} item(s) ➡️{" "}
            </Button>
          </Box>
        </Drawer>
      </Paper>
    </Container>
  );
}

export default App;
