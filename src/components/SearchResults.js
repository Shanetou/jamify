import React from "react";
import { useSelector } from "react-redux";

import { artistsSelector, topArtistsSelector } from "../selectors";
import { TopArtistResults, SearchArtistResults } from "./ArtistResults";
import { categorySelector } from "../selectors";
import { CATEGORIES } from "../constants";
import { GenreResults } from "./GenreResults";

export const SearchResults = () => {
  const category = useSelector(categorySelector);
  const { searchArtistsOptions, topArtistOptions } = useSelector(state => {
    return {
      searchArtistsOptions: artistsSelector(state),
      topArtistOptions: topArtistsSelector(state)
    };
  });

  if (category.value === CATEGORIES.ARTIST.value) {
    let artistOptions =
      searchArtistsOptions.length < 1 ? topArtistOptions : searchArtistsOptions;

    return <SearchArtistResults />;
  }

  if (category.value === CATEGORIES.GENRE.value) {
    return <GenreResults />;
  }

  if (category.value === CATEGORIES.FAV_ARTISTS.value) {
    return <TopArtistResults />;
  }

  throw new Error("Unrecognized category");
};
