import React from "react";
import { TypographyPage, Home } from "./views";
import { Route, Switch } from "react-router";
import { StylesProvider } from "@material-ui/styles";

function App() {
  return (
    <StylesProvider injectFirst>
      <Switch>
        <Route exact path="/" component={() => <Home />} />
        <Route path="/typography" component={() => <TypographyPage />} />
      </Switch>
    </StylesProvider>
  );
}

export default App;
