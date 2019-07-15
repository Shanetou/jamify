export const TARGET_ENERGY = "1.0";
export const TARGET_DANCEABILITY = "1.0";
export const MAX_SELECTABLE_SEEDS = 5;
// export const CATEGORIES = {
//   ARTIST: "Artist",
//   GENRE: "Genre",
//   FAV_ARTISTS: "Favorite Artists"
// };

export const SEED_TYPES = {
  artist: "ARTIST",
  genre: "GENRE"
};

export const CATEGORIES = {
  ARTIST: { id: 0, name: "Artist", value: "ARTIST" },
  GENRE: { id: 1, name: "Genre", value: "GENRE" },
  FAV_ARTISTS: { id: 2, name: "Favorite Artists", value: "FAV_ARTISTS" }
};

export const TEMPO_OPTIONS = {
  0: { id: 0, name: "Siesta", bpm: "115" },
  1: { id: 1, name: "Relaxed", bpm: "130" },
  2: { id: 2, name: "Standard", bpm: "145" },
  3: { id: 3, name: "Vigorous", bpm: "165" },
  4: { id: 4, name: "Extreme", bpm: "180" }
};

// export const TRACK_ATTRIBUTES = {
//   // DURATION_IN_MILLISECONDS,
//   // KEY,
//   // TIME_SIGNATURE,
//   ACOUSTICNESS,
//   DANCEABILITY,
//   ENERGY,
//   INSTRUMENTALNESS,
//   LIVENESS,
//   LOUDNESS,
//   MODE,
//   POPULARITY,
//   SPEECHINESS,
//   TEMPO,
//   VALENCE,
// };

export const TRACK_ATTRIBUTES_RANGES = {
  // DURATION_IN_MILLISECONDS: [, ],
  // KEY: [, ],
  // TIME_SIGNATURE: [,],
  ACOUSTICNESS: [0.0, 1.0],
  DANCEABILITY: [0.0, 1.0],
  ENERGY: [0.0, 1.0],
  INSTRUMENTALNESS: [0.0, 1.0],
  LIVENESS: [0.0, 1.0],
  LOUDNESS: [-60, 0],
  MODE: [0, 1],
  POPULARITY: [0, 100],
  SPEECHINESS: [0.0, 1.0],
  // TODO: What are avg tempos?
  TEMPO: [100, 200],
  VALENCE: [0.0, 1.0]
};

// export const TRACK_ATTRIBUTE_FIELD_NAMES = {
//   // DURATION_IN_MILLISECONDS: [, ],
//   // KEY: [, ],
//   // TIME_SIGNATURE: [,],
//   ACOUSTICNESS: [],
//   DANCEABILITY: [0.0, 1.0],
//   ENERGY: [0.0, 1.0],
//   INSTRUMENTALNESS: [0.0, 1.0],
//   LIVENESS: [0.0, 1.0],
//   LOUDNESS: [-60, 0],
//   MODE: [0, 1],
//   POPULARITY: [0, 100],
//   SPEECHINESS: [0.0, 1.0],
//   // TODO: What are avg tempos?
//   TEMPO: [100, 200],
//   VALENCE: [0.0, 1.0],
// };

// export const TEMPO_OPTIONS = {
//   0: { name: 'Wandering Walk', bpm: '115'},
//   1: { name: 'Brisk Jaunt', bpm: '130'},
//   2: { name: 'Jammin\' Jog', bpm: '145'},
//   3: { name: 'Righteous Run', bpm: '165'},
//   4: { name: 'Serious Sprint', bpm: '180'},
// }
