import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const SearchComponent = ({ data = [], onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchField, setSearchField] = useState('County');

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    const term = debouncedSearchTerm.trim().toLowerCase();
    if (!term) {
      onSearch(data);
      return;
    }

    const filteredData = data.filter((item) => {
      const fieldValue = item[searchField];
      return (
        fieldValue &&
        String(fieldValue).toLowerCase().includes(term)
      );
    });

    onSearch(filteredData);
  }, [data, debouncedSearchTerm, searchField, onSearch]);

  return (
    <div className="flex flex-wrap items-center justify-center">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={`Search by ${searchField}`}
        className="border p-2 rounded w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3"
      />
      <select
        value={searchField}
        onChange={(e) => setSearchField(e.target.value)}
        className="ml-2 border p-2 rounded"
      >
        <option value="County">County</option>
        <option value="VIN (1-10)">VIN</option>
        <option value="Make">Make</option>
        <option value="Model">Model</option>
      </select>
    </div>
  );
};

SearchComponent.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      County: PropTypes.string,
      City: PropTypes.string,
      State: PropTypes.string,
      'Postal Code': PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      Model: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      'CAFV Eligibility': PropTypes.string,
      'Electric Range': PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      'Legislative District': PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      'DOL Vehicle ID': PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      'Electric Utility': PropTypes.string,
      '2020 Census Tract': PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      'VIN (1-10)': PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ),
  onSearch: PropTypes.func.isRequired,
};

export default SearchComponent;