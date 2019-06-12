export const accessTokenSelector = state => state.user.accessToken;
export const recommendedTracksSelector = state =>
  state.tracks.recommendedTracks;
export const selectedArtistsSelector = state => state.artists.selected;
export const categorySelector = state => state.ui.category;
export const selectedTempoSelector = state => state.tempos.selected;
export const topArtistsSelector = state => state.artists.artists;
export const userSelector = state => state.user.user;
export const genresSelector = state => state.genres.filteredGenres;
