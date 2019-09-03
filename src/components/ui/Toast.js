import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import { TOASTS } from "../../constants";
import { toastSelector } from "../../selectors";
import { hideToast } from "../../redux/actions";

const MaxSeedsSelectedToast = props => {
  const { close, isOpen } = props;
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={isOpen}
      onClose={close}
      ContentProps={{
        "aria-describedby": "message-id"
      }}
      autoHideDuration={4000}
      message={
        <span id="message-id">Select at total of 5 artists or genres.</span>
      }
    />
  );
};

export const Toast = props => {
  const toast = useSelector(toastSelector);
  const dispatch = useDispatch();
  const showMaxSeedsSelected = toast === TOASTS.MAX_SEEDS_SELECTED;

  const handleClose = () => {
    dispatch(hideToast());
  };

  return (
    <MaxSeedsSelectedToast isOpen={showMaxSeedsSelected} close={handleClose} />
  );
};
