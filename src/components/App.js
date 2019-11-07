import React from "react";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/styles";

import { Login } from "./Login";
import { Dialog } from "./ui/Dialog";
import { Toast } from "./ui/Toast";
import Main from "./Main";

import { accessTokenSelector } from "selectors";

const useStyles = makeStyles(theme => {
  return {
    root: {
      flexGrow: 1
    },
    container: {
      padding: theme.spacing(4)
    }
  };
});

const App = props => {
  const { accessToken } = props;

  const classes = useStyles();

  return (
    <>
      <Dialog />
      <Toast />

      <main>{!accessToken ? <Login /> : <Main />}</main>
    </>
  );
};

const mapStateToProps = (state, props) => {
  return {
    accessToken: accessTokenSelector(state)
  };
};

export default connect(mapStateToProps)(App);
