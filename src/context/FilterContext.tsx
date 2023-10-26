import React, {createContext, ReactNode, useCallback} from "react";
import {EmployeeType, PersonRole} from "../types";
import useSearchParams from "../hooks/useSearchParams";

type ContextType = {
    search: string;
    role: PersonRole;
    employeeType: EmployeeType;
    handleSearchChange: (search: string) => void,
    handleRoleChange: (role: PersonRole) => void,
    handleEmployeeTypeChange: (employeeType: EmployeeType) => void
}

const initialContext: ContextType = {
    search: '',
    role: 'ANY',
    employeeType: 'ANY',
    handleSearchChange: () => {},
    handleRoleChange: () => {},
    handleEmployeeTypeChange: () => {}
};

const FilterContext = createContext<ContextType>(initialContext);

// Could be moved to hooks directory
export const useFilterContext = () => React.useContext(FilterContext);

export const FilterProvider = ({children}: {children: ReactNode}): JSX.Element => {
    const {updateSearchParams, searchParams} = useSearchParams();

    const [search, setSearch] = React.useState<string>(searchParams.get('search') || '');
    const [role, setRole] = React.useState<PersonRole>(searchParams.get('role') as PersonRole || "ANY");
    const [employeeType, setEmployeeType] = React.useState<EmployeeType>(searchParams.get('employeeType') as EmployeeType ||"ANY");

    const handleSearchChange = useCallback((search: string): void => {
        setSearch(search);
        updateSearchParams({search});
    }, [updateSearchParams]);

    const handleRoleChange = useCallback((role: PersonRole): void => {
        setRole(role);
        role === 'STUDENT' && setEmployeeType('ANY');
        updateSearchParams({role});
    }, [updateSearchParams]);

    const handleEmployeeTypeChange = useCallback((employeeType: EmployeeType): void => {
        setEmployeeType(employeeType);
        updateSearchParams({employeeType});
    }, [updateSearchParams]);

    return (
        <FilterContext.Provider value={{search, role, employeeType, handleSearchChange, handleRoleChange, handleEmployeeTypeChange}}>
            {children}
        </FilterContext.Provider>
    );
}
