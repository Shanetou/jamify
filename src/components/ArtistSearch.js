import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';

import { searchArtist } from '../redux/actions';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    width: 400
  }
}));

const ArtistSearch = props => {
  const classes = useStyles();
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch();

  const handleChange = event => {
    const {
      target: { value }
    } = event;
    event.preventDefault();

    setSearchText(value);

    if (value !== '') {
      dispatch(searchArtist(value));
    }
  };

  return (
    <TextField
      id="artist-search"
      label="Search by Artist"
      margin="normal"
      className={classes.textField}
      value={searchText}
      onChange={handleChange}
      autoComplete="off"
    />
  );
};

const mapDispatchToProps = {
  searchArtist
};

export default ArtistSearch;
