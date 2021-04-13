import { useEffect } from "react";
import { TypographyPage, Home } from "./views";
import { Route, Switch } from "react-router";
import { StylesProvider } from "@material-ui/styles";
import { Typography } from "@material-ui/core";

function App() {
  useEffect(() => {
    console.log("app has rendered");
  });

  return (
    <StylesProvider injectFirst>
      <Typography component="h1" variant="h5">
        Atlas
      </Typography>
      <Switch>
        <Route exact path="/" component={() => <Home />} />
        <Route path="/typography" component={() => <TypographyPage />} />
      </Switch>
    </StylesProvider>
  );
}

export default App;
