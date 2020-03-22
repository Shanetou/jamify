import Avatar from "@material-ui/core/Avatar";
import MuiChip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/styles";
import React from "react";

const getArtistImageUrl = images => {
  const lastItem = images.slice(-1).pop();

  return lastItem ? lastItem.url : "";
};

const useStyles = makeStyles(_theme => ({}));

const ArtistChip = props => {
  const { artist, handleDelete, className } = props;
  const classes = useStyles();
  const imageUrl = getArtistImageUrl(artist.images);

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
