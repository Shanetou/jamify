import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

import { selectGenre } from '../redux/actions';
import { genresSelector } from '../selectors';
import { capitalize } from '../utils';

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

export const GenreResults = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const genres = useSelector(genresSelector);

  const handleItemClick = genre => () => {
    dispatch(selectGenre(genre));
  };

  return (
    <div className={classes.root}>
      <GridList
        className={classes.gridList}
        cols={5}
        cellHeight={100}
        spacing={16}
      >
        {genres.map(genre => (
          <GridListTile key={genre.name} onClick={handleItemClick(genre)}>
            <GridListTileBar
              title={genre.name}
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
