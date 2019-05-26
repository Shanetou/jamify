import React from 'react';
import MuiChip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';

const Chip = props => {
  const { label, handleDelete } = props;
  console.log('label:', label);
  const handleClick = () => {
    alert('You clicked the Chip.');
  };

  return (
    <MuiChip
      // avatar={<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />}
      label={label}
      onDelete={handleDelete}
      // className={classes.chip}
    />
  );
};

export default Chip;
