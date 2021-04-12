import { useReducer, useEffect } from "react";
import { TypographyPage, Home } from "./views";
import { Route, Switch } from "react-router";
import { StylesProvider } from "@material-ui/styles";
import { AppContext } from "./views/components/AppContext";
import { Typography } from "@material-ui/core";
import axios from "axios";
import {
  KanBanColumnFields,
  ColumnGroupFields,
  KanBanColumnReducer,
} from "./components/columns";
import { ColumnGroupReducer } from "./components/columns/services/columnGroupReducer";

function App() {
  let Columns: KanBanColumnFields[] = [];
  let ColumnGroups: ColumnGroupFields[] = [];

  const [columnsState, columnsDispatcher] = useReducer(
    KanBanColumnReducer,
    Columns
  );
  const [columnGroupsState, columnGroupsDispatcher] = useReducer(
    ColumnGroupReducer,
    ColumnGroups
  );

  useEffect(() => {
    axios.get("/KanBanColumn").then((result) => {
      columnsDispatcher({ type: "ADD_EXISTING_COLUMNS", Columns: result.data });
    });

    axios.get("/ColumnGroup").then((result) => {
      columnGroupsDispatcher({
        type: "ADD_COLUMN_GROUPS",
        ColumnGroups: result.data,
      });
    });
  }, []);

  return (
    <StylesProvider injectFirst>
      <AppContext.Provider
        value={{
          ColumnGroups: columnGroupsState,
          ColumnGroupsDispatcher: columnGroupsDispatcher,
          Columns: columnsState,
          ColumnsDispatcher: columnsDispatcher,
        }}
      >
        <Typography component="h1" variant="h5">
          Atlas
        </Typography>
        <Switch>
          <Route exact path="/" component={() => <Home />} />
          <Route path="/typography" component={() => <TypographyPage />} />
        </Switch>
      </AppContext.Provider>
    </StylesProvider>
  );
}

export default App;
