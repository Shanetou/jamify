import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { LOGIN } from "../api/paths";
import spotifyLogo from "../assets/Spotify_Icon_RGB_Green.png";

const useStyles = makeStyles(theme => ({
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center"
  },
  buttonImage: {
    height: theme.spacing(4),
    marginRight: theme.spacing(2)
  },
  lead: {
    fontSize: "80px",
    marginBottom: theme.spacing(1)
  },
  root: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  typographySpacing: {
    marginBottom: theme.spacing(6)
  }
}));

export const Login = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Typography className={`${classes.lead}`}>
          Tap dance in galoshes.
        </Typography>
        <Typography className={`${classes.typographySpacing}`}>
          Use Spotify recommendations to create your perfect playlist.
        </Typography>
        <Button
          size="large"
          variant="outlined"
          onClick={() => {
            window.location = LOGIN;
          }}
        >
          <img
            alt="spotify logo"
            src={spotifyLogo}
            className={classes.buttonImage}
          />
          connect with spotify
        </Button>
      </div>
    </div>
  );
};
