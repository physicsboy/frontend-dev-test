import { faker } from "@faker-js/faker";
import { EmployeeType, Person, PersonRole } from "./types";
import { ANY } from "./constants";
import sortBy from "lodash/sortBy";

const STORAGE_KEY = "AutomatedCreativeTestAPI";

function initApi() {
  if (localStorage.getItem(STORAGE_KEY) === null) {
    let items: Person[] = [];
    for (let i = 0; i < 1000; i++) {
      const role = Math.random() < 0.5 ? "STUDENT" : "EMPLOYEE";
      const employeeType =
        role === "STUDENT"
          ? null
          : Math.random() < 0.5
          ? "FULL_TIME"
          : "PART_TIME";
      items.push({
        id: i + 1,
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        role,
        employeeType,
      });
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }
}

export function queryApi(
  search: string,
  role: PersonRole,
  employeeType: EmployeeType,
  offset: number,
  pageSize: number,
  sort: keyof Person | null,
  sortDirection: "asc" | "desc" | null | undefined
) {
  initApi();

  let items: Person[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

  if (search) {
    items = items.filter(
      ({ firstName, lastName }) =>
        firstName.toLowerCase().includes(search.toLowerCase()) ||
        lastName.toLowerCase().includes(search.toLowerCase())
    );
  }
  if (role !== ANY) {
    items = items.filter(({ role: r }) => r === role);
  }
  if (employeeType !== ANY) {
    items = items.filter(({ employeeType: et }) => et === employeeType);
  }
  if (sort && sortDirection) {
    items = sortBy(items, (d) => d[sort]);
    if (sortDirection === "desc") {
      items.reverse();
    }
  }

  const count = items.length;
  items = items.slice(offset, offset + pageSize);

  return new Promise<{ items: Person[]; count: number }>((resolve) => {
    setTimeout(() => {
      resolve({
        items,
        count,
      });
    }, 500);
  });
}

export function mutateApi(id: number, newPerson: Person) {
  let items: Person[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  items = items.map((person) => (person.id === id ? newPerson : person));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  return Promise.resolve(newPerson);
}
