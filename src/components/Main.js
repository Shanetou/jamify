import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/styles";
import { useSelector } from "react-redux";

import { SearchOrFilter } from "./SearchOrFilter";
import { SearchResults } from "./SearchResults";
import { TrackResults } from "./TrackResults";
import { Selections } from "./Selections";
import { CategoryButtons } from "./CategoryButtons";
import { Attributes } from "./Attributes";
import { tracksSelector } from "selectors";

const useStyles = makeStyles(theme => ({
  control: {
    padding: theme.spacing(2)
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary
  },
  searchResultsPaper: {
    height: "147px"
  },
  root: {
    flexGrow: 1,
    padding: theme.spacing(4)
  }
}));

const Main = props => {
  const classes = useStyles();
  const { recommendedTracks } = useSelector(state => {
    return {
      recommendedTracks: Object.values(tracksSelector(state))
    };
  });

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <header>
            <h1>Spotify BPM</h1>
          </header>
        </Grid>

        <Grid item xs={6}>
          <SearchOrFilter />
        </Grid>
        <Grid item xs={6}>
          <CategoryButtons />
        </Grid>

        <Grid item xs={12}>
          <Paper
            className={`${classes.paper} ${classes.searchResultsPaper}`}
            sm={6}
          >
            <SearchResults />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper className={classes.paper} sm={6}>
            <Selections />
          </Paper>
        </Grid>

        {recommendedTracks.length > 0 && (
          <>
            <Grid item xs={8}>
              <Paper className={classes.paper} sm={6}>
                <TrackResults />
              </Paper>
            </Grid>

            <Grid item xs={4}>
              <Paper className={classes.paper} sm={6}>
                <Attributes />
              </Paper>
            </Grid>
          </>
        )}
      </Grid>
    </div>
  );
};

export default Main;
