import React from "react";
import { TypographyPage, Home } from "./views";
import { Route, Switch } from "react-router";
import { StylesProvider } from "@material-ui/styles";
import { Box, Typography } from "@material-ui/core";
import styles from "./App.module.scss";

function App() {
  return (
    <StylesProvider injectFirst>
      <Box className={styles.appTitle}>
        <Typography component="h1" variant="h5">
          Atlax
        </Typography>
      </Box>
      <Switch>
        <Route exact path="/" component={() => <Home />} />
        <Route path="/typography" component={() => <TypographyPage />} />
      </Switch>
    </StylesProvider>
  );
}

export default App;
