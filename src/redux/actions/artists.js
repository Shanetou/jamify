import { createAction } from 'redux-starter-kit';

export const selectArtist = createAction('SELECT_ARTIST');

export const searchArtist = createAction('SEARCH_ARTIST');

export const fetchTopArtists = createAction('FETCH_TOP_ARTISTS');
