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
        stories: [{ userStoryId: "1" }, { userStoryId: "222" }],
      },
      {
        columnId: "2",
        columnTitle: "Done",
        groupId: "1",
        stories: [{ userStoryId: "11123" }, { userStoryId: "3313" }],
      },
      {
        columnId: "3",
        columnTitle: "Doing",
        groupId: "2",
        stories: [{ userStoryId: "9687" }],
      },
      {
        columnId: "4",
        columnTitle: "Done",
        groupId: "2",
        stories: [],
      },
    ],
    columnGroups: [
      {
        groupId: "1",
        groupTitle: "Column Group 1",
      },
      { groupId: "2", groupTitle: "Column Group 2" },
    ],
  };

  let UserStories: UserStoryFields[] = [];
  let Columns: ColumnFields[] = [];
  const [userStoryState, userStoryDispatcher] = useReducer(
    reducer,
    UserStories
  );
  const [columnsState, columnsDispatcher] = useReducer(ColumnReducer, Columns);

  useEffect(() => {
    axios.get("https://localhost:5001/UserStory").then((result) => {
      console.log(result.data, "result from API");
      userStoryDispatcher({
        type: "ADD_EXISTING_USER_STORIES",
        UserStories: result.data,
      });
    });
    columnsDispatcher({
      type: "ADD_EXISTING_COLUMNS",
      Columns: boardData.columns,
    });
  }, []);

  return (
    <StylesProvider injectFirst>
      <AppContext.Provider
        value={{
          UserStories: userStoryState,
          UserStoriesDispatcher: userStoryDispatcher,
          ColumnGroups: boardData.columnGroups,
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
