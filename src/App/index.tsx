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

function App() {
  const [rowSelectionModel, setRowSelectionModel] =
    React.useState<GridRowSelectionModel>([]);
  const [search, setSearch] = React.useState<string>("");
  const [offset, setOffset] = React.useState<number>(0);
  const [pageSize, setPageSize] = React.useState<number>(10);
  const [role, setRole] = React.useState<PersonRole>("ANY");
  const [employeeType, setEmployeeType] = React.useState<EmployeeType>("ANY");
  const [showDrawer, setShowDrawer] = React.useState<boolean>(false);
  const [sort, setSort] = React.useState<keyof Person | null>(null);
  const [sortDirection, setSortDirection] = React.useState<
    "asc" | "desc" | null | undefined
  >(null);
  const [items, setItems] = React.useState<Person[]>([]);
  const [count, setCount] = React.useState<number>(0);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

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
            setSearch,
            role,
            setRole,
            employeeType,
            setEmployeeType,
          }}
        />

        <Table
          items={items}
          loading={loading}
          rowCount={count}
          pageSize={pageSize}
          rowSelectionModel={rowSelectionModel}
          setRowSelectionModel={setRowSelectionModel}
          setOffset={setOffset}
          setPageSize={setPageSize}
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
