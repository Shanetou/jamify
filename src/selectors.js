import { SEED_TYPES } from "./constants";

export const accessTokenSelector = state => state.user.accessToken;
export const attributesSelector = state => state.attributes.attributes;
export const tracksSelector = state => state.recommendations.tracks;
export const selectedTracksSelector = state =>
  state.recommendations.selectedTracks;
export const dialogSelector = state => state.ui.dialog;
export const toastSelector = state => state.ui.toast;
export const categorySelector = state => state.ui.category;
export const selectedTempoSelector = state => state.tempos.selected;
export const topArtistsSelector = state => state.artists.artists;
export const userSelector = state => state.user.user;
export const genresSelector = state => state.genres.filteredGenres;
export const recommendationSeedsSelector = state =>
  state.recommendations.recommendationSeeds;
export const selectedArtistsSelector = state =>
  state.recommendations.recommendationSeeds.filter(
    seed => seed.seedType === SEED_TYPES.artist
  );
export const selectedGenresSelector = state =>
  state.recommendations.recommendationSeeds.filter(
    seed => seed.seedType === SEED_TYPES.genre
  );
