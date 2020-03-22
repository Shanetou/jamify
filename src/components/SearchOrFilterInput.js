import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import ClearIcon from "@material-ui/icons/Clear";
import { makeStyles } from "@material-ui/styles";
import React from "react";

const useStyles = makeStyles(_theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    width: "100%",
    margin: 0
  }
}));

export const SearchOrFilterInput = props => {
  const { label, onChange, searchText, setSearchText } = props;
  const classes = useStyles();

  const updateSearchValue = value => {
    setSearchText(value);
    onChange(value);
  };

  const handleChange = event => {
    const {
      target: { value }
    } = event;
    event.preventDefault();

    updateSearchValue(value);
  };

  return (
    <TextField
      label={label}
      margin="normal"
      className={classes.textField}
      value={searchText}
      onChange={handleChange}
      autoComplete="off"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              size="small"
              aria-label="clear text"
              disabled={searchText === ""}
              onClick={() => updateSearchValue("")}
            >
              <ClearIcon />
            </IconButton>
          </InputAdornment>
        )
      }}
    />
  );
};
