import React, { useState } from 'react';
import Select from 'react-select';

const GenreSearch = props => {
  const [selectedOption, setSelectedOption] = useState();

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

  const handleChange = selectedOption => {
    setSelectedOption(selectedOption);
    console.log(`Option selected:`, selectedOption);
  };

  return (
    <Select value={selectedOption} onChange={handleChange} options={options} />
  );
};

export default GenreSearch;
