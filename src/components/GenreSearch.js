import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { capitalize } from '../utils';
import { selectGenre } from '../redux/actions';

const buildSelectOptions = genres => {
  return genres.map(genre => {
    return {
      value: genre,
      label: capitalize(genre)
    };
  });
};

const GenreSearch = props => {
  const { options, selectedOptions, selectGenre } = props;

  const handleChange = selectState => {
    selectGenre(selectState);
  };

  return (
    <Select
      isMulti
      value={selectedOptions}
      onChange={handleChange}
      options={options}
    />
  );
};

const mapStateToProps = state => {
  return {
    options: buildSelectOptions(state.genres.recommendationGenres),
    selectedOptions: state.genres.selected
  };
};

const mapDispatchToProps = {
  selectGenre
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GenreSearch);
