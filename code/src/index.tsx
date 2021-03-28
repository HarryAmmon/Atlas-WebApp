import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "@material-ui/core";
import { CustomTheme } from "./components/theming";

ReactDOM.render(
  <ThemeProvider theme={CustomTheme}>
    <Router>
      <App />
    </Router>
  </ThemeProvider>,
  document.getElementById("root")
);
