import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import { selectRecommendationSeed } from "../redux/actions";
import { artistsSelector, topArtistsSelector } from "../selectors";

const useStyles = makeStyles(theme => ({
  gridList: {
    flexWrap: "nowrap",
    transform: "translateZ(0)"
  },
  pointer: {
    cursor: "pointer"
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

const getArtistImageUrl = images => {
  console.log("images", images);
  const lastItem = images.slice(-1).pop();

  return lastItem ? lastItem.url : "";
};

const ArtistResults = props => {
  const { artists } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleItemClick = artist => () => {
    dispatch(selectRecommendationSeed(artist));
  };

  return (
    <GridList
      className={classes.gridList}
      cols={5}
      cellHeight={100}
      spacing={16}
    >
      {artists.map(artist => (
        <GridListTile key={artist.id} onClick={handleItemClick(artist)}>
          <img
            src={getArtistImageUrl(artist.images)}
            alt={artist.name}
            className={classes.pointer}
          />
          <GridListTileBar
            title={artist.name}
            className={classes.pointer}
            classes={{
              root: classes.titleBar,
              title: classes.title
            }}
          />
        </GridListTile>
      ))}
    </GridList>
  );
};

export const SearchArtistResults = () => {
  const { searchArtistsOptions, topArtistOptions } = useSelector(state => {
    return {
      searchArtistsOptions: artistsSelector(state),
      topArtistOptions: topArtistsSelector(state)
    };
  });

  let artistOptions =
    searchArtistsOptions.length < 1 ? topArtistOptions : searchArtistsOptions;

  return <ArtistResults artists={artistOptions} />;
};

export const TopArtistResults = () => {
  const { topArtistOptions } = useSelector(state => {
    return {
      topArtistOptions: topArtistsSelector(state)
    };
  });

  return <ArtistResults artists={topArtistOptions} />;
};
