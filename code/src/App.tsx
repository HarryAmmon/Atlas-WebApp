import { useReducer, useEffect } from "react";
import { TypographyPage, Home } from "./views";
import { Route, Switch } from "react-router";
import { StylesProvider } from "@material-ui/styles";
import { AppContext } from "./views/components/AppContext";
import { reducer, UserStory } from "./components/cards";
import { Typography } from "@material-ui/core";
import { UserStoryFields } from "./components/cards";
import axios from "axios";
import {
  ColumnFields,
  ColumnGroupFields,
  ColumnReducer,
} from "./components/columns";
import { ColumnGroupReducer } from "./components/columns/services/columnGroupReducer";

function App() {
  interface boardDataFields {
    title: string;
    columns: ColumnFields[];
    columnGroups: ColumnGroupFields[];
  }

  const boardData: boardDataFields = {
    title: "MyFirstBoard",
    columns: [
      {
        columnId: "1",
        columnTitle: "Doing",
        groupId: "1",
        stories: [
          { userStoryId: "6101" },
          { userStoryId: "3666" },
          { userStoryId: "12566" },
        ],
      },
      {
        columnId: "2",
        columnTitle: "Done",
        groupId: "1",
        stories: [{ userStoryId: "16132" }, { userStoryId: "14109" }],
      },
      {
        columnId: "3",
        columnTitle: "Doing",
        groupId: "asdasd",
        stories: [{ userStoryId: "19812" }],
      },
      {
        columnId: "4",
        columnTitle: "Done",
        groupId: "asdasd",
        stories: [],
      },
    ],
    columnGroups: [
      {
        groupId: "1",
        groupTitle: "Column Group 1",
        exitCriteria: "This is a long list of exit criteria",
        limits: 1,
      },
      {
        groupId: "2",
        groupTitle: "Column Group 2",
        exitCriteria: "This is a long list of exit criteria",
        limits: 1,
      },
    ],
  };

  let UserStories: UserStoryFields[] = [];
  let Columns: ColumnFields[] = boardData.columns;
  let ColumnGroups: ColumnGroupFields[] = [];
  const [userStoryState, userStoryDispatcher] = useReducer(
    reducer,
    UserStories
  );
  const [columnsState, columnsDispatcher] = useReducer(ColumnReducer, Columns);
  const [columnGroupsState, columnGroupsDispatcher] = useReducer(
    ColumnGroupReducer,
    ColumnGroups
  );

  useEffect(() => {
    axios
      .get("https://ci601-api.azurewebsites.net/UserStory")
      .then((result) => {
        userStoryDispatcher({
          type: "ADD_EXISTING_USER_STORIES",
          UserStories: result.data,
        });
      });

    axios
      .get("https://ci601-api.azurewebsites.net/ColumnGroup")
      .then((result) => {
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
          {userStoryState.map((story: UserStoryFields) => (
            <Route
              key={story.userStoryId}
              path={`/story/${story.userStoryId}`}
              component={() => (
                <UserStory mode="detail" userStoryId={story.userStoryId} />
              )}
            />
          ))}
        </Switch>
      </AppContext.Provider>
    </StylesProvider>
  );
}

export default App;
