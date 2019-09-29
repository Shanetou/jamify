import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import { TOASTS } from "../../constants";
import { toastSelector } from "../../selectors";
import { hideToast } from "../../redux/actions";

const SnackbarBasic = props => {
  const { close, isOpen, children } = props;
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={isOpen}
      onClose={close}
      ContentProps={{
        "aria-describedby": "message-id"
      }}
      autoHideDuration={4000}
      message={children}
    />
  );
};

const MaxSeedsSelectedToast = props => {
  return (
    <SnackbarBasic {...props}>
      <span>Select at total of 5 artists or genres.</span>
    </SnackbarBasic>
  );
};

const InsufficientSeedsSelectedToast = props => {
  return (
    <SnackbarBasic {...props}>
      <span>Select at least one track.</span>
    </SnackbarBasic>
  );
};

export const Toast = props => {
  const toast = useSelector(toastSelector);
  const dispatch = useDispatch();
  const showMaxSeedsSelected = toast === TOASTS.MAX_SEEDS_SELECTED;
  const showInsufficientSeedsSelected =
    toast === TOASTS.INSUFFICIENT_SEEDS_SELECTED;

  const handleClose = () => {
    dispatch(hideToast());
  };

  return (
    <>
      <MaxSeedsSelectedToast
        isOpen={showMaxSeedsSelected}
        close={handleClose}
      />
      {/* // Consider getting rid of this toast entirely; disable button */}
      <InsufficientSeedsSelectedToast
        isOpen={showInsufficientSeedsSelected}
        close={handleClose}
      />
    </>
  );
};
