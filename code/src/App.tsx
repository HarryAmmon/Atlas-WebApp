import { useReducer } from "react";
import { TypographyPage, Home } from "./views";
import { Route, Switch } from "react-router";
import { StylesProvider } from "@material-ui/styles";
import { AppContext } from "./views/components/AppContext";
import { reducer, UserStory } from "./components/cards";
import { Typography } from "@material-ui/core";

function App() {
  const UserStories = [
    {
      id: "2",
      title: "Add a description Card",
      description: "My description",
      acceptanceCriteria: "some acceptance criteria",
      storyPoints: "3",
    },
    {
      id: "22",
      title: "Use react final form",
      description: "My description",
      acceptanceCriteria: "fields validate and post on blur",
      storyPoints: "5",
    },
  ];

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
          {state.map((story) => (
            <Route
              key={story.id}
              path={`/story/${story.id}`}
              component={() => (
                <UserStory Mode="detail" UserStoryId={story.id} />
              )}
            />
          ))}
        </Switch>
      </AppContext.Provider>
    </StylesProvider>
  );
}

export default App;
