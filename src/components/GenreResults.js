import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import MuiChip from "@material-ui/core/Chip";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Typography from "@material-ui/core/Typography";
import { selectRecommendationSeed } from "../redux/actions";
import { genresSelector } from "../selectors";
import { chunk } from "../utils";

const useStyles = makeStyles(theme => ({
  chip: {
    width: "-webkit-fill-available"
  },
  gridList: {
    flexGrow: 1,
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)"
  },
  pointer: {
    cursor: "pointer"
  },
  tile: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly"
  },
  title: {
    color: theme.palette.primary.light,
    textAlign: "initial"
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"
  }
}));

export const GenreResults = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const genres = useSelector(genresSelector);
  const chunkedGenres = chunk(genres, 2);

  const handleItemClick = genre => () => {
    dispatch(selectRecommendationSeed(genre));
  };

  return (
    <GridList
      className={classes.gridList}
      cols={5}
      cellHeight={100}
      spacing={16}
    >
      {chunkedGenres.map((genrePair, idx) => (
        <GridListTile
          classes={{
            tile: classes.tile
          }}
          key={idx}
        >
          {genrePair.map(genre => (
            <div key={genre.name}>
              <MuiChip
                label={
                  <Typography className={classes.title}>
                    {genre.name}
                  </Typography>
                }
                clickable={true}
                className={classes.chip}
                onClick={handleItemClick(genre)}
              />
            </div>
          ))}
        </GridListTile>
      ))}
    </GridList>
  );
};
