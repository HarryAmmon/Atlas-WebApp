import { useReducer, useEffect } from "react";
import { TypographyPage, Home } from "./views";
import { Route, Switch } from "react-router";
import { StylesProvider } from "@material-ui/styles";
import { AppContext } from "./views/components/AppContext";
import { reducer } from "./components/cards";
import { Typography } from "@material-ui/core";
import { UserStoryFields } from "./components/cards";
import axios from "axios";
import {
  KanBanColumnFields,
  ColumnGroupFields,
  KanBanColumnReducer,
} from "./components/columns";
import { ColumnGroupReducer } from "./components/columns/services/columnGroupReducer";

function App() {
  let UserStories: UserStoryFields[] = [];
  let Columns: KanBanColumnFields[] = [];
  let ColumnGroups: ColumnGroupFields[] = [];

  const [userStoryState, userStoryDispatcher] = useReducer(
    reducer,
    UserStories
  );
  const [columnsState, columnsDispatcher] = useReducer(
    KanBanColumnReducer,
    Columns
  );
  const [columnGroupsState, columnGroupsDispatcher] = useReducer(
    ColumnGroupReducer,
    ColumnGroups
  );

  useEffect(() => {
    axios.get("/UserStory").then((result) => {
      userStoryDispatcher({
        type: "ADD_EXISTING_USER_STORIES",
        UserStories: result.data,
      });
    });

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
          UserStories: userStoryState,
          UserStoriesDispatcher: userStoryDispatcher,
          ColumnGroups: columnGroupsState,
          ColumnGroupsDispatcher: columnGroupsDispatcher,
          Columns: columnsState,
          ColumnsDispatcher: columnsDispatcher,
        }}
      >
        <Typography variant="h1">Atlas</Typography>
        <Switch>
          <Route exact path="/" component={() => <Home />} />
          <Route path="/typography" component={() => <TypographyPage />} />
          {/* {userStoryState.map((story: UserStoryFields) => (
            <Route
              key={story.userStoryId}
              path={`/story/${story.userStoryId}`}
              component={() => (
                <UserStory mode="detail" userStoryId={story.userStoryId} />
              )}
            />
          ))} */}
        </Switch>
      </AppContext.Provider>
    </StylesProvider>
  );
}

export default App;
