import React from 'react';

import MuiChip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/styles';

// const getArtistImageUrl = images => {
//   const lastItem = images.slice(-1).pop();

//   return lastItem ? lastItem.url : '';
// };

const useStyles = makeStyles(theme => ({}));

export const GenreChip = props => {
  const { genre, handleDelete, className } = props;
  // const classes = useStyles();
  // let imageUrl = getArtistImageUrl(artist.images);

  return (
    <MuiChip
      avatar={<Avatar alt={genre.id} src={''} />}
      label={genre.name}
      onDelete={handleDelete}
      className={className}
      // classes={{
      //   label: classes.label
      // }}
    />
  );
};
