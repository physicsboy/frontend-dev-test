# AC Frontend dev test

## Getting started

First off, fork this repo to your own Github account and then clone it locally. To install the test app:

```
npm install
```

And then run the test app:

```
npm start
```

And it should open a local web server at: http://localhost:3000/

The app is based on [Create-React-App](https://create-react-app.dev/) and should install error-free. 

## Task

[This single-page app](http://localhost:3000/) simulate a people management system for a fictional university - it queries an API endpoint for records about people. People are either Students or Employees. Employees can be further filtered as Full-Time or Part-Time - but Students do not get this property (it is null for them).

The API offers us the ability to search & filter through Person objects, as well as a simple pagination & sorting system. The Grid offers us the ability to select individual rows and "Download" them (this is just a mock button, for the purposes of the demo, nothing gets actually downloaded).

Libraries we are using include:

- MUI (Material UI) for the UI components: https://mui.com/material-ui/
- MUI Data Grid for the datagrid: https://mui.com/x/react-data-grid/

Key files include:

- `src/App/index.tsx` is the guts of the App, and has two key child components, `Filter` and `Table`.
- `src/api.ts` simulates a simple backend API that accesses randomly-generated records which are stored in LocalStorage.

There are a number of issues with the code:

1. You will hopefully notice we are over-using `useState` a lot, and mixing UI state and data state with filter state. There is also a lot of prop-drilling going on.

2. There is a bug in the filter form: first select Role as "Employee", then select Employee Type as "Full Time", then set Role back to "Student". The Employee Type is still set to "Full Time", even though this type cannot apply to Students. To make things worse, we cannot set it back as the element is disabled.

3. We are storing email addresses for people, but there is no email column currently in the Grid.

4. Sorting only sorts items within the loaded rows within the DataGrid, rather than using the API's sort functionality and sorting the entire dataset in the backend.

5. After changing search query or filters, at the moment the location bar address does not change. It would be much better from a user's point of view to be able to capture all the query variables (search, role, employeeType, offset, pageSize, sort, sortDirection) so that URLs can be bookmarked and shared. The URL does not need to record UI state such as which items are selected.

So the tasks are as follows:

1. Split grid state, UI state and filter state apart, and use a state management solution of your own choosing to manage them. Your goals should be (i) to have separate state representations for each, (ii) provide a clean and well-typed solution for getting and updating each state, and (iii) avoid having to drill props down to child components. Before picking on a solution, it's recommended you think about the other issues that need fixing and to make sure your solution is compatible with them.

2. Fix the bug so that, if Role is set to a value other than Employee in the filter, the filter's value for Employee Type is automatically reset back to ANY, to avoid the bug. Do not fix the bug in `api.ts` - consider it a backend bug/feature that has to be worked around.

3. Add a column for email address in the Grid. Documentation for how to write column definitions for MUI DataGrid can be found [here](https://mui.com/x/react-data-grid/column-definition/).

4. Add props to the DataGrid to connect it to server-side sorting, so that sorting is performed on the dataset by the API call, and is not just sorting the 10 results visible in the frontend. The documentation for the sorting API for MUI DataGrid component can be found [here](https://mui.com/x/react-data-grid/sorting/).

5. Add code to update the browser query string when a change in filter state is made, and that when the page loads, if filter info is present in the browser query string, the filter loads in this state correctly when it initializes.

Once complete, push all your changes to your forked repo and email us back a link to it.

### Bonus task

If you liked that and want to do more, then there's the following.

In `src/App/Table.tsx`, if you delete or comment out the prop `isCellEditable={() => false}`, you can now start editing cells in the grid. Once you update the cells in the grid, they will change temporarily, but hitting reload in the browser will not persist the value - they just get reloaded from the original values stored in LocalStorage.

The task is: Try adding server-side persistence so the stored API value gets updated and it persists after a refresh. To help, there is an additional exported function, `mutateApi`, in the file `src/api.ts`, that will update the value for you. The documentation in MUI DataGrid on editing and updating values can be found [here](https://mui.com/x/react-data-grid/editing/).

## Technical note

We simulate a persistent API by randomly generating a bunch of records and storing it in your browser's LocalStorage under the key `AutomatedCreativeTestAPI` on the very first load. The data is harmless, but if you want to get rid of it afterwards, then clear your local storage for localhost:3000 in dev tools, or by opening up the JS console and running:

```
localStorage.removeItem("AutomatedCreativeTestAPI");
```
