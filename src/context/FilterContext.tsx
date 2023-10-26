import React, {createContext, ReactNode} from "react";
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

export const useFilterContext = () => React.useContext(FilterContext);

export const FilterProvider = ({children}: {children: ReactNode}): JSX.Element => {
    const {updateSearchParams, searchParams} = useSearchParams();

    const [search, setSearch] = React.useState<string>(searchParams.get('search') || '');
    const [role, setRole] = React.useState<PersonRole>(searchParams.get('role') as PersonRole || "ANY");
    const [employeeType, setEmployeeType] = React.useState<EmployeeType>(searchParams.get('employeeType') as EmployeeType ||"ANY");

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

    return (
        <FilterContext.Provider value={{search, role, employeeType, handleSearchChange, handleRoleChange, handleEmployeeTypeChange}}>
            {children}
        </FilterContext.Provider>
    );
}
