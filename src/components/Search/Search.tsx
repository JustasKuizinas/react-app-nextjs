import React, { Component, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import './Search.scss';
import Input from '../Input/Input';
import Button from '../Button/Button';

const Search: React.FC<any> = props => {
  const [searchValue, setSearchValue] = useState('');


  function onChange(value) {
    setSearchValue(value);
  }

  function doSearch() {
    props.onSearch(searchValue);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      doSearch();
    }
  }

  return (
    <div className="search">
      <Input
        value={props.value}
        style="-secondary"
        type="text"
        placeholder="What do you want to watch?"
        onChange={onChange}
        onKeyDown={handleKeyDown}
      />
      <Button style="-primary" onClick={doSearch}>
        search
      </Button>
    </div>
  );
};

Search.propTypes = {};

export default Search;
