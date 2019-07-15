import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { selectRecommendationSeed } from '../redux/actions';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    flexGrow: 1,
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)'
  },
  pointer: {
    cursor: 'pointer'
  },
  title: {
    color: theme.palette.primary.light,
    textAlign: 'initial'
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
  }
}));

const getArtistImageUrl = images => {
  const lastItem = images.slice(-1).pop();

  return lastItem ? lastItem.url : '';
};

export const ArtistResults = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { artistsOptions } = useSelector(state => {
    return {
      artistsOptions: state.artists.searchResults
    };
  });

  const handleItemClick = artist => () => {
    dispatch(selectRecommendationSeed(artist));
  };

  return (
    <div className={classes.root}>
      <GridList
        className={classes.gridList}
        cols={5}
        cellHeight={100}
        spacing={16}
      >
        {artistsOptions.map(artist => (
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
    </div>
  );
};
