import React from "react";
import { TypographyPage } from "./views/Typography";
import { Route, Switch } from "react-router";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/typography" component={() => <TypographyPage />} />
      </Switch>
    </div>
  );
}

export default App;
