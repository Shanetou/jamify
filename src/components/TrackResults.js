import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { recommendedTracksSelector } from '../selectors';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  title: {
    textAlign: 'center'
  },
  control: {
    padding: theme.spacing(2)
  }
}));

export const TrackResults = props => {
  const classes = useStyles();
  const { tracks } = useSelector(state => {
    return {
      tracks: recommendedTracksSelector(state)
    };
  });

  return (
    <div>
      <h3 className={classes.title}>Recommendations</h3>
      <div>
        {tracks.map(track => {
          console.log('track:', track);
          return <h4>{track.name}</h4>;
        })}
      </div>
    </div>
  );
};
