import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";

import { filterGenres } from "../redux/actions";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    width: 400,
    margin: 0
  }
}));

export const GenreFilter = props => {
  const classes = useStyles();
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();

  const handleChange = event => {
    const {
      target: { value }
    } = event;
    event.preventDefault();

    setSearchText(value);

    dispatch(filterGenres(value));
  };

  return (
    <TextField
      id="genres-filter"
      label="Filter Genres"
      margin="normal"
      className={classes.textField}
      value={searchText}
      onChange={handleChange}
      autoComplete="off"
    />
  );
};
