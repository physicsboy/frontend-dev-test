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
import Table from "./Table";
import { Filter } from "./Filter";
import {useUiContext} from "../context/UiContext";
import { useTableContext } from "../context/TableContext";
import { useFilterContext } from "../context/FilterContext";

function App() {
  const {showDrawer, errorMessage, setShowDrawer, setErrorMessage} = useUiContext();
  const {search, role, employeeType, handleSearchChange, handleRoleChange, handleEmployeeTypeChange} = useFilterContext();
  const {
    pageSize, rowSelectionModel, sort, sortDirection, offset,
    setItems, setLoading, setCount, setRowSelectionModel
  } = useTableContext();

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

        <Filter />

        <Table />

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
