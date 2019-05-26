import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';

import { searchArtist } from '../redux/actions';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    width: 400
  }
});

const ArtistSearch = props => {
  const { classes, searchArtist } = props;
  console.log('searchArtist:', searchArtist);
  const [searchText, setSearchText] = useState('');

  const handleChange = event => {
    console.log('handleChange:', event);
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

const ArtistSearchConnected = connect(
  null,
  mapDispatchToProps
)(ArtistSearch);

export default withStyles(styles)(ArtistSearchConnected);
