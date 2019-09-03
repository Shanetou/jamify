export const MAX_SELECTABLE_SEEDS = 5;

export const TOASTS = {
  MAX_SEEDS_SELECTED: "MAX_SEEDS_SELECTED"
};

export const DIALOGS = {
  GENERIC_ERROR: "GENERIC_ERROR",
  AUTHENTICATION_ERROR: "AUTHENTICATION_ERROR"
};

export const SEED_TYPES = {
  artist: "ARTIST",
  genre: "GENRE",
  attribute: "ATTRIBUTE"
};

export const CATEGORIES = {
  ARTIST: { id: 0, name: "Artist", value: "ARTIST" },
  GENRE: { id: 1, name: "Genre", value: "GENRE" },
  FAV_ARTISTS: { id: 2, name: "Favorite Artists", value: "FAV_ARTISTS" }
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
  ACOUSTICNESS: {
    min: 0.0,
    max: 1.0,
    scale: 100
  },
  DANCEABILITY: {
    min: 0.0,
    max: 1.0,
    scale: 100
  },
  ENERGY: {
    min: 0.0,
    max: 1.0,
    scale: 100
  },
  INSTRUMENTALNESS: {
    min: 0.0,
    max: 1.0,
    scale: 100
  },
  LIVENESS: {
    min: 0.0,
    max: 1.0,
    scale: 100
  },
  // TODO: FIND A WAY TO SCALE THIS
  // LOUDNESS: [-60, 0],
  // TODO: FIND A WAY TO SCALE THIS
  // MODE: [0, 1],
  POPULARITY: {
    min: 0,
    max: 100,
    scale: 1
  },
  SPEECHINESS: {
    min: 0.0,
    max: 1.0,
    scale: 100
  },
  // TODO: FIND A WAY TO SCALE THIS
  // TODO: What are avg tempos?
  TEMPO: { min: 100, max: 200, scale: 0.5 },
  VALENCE: {
    min: 0.0,
    max: 1.0,
    scale: 100
  }
};

export const normalizedAttributes = attributes => {
  const entries = Object.entries(attributes);
  const normalizedEntries = entries.map(([name, range]) => {
    return [
      name,
      {
        seedType: SEED_TYPES.attribute,
        id: name,
        isSelected: false,
        name: name,
        range,
        value: range.max / 2
      }
    ];
  });

  return Object.fromEntries(normalizedEntries);
};

export const TRACK_ATTRIBUTES = normalizedAttributes(TRACK_ATTRIBUTES_RANGES);
