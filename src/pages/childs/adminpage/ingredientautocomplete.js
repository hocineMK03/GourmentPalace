import React from 'react';
import Select from 'react-select';

const IngredientAutocomplete = ({ value, onChange, options }) => {
  const handleChange = (selectedOption) => {
    onChange(selectedOption);
  };

  return (
    <Select
      value={value}
      onChange={handleChange}
      options={options}
      isSearchable
      placeholder="Select an ingredient..."
      getOptionLabel={(option) => option.label}
      getOptionValue={(option) => option.value}
      styles={{
        control: (provided) => ({
          ...provided,
          width: '100%', // Adjust the width as needed
          borderRadius: '4px', // Add other styles as needed
        }),
        input: (provided) => ({
          ...provided,
          margin: '0',
        }),
      }}
    />
  );
};

export default IngredientAutocomplete;
