import React from 'react';

import MuiChip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';

const getArtistImageUrl = images => {
  const lastItem = images.slice(-1).pop();

  return lastItem ? lastItem.url : '';
};

const useStyles = makeStyles(theme => ({}));

const ArtistChip = props => {
  const { artist, handleDelete, className } = props;
  console.log('artist:', artist);
  let imageUrl = getArtistImageUrl(artist.images);

  const classes = useStyles();

  const handleClick = () => {
    alert('You clicked the Chip.');
  };

  // const label = (
  //   <Typography>

  //   </Typography>
  // )

  return (
    <MuiChip
      avatar={<Avatar alt={artist.name} src={imageUrl} />}
      label={artist.name}
      onDelete={handleDelete}
      className={className}
      classes={{
        label: classes.label
      }}
    />
  );
};

export default ArtistChip;
