export const USER = 'me'
export const TOP_ARTISTS_PATH = 'me/top/artists?limit=12'
export const RECOMMENDED_TRACKS_PATH = 'recommendations'

export const getRecommendedTracksPath = (queryString) => (
  `${RECOMMENDED_TRACKS_PATH}?${queryString}`
)
