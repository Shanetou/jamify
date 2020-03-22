import Avatar from "@material-ui/core/Avatar";
import MuiChip from "@material-ui/core/Chip";
import React from "react";

export const GenreChip = props => {
  const { genre, handleDelete, className } = props;

  return (
    <MuiChip
      avatar={<Avatar alt={genre.id} src="" />}
      label={genre.name}
      onDelete={handleDelete}
      className={className}
    />
  );
};
