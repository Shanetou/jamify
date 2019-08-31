import { SEED_TYPES } from "../../constants";

export const isArtistSeed = seed => seed.seedType === SEED_TYPES.artist;
export const isGenreSeed = seed => seed.seedType === SEED_TYPES.genre;
export const isAttributeSeed = seed => seed.seedType === SEED_TYPES.attribute;
