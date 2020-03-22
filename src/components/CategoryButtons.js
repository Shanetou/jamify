import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCategory } from "../redux/actions";
import { CATEGORIES } from "../constants";

export const CategoryButtons = () => {
  const { selectedCategory } = useSelector(state => ({
    selectedCategory: state.ui.category
  }));
  const dispatch = useDispatch();

  function handleChange(_event, newValue) {
    dispatch(selectCategory(newValue));
  }

  return (
    <AppBar position="static" color="default">
      <Tabs
        value={selectedCategory}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
      >
        {Object.values(CATEGORIES).map(category => (
          <Tab value={category} label={category.name} key={category.id} />
        ))}
      </Tabs>
    </AppBar>
  );
};
