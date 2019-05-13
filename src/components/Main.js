import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

import ArtistSearch from './ArtistSearch';
import GenreSearch from './GenreSearch';
import Results from './Results';
import Attributes from './Attributes';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
});

const Main = props => {
  const { classes } = props;
  return (
    <>
      <Grid container spacing={24}>
        <Grid item xs={6}>
          <ArtistSearch />
        </Grid>
        <Grid item xs={6}>
          <GenreSearch />
        </Grid>
      </Grid>

      <div className={classes.root}>
        <Grid
          container
          // className={classes.demo}
          // justify='center'
          spacing={24}
        >
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

export default withStyles(styles)(Main);
