import { SEED_TYPES } from './constants';

export const accessTokenSelector = state => state.user.accessToken;
export const recommendedTracksSelector = state =>
  state.tracks.recommendedTracks;
// export const selectedArtistsSelector = state => state.artists.selected;
export const categorySelector = state => state.ui.category;
export const selectedTempoSelector = state => state.tempos.selected;
export const topArtistsSelector = state => state.artists.artists;
export const userSelector = state => state.user.user;
export const genresSelector = state => state.genres.filteredGenres;
export const selectedArtistsSelector = state =>
  state.recommendations.recommendationSeeds.filter(
    seed => seed.seedType === SEED_TYPES.artist
  );
export const selectedGenresSelector = state =>
  state.recommendations.recommendationSeeds.filter(
    seed => seed.seedType === SEED_TYPES.genre
  );
