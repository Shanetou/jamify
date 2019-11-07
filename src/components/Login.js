import React from "react";
import Button from "@material-ui/core/Button";

import { makeStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import spotifyLogo from "../assets/Spotify_Icon_RGB_Green.png";

const useStyles = makeStyles(theme => {
  console.log("theme", theme);
  return {
    root: {
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    typographySpacing: {
      marginBottom: theme.spacing(5)
    },
    lead: {
      fontSize: "80px"
    },
    buttonContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    buttonImage: {
      height: theme.spacing(4),
      marginRight: theme.spacing(2)
    }
  };
});

export const Login = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.buttonContainer}>
        <Typography className={`${classes.lead}`}>Jam your Jams.</Typography>
        <Typography className={`${classes.typographySpacing}`}>
          Leverage Spotify recommendations to make your perfect playlist.
        </Typography>
        <Button
          size="large"
          variant="outlined"
          onClick={() => (window.location = "http://localhost:8888/login")}
        >
          <img src={spotifyLogo} className={classes.buttonImage} />
          connect with spotify
        </Button>
      </div>
    </div>
  );
};
