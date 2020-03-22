import { amber, green } from "@material-ui/core/colors";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import WarningIcon from "@material-ui/icons/Warning";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { TOASTS } from "../../constants";
import { hideToast } from "../../redux/actions";
import { toastSelector } from "../../selectors";

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};

const useStyles = makeStyles(theme => ({
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  info: {
    backgroundColor: theme.palette.primary.main
  },
  warning: {
    backgroundColor: amber[700]
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  message: {
    display: "flex",
    alignItems: "center"
  }
}));

const MaxSeedsSelected = _props => (
  <ToastContent
    variant="warning"
    message="Select at total of 5 artists or genres."
  />
);

const PlaylistCreated = _props => (
  <ToastContent variant="success" message="Playlist saved to Spotify!" />
);

export const ToastContent = props => {
  const { message, variant } = props;
  const classes = useStyles();
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={classes[variant]}
      message={
        <span className={classes.message}>
          <Icon className={`${classes.icon} ${classes.iconVariant}`} />
          {message}
        </span>
      }
    />
  );
};

export const Toast = _props => {
  const toast = useSelector(toastSelector);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(hideToast());
  };

  const renderContent = () => {
    switch (toast) {
      case TOASTS.MAX_SEEDS_SELECTED:
        return <MaxSeedsSelected />;
      case TOASTS.PLAYLIST_CREATED:
        return <PlaylistCreated />;
      default:
        throw new Error("Unrecognized toast type");
    }
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={toast !== null}
      onClose={handleClose}
      ContentProps={{
        "aria-describedby": "message-id"
      }}
      autoHideDuration={4000}
    >
      {toast && renderContent()}
    </Snackbar>
  );
};
