import { createReducer } from 'redux-starter-kit';

import { selectArtist } from 'redux/actions';

import { MAX_SELECTABLE_ARTISTS } from '../../constants';

const addOrRemoveArtist = (prevSelected, id) => {
  const selectedIdx = prevSelected.indexOf(id);

  if (selectedIdx > -1) {
    return prevSelected.filter((_, i) => i !== selectedIdx);
  }

  if (prevSelected.length < MAX_SELECTABLE_ARTISTS) {
    return [...prevSelected, id];
  }

  return prevSelected;
};

const initialState = {
  artists: [],
  selected: []
};

const artistReducer = createReducer(initialState, {
  [selectArtist]: (state, action) => {
    const { selected } = state;
    const { payload } = action;

    return {
      ...state,
      selected: addOrRemoveArtist(selected, payload)
    };
  },
  API_FETCH_TOP_ARTISTS_SUCCESS: (state, action) => {
    return {
      ...state,
      // Just pulling out the items array here
      // there are lots of other attributes in the resp
      // including pagination links and total items length
      artists: action.response.items
    };
  }
});

export default artistReducer;
