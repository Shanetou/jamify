import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/styles";

import ArtistChip from "./ArtistChip";
import { GenreChip } from "./GenreChip";
import { selectRecommendationSeed } from "../redux/actions";
// import { selectedArtistsSelector, selectedGenresSelector } from "../selectors";
// import { SEED_TYPES } from '../constants';
import { isArtistSeed, isGenreSeed } from "../redux/reducers/helpers";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary
  },
  chip: {
    margin: theme.spacing(0, 0.5)
  }
}));

export const Selections = props => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { selectedSeeds } = useSelector(state => {
    return {
      selectedSeeds: state.recommendations.recommendationSeeds
    };
  });

  const removeChip = item => () => {
    dispatch(selectRecommendationSeed(item));
  };

  return (
    <Grid item xs={12}>
      <Paper className={classes.paper} sm={6}>
        <div>
          {selectedSeeds.map(seed => {
            let isArtist = isArtistSeed(seed);
            let isGenre = isGenreSeed(seed);

            if (isArtist) {
              return (
                <ArtistChip
                  avatar={null}
                  key={seed.id}
                  artist={seed}
                  handleDelete={removeChip(seed)}
                  className={classes.chip}
                />
              );
            } else if (isGenre) {
              return (
                <GenreChip
                  avatar={null}
                  key={seed.name}
                  genre={seed}
                  handleDelete={removeChip(seed)}
                  className={classes.chip}
                />
              );
            } else {
              throw new Error("Selected seed item of unknown type");
            }
          })}
        </div>
      </Paper>
    </Grid>
  );
};
