import React, {createContext, ReactNode, useCallback} from "react";
import {Person} from "../types";
import {GridRowSelectionModel} from "@mui/x-data-grid";
import useSearchParams from "../hooks/useSearchParams";

type ContextType = {
  items: Person[];
  loading: boolean;
  count: number;
  pageSize: number;
  rowSelectionModel: GridRowSelectionModel;
  sort: keyof Person | null;
  sortDirection: "asc" | "desc" | null | undefined;
  offset: number;
  setItems: (items: Person[]) => void;
  setLoading: (loading: boolean) => void;
  setCount: (count: number) => void;
  setPageSize: (size: number) => void;
  setRowSelectionModel: React.Dispatch<
    React.SetStateAction<GridRowSelectionModel>
  >;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
  handleSortChange: (sort: keyof Person | null) => void;
  handleSortDirectionChange: (
    sortDirection: "asc" | "desc" | null | undefined
  ) => void;
}

const initialContext: ContextType = {
  items: [],
  loading: true,
  count: 0,
  pageSize: 10,
  rowSelectionModel: [],
  sort: null,
  sortDirection: null,
  offset: 0,
  setItems: () => {},
  setLoading: () => {},
  setCount: () => {},
  setPageSize: () => {},
  setRowSelectionModel: () => {},
  setOffset: () => {},
  handleSortChange: () => {},
  handleSortDirectionChange: () => {}
};

const TableContext = createContext(initialContext);

// Could be moved to hooks directory
export const useTableContext = () => React.useContext(TableContext);

export const TableProvider = ({ children }: {children: ReactNode}): JSX.Element => {
  const {updateSearchParams, searchParams} = useSearchParams();

  const [items, setItems] = React.useState<Person[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [count, setCount] = React.useState<number>(0);
  const [pageSize, setPageSize] = React.useState<number>(10);
  const [rowSelectionModel, setRowSelectionModel] = React.useState<GridRowSelectionModel>([]);
  const [sort, setSort] = React.useState<keyof Person | null>(searchParams.get('sort') as keyof Person || null);
  const [sortDirection, setSortDirection] = React.useState<
    "asc" | "desc" | null | undefined
  >(searchParams.get('searchDirection') as "asc" | "desc" | null | undefined || null);
  const [offset, setOffset] = React.useState<number>(0);

  const handleSortChange = useCallback((sort: keyof Person | null): void => {
    setSort(sort);
    updateSearchParams({sort: sort as keyof Person});
  }, [updateSearchParams])

  const handleSortDirectionChange = useCallback((sortDirection: "asc" | "desc" | null | undefined): void => {
    setSortDirection(sortDirection);
    updateSearchParams({sortDirection: sortDirection as string});
  }, [updateSearchParams])

  return <TableContext.Provider value={{
    items, loading, count, pageSize, rowSelectionModel, sort, sortDirection, offset,
    setItems, setLoading, setCount, setPageSize, setRowSelectionModel, setOffset,
    handleSortChange, handleSortDirectionChange
  }}>
    {children}
  </TableContext.Provider>;
}
