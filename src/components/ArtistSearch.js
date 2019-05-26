import React, { useState } from 'react';
import { connect } from 'react-redux';

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
  const { searchArtist } = props;
  const classes = useStyles();
  const [searchText, setSearchText] = useState('');

  const handleChange = event => {
    setSearchText(event.target.value);
    searchArtist(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    setSearchText('');
  };

  return (
    <form
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
      className={classes.container}
    >
      <TextField
        id="artist-search"
        label="Search by Artist"
        margin="normal"
        className={classes.textField}
        value={searchText}
        onChange={handleChange}
      />
    </form>
  );
};

const mapDispatchToProps = {
  searchArtist
};

export default connect(
  null,
  mapDispatchToProps
)(ArtistSearch);
