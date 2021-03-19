import { useReducer, useEffect } from "react";
import { TypographyPage, Home } from "./views";
import { Route, Switch } from "react-router";
import { StylesProvider } from "@material-ui/styles";
import { AppContext } from "./views/components/AppContext";
import { reducer, UserStory } from "./components/cards";
import { Typography } from "@material-ui/core";
import { UserStoryFields } from "./components/cards";
import axios from "axios";

function App() {
  let UserStories: UserStoryFields[] = [];
  const [state, dispatcher] = useReducer(reducer, UserStories);

  useEffect(() => {
    axios.get("https://localhost:5001/UserStory").then((result) => {
      dispatcher({
        type: "ADD_EXISTING_USER_STORIES",
        UserStories: result.data,
      });
    });
  }, []);

  return (
    <StylesProvider injectFirst>
      <AppContext.Provider
        value={{ UserStories: state, UserStoriesDispatcher: dispatcher }}
      >
        <Typography variant="h1">Atlas</Typography>
        <Switch>
          <Route exact path="/" component={() => <Home />} />
          <Route path="/typography" component={() => <TypographyPage />} />
          {state.map((story: UserStoryFields) => (
            <Route
              key={story.storyId}
              path={`/story/${story.storyId}`}
              component={() => (
                <UserStory mode="detail" userStoryId={story.storyId} />
              )}
            />
          ))}
        </Switch>
      </AppContext.Provider>
    </StylesProvider>
  );
}

export default App;
