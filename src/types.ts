export interface Person {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: PersonRole;
  employeeType: EmployeeType | null;
}

export type PersonRole = "STUDENT" | "EMPLOYEE" | "ANY";
export type EmployeeType = "FULL_TIME" | "PART_TIME" | "ANY";