import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    width: 400,
  },
});

const ArtistSearch = props => {
  const { classes } = props;
  const [searchText, setSearchText] = useState('');

  const handleChange = event => {
    setSearchText(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    console.log('Submitted: ', searchText);
    setSearchText('');
  };

  return (
    <form
      noValidate
      autoComplete='off'
      onSubmit={handleSubmit}
      className={classes.container}
    >
      <TextField
        id='artist-search'
        label='Search by Artist'
        margin='normal'
        className={classes.textField}
        value={searchText}
        onChange={handleChange}
      />
    </form>
  );
};

export default withStyles(styles)(ArtistSearch);
