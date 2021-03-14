import { useState, useReducer, useEffect } from "react";
import { TypographyPage, Home } from "./views";
import { Route, Switch } from "react-router";
import { StylesProvider } from "@material-ui/styles";
import { AppContext } from "./views/components/AppContext";
import { reducer, UserStory } from "./components/cards";
import { Typography } from "@material-ui/core";
import { UserStoryFields } from "./components/cards";
import Axios from "axios";

function App() {
  const [UserStories, setUserStories] = useState<UserStoryFields>();

  // useEffect(() => {
  //   Axios.get("https://localhost:5001/UserStory").then((result) => {
  //     setUserStories(result.data);
  //   });
  // });

  const [state, dispatcher] = useReducer(reducer, UserStories);

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
              key={story.id}
              path={`/story/${story.id}`}
              component={() => (
                <UserStory mode="detail" userStoryId={story.id} />
              )}
            />
          ))}
        </Switch>
      </AppContext.Provider>
    </StylesProvider>
  );
}

export default App;
