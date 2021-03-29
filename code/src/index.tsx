import axios from "axios";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "@material-ui/core";
import { CustomTheme } from "./components/theming";

axios.defaults.baseURL = "https://ci601-api.azurewebsites.net";

ReactDOM.render(
  <ThemeProvider theme={CustomTheme}>
    <Router>
      <App />
    </Router>
  </ThemeProvider>,
  document.getElementById("root")
);
