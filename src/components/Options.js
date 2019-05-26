import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/styles';

import Chip from './Chip';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
}));

const Options = props => {
  const { artistsOptions } = props;
  const classes = useStyles();

  const handleDelete = () => {
    alert('You clicked the delete icon.');
  };

  return (
    <Grid item xs={12}>
      <Paper className={classes.paper} sm={6}>
        <div>
          {artistsOptions.map(artist => {
            console.log('artist.name:', artist.name);
            return (
              <Chip
                key={artist.id}
                label={artist.name}
                handleDelete={handleDelete}
              />
            );
          })}
        </div>
      </Paper>
    </Grid>
  );
};

const mapStateToProps = state => {
  const { artists } = state;
  return {
    artistsOptions: artists.searchResults
  };
};

const OptionsConnected = connect(mapStateToProps)(Options);

export default OptionsConnected;
