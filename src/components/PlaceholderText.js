import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import React from "react";

const useStyles = makeStyles(_theme => ({
  container: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    height: "100%",
    width: "100%"
  }
}));

export const PlaceholderText = props => {
  const { children } = props;
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography variant="caption">{children}</Typography>
    </div>
  );
};
