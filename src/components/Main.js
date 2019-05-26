import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/styles';

import ArtistSearch from './ArtistSearch';
import GenreSearch from './GenreSearch';
import Results from './Results';
import Options from './Options';
import Attributes from './Attributes';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  control: {
    padding: theme.spacing(2)
  }
}));

const Main = props => {
  const classes = useStyles();

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={6}>
          <ArtistSearch />
        </Grid>
        <Grid item xs={6}>
          <GenreSearch />
        </Grid>
      </Grid>

      <div className={classes.root}>
        <Grid container spacing={6}>
          <Options />
          <Grid item xs={8}>
            <Paper className={classes.paper} sm={6}>
              <Results />
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper} sm={6}>
              <Attributes />
            </Paper>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Main;
