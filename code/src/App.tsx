import React from "react";
import { TypographyPage, Home } from "./views";
import { Route, Switch } from "react-router";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={() => <Home />} />
        <Route path="/typography" component={() => <TypographyPage />} />
      </Switch>
    </div>
  );
}

export default App;
