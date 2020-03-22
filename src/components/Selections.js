import { makeStyles } from "@material-ui/styles";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectRecommendationSeed } from "../redux/actions";
import { isArtistSeed, isGenreSeed } from "../redux/reducers/helpers";
import ArtistChip from "./ArtistChip";
import { GenreChip } from "./GenreChip";
import { PlaceholderText } from "./PlaceholderText";

const useStylesSelection = makeStyles(theme => ({
  chip: {
    margin: theme.spacing(0, 0.5)
  }
}));

const Selection = ({ onDeleteClick, seed }) => {
  const classes = useStylesSelection();
  const isArtist = isArtistSeed(seed);
  const isGenre = isGenreSeed(seed);

  if (isArtist) {
    return (
      <ArtistChip
        avatar={null}
        artist={seed}
        handleDelete={onDeleteClick(seed)}
        className={classes.chip}
      />
    );
  }
  if (isGenre) {
    return (
      <GenreChip
        avatar={null}
        genre={seed}
        handleDelete={onDeleteClick(seed)}
        className={classes.chip}
      />
    );
  }
  throw new Error("Selected seed item of unknown type");
};

const useStylesSelections = makeStyles(theme => ({
  container: {
    height: theme.spacing(4)
  }
}));

export const Selections = _props => {
  const classes = useStylesSelections();
  const dispatch = useDispatch();
  const { selectedSeeds } = useSelector(state => ({
    selectedSeeds: state.recommendations.recommendationSeeds
  }));

  const removeChip = item => () => {
    dispatch(selectRecommendationSeed(item));
  };

  return (
    <div className={classes.container}>
      {selectedSeeds.length > 0 ? (
        selectedSeeds.map(seed => (
          <Selection key={seed.name} seed={seed} onDeleteClick={removeChip} />
        ))
      ) : (
        <PlaceholderText>
          Select an artist or genre to see recommended tracks
        </PlaceholderText>
      )}
    </div>
  );
};
