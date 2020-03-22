import React from "react";
import { useSelector } from "react-redux";
import { accessTokenSelector } from "../selectors";
import { Login } from "./Login";
import Main from "./Main";
import { Dialog } from "./ui/Dialog";
import { Toast } from "./ui/Toast";

const App = _props => {
  const accessToken = useSelector(accessTokenSelector);

  return (
    <>
      <Dialog />
      <Toast />

      <main>{!accessToken ? <Login /> : <Main />}</main>
    </>
  );
};

export default App;
