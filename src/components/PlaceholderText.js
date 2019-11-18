import React from "react";

import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";

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
