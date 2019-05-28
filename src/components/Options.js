import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/styles';

import ArtistChip from './ArtistChip';
import { selectArtist } from '../redux/actions';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary
  },
  chip: {
    margin: theme.spacing(0, 0.5)
  }
}));

const Options = props => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { selected } = useSelector(state => {
    return {
      selected: state.artists.selected
    };
  });

  const handleDelete = artist => () => {
    dispatch(selectArtist(artist));
  };

  return (
    <Grid item xs={12}>
      <Paper className={classes.paper} sm={6}>
        <div>
          {selected.map(artist => {
            console.log('artist.name:', artist.name);
            return (
              <ArtistChip
                avatar={null}
                key={artist.id}
                artist={artist}
                handleDelete={handleDelete(artist)}
                className={classes.chip}
              />
            );
          })}
        </div>
      </Paper>
    </Grid>
  );
};

export default Options;
