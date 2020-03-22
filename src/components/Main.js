import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { useSelector } from "react-redux";
import { tracksSelector } from "selectors";
import { Attributes } from "./Attributes";
import { CategoryButtons } from "./CategoryButtons";
import { SearchOrFilter } from "./SearchOrFilter";
import { SearchResults } from "./SearchResults";
import { Selections } from "./Selections";
import { TrackResults } from "./TrackResults";

const useStyles = makeStyles(theme => ({
  control: {
    padding: theme.spacing(2)
  },
  logoTitle: {
    fontVariant: "small-caps"
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary
  },
  searchResultsPaper: {
    // Maintain height when loading / loaded
    height: "132px"
  },
  root: {
    flexGrow: 1,
    padding: theme.spacing(4)
  },
  trackResultsContainer: {
    order: 1,
    [theme.breakpoints.down("sm")]: {
      order: 2
    }
  },
  attributesContainer: {
    order: 2,
    [theme.breakpoints.down("sm")]: {
      order: 1
    }
  }
}));

const Main = _props => {
  const classes = useStyles();
  const { recommendedTracks } = useSelector(state => ({
    recommendedTracks: Object.values(tracksSelector(state))
  }));

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <header>
            <Typography className={classes.logoTitle} variant="h3">
              Jamify
            </Typography>
          </header>
        </Grid>

        <Grid item sm={6} md={6}>
          <SearchOrFilter />
        </Grid>
        <Grid item sm={6} md={6}>
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
            <Grid item xs={12} md={8} className={classes.trackResultsContainer}>
              <Paper className={classes.paper} sm={6}>
                <TrackResults />
              </Paper>
            </Grid>

            <Grid item xs={12} md={4} className={classes.attributesContainer}>
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
