import React from "react";
import { connect } from "react-redux";

import { Login } from "./Login";
import { Dialog } from "./ui/Dialog";
import { Toast } from "./ui/Toast";
import Main from "./Main";

import { accessTokenSelector } from "selectors";

const App = props => {
  const { accessToken } = props;

  return (
    <>
      <Dialog />
      <Toast />

      <main>{!accessToken ? <Login /> : <Main />}</main>
    </>
  );
};

const mapStateToProps = (state, _props) => {
  return {
    accessToken: accessTokenSelector(state)
  };
};

export default connect(mapStateToProps)(App);
