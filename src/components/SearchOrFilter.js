import React from "react";
import { useSelector } from "react-redux";

import { categorySelector } from "../selectors";
import { CATEGORIES } from "../constants";
import { filterGenres, searchArtist } from "../redux/actions";
import { SearchOrFilterInput } from "./SearchOrFilterInput";

export const SearchOrFilter = () => {
  const category = useSelector(categorySelector);

  if (category.value === CATEGORIES.ARTIST.value) {
    return (
      <SearchOrFilterInput label="Search Artists" onChange={searchArtist} />
    );
  }

  if (category.value === CATEGORIES.GENRE.value) {
    return (
      <SearchOrFilterInput label="Search Genres" onChange={filterGenres} />
    );
  }

  if (category.value === CATEGORIES.FAV_ARTISTS.value) {
    return null;
  }

  throw new Error("Unrecognized category");
};
