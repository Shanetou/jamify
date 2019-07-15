import React from "react";
import ReactDOM from "react-dom";

import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme } from "@material-ui/core/styles";

import { Provider } from "react-redux";
import store from "./store";

import App from "./components/App";

const rootElement = document.getElementById("root");

const theme = createMuiTheme({});

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </Provider>,
  rootElement
);
