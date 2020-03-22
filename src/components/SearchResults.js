import React from "react";
import { useSelector } from "react-redux";
import { CATEGORIES } from "../constants";
import { categorySelector } from "../selectors";
import { SearchArtistResults, TopArtistResults } from "./ArtistResults";
import { GenreResults } from "./GenreResults";

export const SearchResults = () => {
  const category = useSelector(categorySelector);

  if (category.value === CATEGORIES.ARTIST.value) {
    return <SearchArtistResults />;
  }

  if (category.value === CATEGORIES.GENRE.value) {
    return <GenreResults />;
  }

  if (category.value === CATEGORIES.FAV_ARTISTS.value) {
    return <TopArtistResults />;
  }

  throw new Error("Unknown SearchResults category");
};
