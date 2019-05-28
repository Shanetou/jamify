import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ArtistSearch } from './ArtistSearch';
import { categorySelector } from '../selectors';
import { CATEGORIES } from '../constants';

export const SearchOrFilter = () => {
  const category = useSelector(categorySelector);
  console.log('category:', category);

  if (category.value === CATEGORIES.ARTIST.value) {
    return <ArtistSearch />;
  }

  if (category.value === CATEGORIES.GENRE.value) {
    return 'Genre';
  }

  if (category.value === CATEGORIES.FAV_ARTISTS.value) {
    return 'Fav Artists';
  }

  throw new Error('Unrecognized category');
};