import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { capitalize } from '../utils';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import { selectCategory } from 'redux/actions';
import { CATEGORIES } from '../constants';

function TabContainer(props) {
  const { children, dir } = props;

  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired
};

const useStyles = makeStyles(theme => ({
  root: {
    // backgroundColor: theme.palette.background.paper,
    // width: 500,
    // position: "relative"
    // minHeight: 200
  }
}));

export const CategoryButtons = () => {
  const classes = useStyles();
  const theme = useTheme();
  const { selectedCategory } = useSelector(state => {
    return {
      selectedCategory: state.ui.category
    };
  });
  const dispatch = useDispatch();

  function handleChange(_event, newValue) {
    dispatch(selectCategory(newValue));
  }

  // const transitionDuration = {
  //   enter: theme.transitions.duration.enteringScreen,
  //   exit: theme.transitions.duration.leavingScreen
  // };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={selectedCategory}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          {Object.values(CATEGORIES).map(category => {
            return (
              <Tab value={category} label={category.name} key={category.id} />
            );
          })}
        </Tabs>
      </AppBar>
    </div>
  );
};
