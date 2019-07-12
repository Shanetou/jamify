import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/styles';

import ArtistChip from './ArtistChip';
import { GenreChip } from './GenreChip';
import { selectArtist, selectGenre } from '../redux/actions';

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
  const { artists, genres } = useSelector(state => {
    return {
      artists: state.artists.selected,
      genres: state.genres.selected
    };
  });

  const handleDeleteArtist = artist => () => {
    dispatch(selectArtist(artist));
  };

  const handleDeleteGenre = genre => () => {
    dispatch(selectGenre(genre));
  };

  return (
    <Grid item xs={12}>
      <Paper className={classes.paper} sm={6}>
        <div>
          {artists.map(artist => {
            console.log('artist.name:', artist.name);
            return (
              <ArtistChip
                avatar={null}
                key={artist.id}
                artist={artist}
                handleDelete={handleDeleteArtist(artist)}
                className={classes.chip}
              />
            );
          })}
        </div>
        <div>
          {genres.map(genre => {
            console.log('genre.name:', genre.name);
            return (
              <GenreChip
                avatar={null}
                key={genre}
                genre={genre}
                handleDelete={handleDeleteGenre(genre)}
                className={classes.chip}
              />
            );
          })}
        </div>
      </Paper>
    </Grid>
  );
};
