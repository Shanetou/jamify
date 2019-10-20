import React from "react";
import { useSelector } from "react-redux";

import { ArtistResults } from "./ArtistResults";
import {
  categorySelector,
  artistsSelector,
  topArtistsSelector
} from "../selectors";
import { CATEGORIES } from "../constants";
import { GenreResults } from "./GenreResults";
import { TopArtistsResults } from "./TopArtistsResults";

export const SearchResults = () => {
  const { category, searchArtistsOptions, topArtistOptions } = useSelector(
    state => {
      return {
        searchArtistsOptions: artistsSelector(state),
        topArtistOptions: topArtistsSelector(state),
        category: categorySelector(state)
      };
    }
  );
  let artistsOptions =
    searchArtistsOptions.length < 1 ? topArtistOptions : searchArtistsOptions;

  if (category.value === CATEGORIES.ARTIST.value) {
    return <ArtistResults options={artistsOptions} />;
  }

  if (category.value === CATEGORIES.GENRE.value) {
    return <GenreResults />;
  }

  if (category.value === CATEGORIES.FAV_ARTISTS.value) {
    return <TopArtistsResults />;
  }

  throw new Error("Unrecognized category");
};
