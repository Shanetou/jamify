import Button from "@material-ui/core/Button";
import MuiDialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN } from "../../api/paths";
import { DIALOGS } from "../../constants";
import { hideErrorDialog } from "../../redux/actions/ui";
import { dialogSelector } from "../../selectors";

export const Dialog = _props => {
  const dispatch = useDispatch();
  const dialog = useSelector(dialogSelector);

  const showGenericDialog = dialog === DIALOGS.GENERIC_ERROR;
  const showAuthDialog = dialog === DIALOGS.AUTHENTICATION_ERROR;

  const handleClose = () => {
    dispatch(hideErrorDialog());
  };

  return (
    <>
      <GenericErrorDialog isOpen={showGenericDialog} close={handleClose} />
      <AuthenticationErrorDialog isOpen={showAuthDialog} close={handleClose} />
    </>
  );
};

export const AuthenticationErrorDialog = props => {
  const { close, isOpen } = props;
  function handleClick() {
    close();
    window.location = LOGIN;
  }

  return (
    <MuiDialog open={isOpen} disableBackdropClick>
      <DialogTitle>Session has expired</DialogTitle>
      <DialogContent>
        <DialogContentText>Please refresh your session now.</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClick} color="primary" autoFocus>
          Refresh Session
        </Button>
      </DialogActions>
    </MuiDialog>
  );
};
export const GenericErrorDialog = props => {
  const { close, isOpen } = props;

  function handleClick() {
    close();
    window.location.reload();
  }

  return (
    <MuiDialog open={isOpen}>
      <DialogTitle>Oops, something bad happened</DialogTitle>
      <DialogContent>
        <DialogContentText>Please refresh the page now.</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClick} color="primary" autoFocus>
          Refresh page
        </Button>
      </DialogActions>
    </MuiDialog>
  );
};
