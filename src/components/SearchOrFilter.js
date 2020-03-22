import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CATEGORIES } from "../constants";
import { filterGenres, searchArtist } from "../redux/actions";
import { categorySelector } from "../selectors";
import { SearchOrFilterInput } from "./SearchOrFilterInput";

export const SearchOrFilter = () => {
  const dispatch = useDispatch();
  const category = useSelector(categorySelector);
  const [artistSearchText, setArtistSearchText] = useState("");
  const [genreSearchText, setGenreSearchText] = useState("");

  if (category.value === CATEGORIES.ARTIST.value) {
    return (
      <SearchOrFilterInput
        label="Search Artists"
        searchText={artistSearchText}
        setSearchText={setArtistSearchText}
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
        searchText={genreSearchText}
        setSearchText={setGenreSearchText}
        onChange={value => {
          if (value !== "") {
            dispatch(filterGenres(value));
          }
        }}
      />
    );
  }

  if (category.value === CATEGORIES.FAV_ARTISTS.value) {
    return null;
  }

  throw new Error("Unrecognized category");
};
