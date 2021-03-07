import { useState } from "react";
import { TypographyPage, Home } from "./views";
import { Route, Switch } from "react-router";
import { StylesProvider } from "@material-ui/styles";
import { AppContext } from "./views/components/AppContext";
import { UserStoryFields } from "./components/cards/UserStory/types";
import { UserStory } from "./components/cards";
import { Typography } from "@material-ui/core";

function App() {
  const [UserStories, SetUserStories] = useState<UserStoryFields[]>([
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
  ]);
  return (
    <StylesProvider injectFirst>
      <AppContext.Provider value={{ UserStories, SetUserStories }}>
        <Typography variant="h1">Atlas</Typography>
        <Switch>
          <Route exact path="/" component={() => <Home />} />
          <Route path="/typography" component={() => <TypographyPage />} />
          {UserStories.map((story) => (
            <Route
              key={story.id}
              path={`/story/${story.id}`}
              component={() => (
                <UserStory
                  Mode="detail"
                  UserStory={{
                    id: story.id,
                    title: story.title,
                    description: story.description,
                    acceptanceCriteria: story.acceptanceCriteria,
                    storyPoints: story.storyPoints,
                  }}
                />
              )}
            />
          ))}
        </Switch>
      </AppContext.Provider>
    </StylesProvider>
  );
}

export default App;
