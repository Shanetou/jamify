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
    width: 400
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

// import React from 'react';
// import { connect } from 'react-redux';
// import Select from 'react-select';
// import { capitalize } from '../utils';
// import { selectGenre } from '../redux/actions';

// const buildSelectOptions = genres => {
//   return genres.map(genre => {
//     return {
//       value: genre,
//       label: capitalize(genre)
//     };
//   });
// };

// const GenreSearch = props => {
//   const { options, selectedOptions, selectGenre } = props;

//   const handleChange = selectState => {
//     selectGenre(selectState);
//   };

//   return (
//     <Select
//       isMulti
//       value={selectedOptions}
//       onChange={handleChange}
//       options={options}
//     />
//   );
// };

// const mapStateToProps = state => {
//   return {
//     options: buildSelectOptions(state.genres.recommendationGenres),
//     selectedOptions: state.genres.selected
//   };
// };

// const mapDispatchToProps = {
//   selectGenre
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(GenreSearch);
