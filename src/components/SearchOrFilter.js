import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { CATEGORIES } from "../constants";
import { categorySelector } from "../selectors";
import { filterGenres, searchArtist } from "../redux/actions";
import { SearchOrFilterInput } from "./SearchOrFilterInput";

export const SearchOrFilter = () => {
  const category = useSelector(categorySelector);
  const dispatch = useDispatch();

  if (category.value === CATEGORIES.ARTIST.value) {
    return (
      <SearchOrFilterInput
        label="Search Artists"
        onChange={value => {
          if (value !== "") {
            dispatch(searchArtist(value));
          }
        }}
      />
    );
  }

  if (category.value === CATEGORIES.GENRE.value) {
    return (
      <SearchOrFilterInput
        label="Search Genres"
        onChange={value => {
          dispatch(filterGenres(value));
        }}
      />
    );
  }

  if (category.value === CATEGORIES.FAV_ARTISTS.value) {
    return null;
  }

  throw new Error("Unrecognized category");
};
