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

export const TopArtistsResults = props => {
  const topArtistOptions = useSelector(topArtistsSelector);

  return <ArtistResults options={topArtistOptions} />;
};
