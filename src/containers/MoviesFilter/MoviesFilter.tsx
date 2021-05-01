import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
// import './MoviesFilter.scss';
import Select from '../../components/Select/Select';
import { MOVIE_GENRES, SORT_BY } from '../../types';
import { connect, useDispatch, useSelector } from 'react-redux';
import { movieFilter, movieSort } from '../../redux/movie/movie.actions';
import { RootState } from '../../redux';
import { setGenre } from '../../redux/genre';
import { setSort } from '../../redux/sort';

const MoviesFilter: React.FC<any> = props => {
  let activeGenre = useSelector((state: RootState) => state.genre);
  let dispatch = useDispatch();

  let buttons = [
    ...Object.values(MOVIE_GENRES).map(genre => ({
      label: genre,
    })),
  ];

  let options = [
    ...Object.values(SORT_BY).map(genre => ({
      label: genre,
      value: genre,
    })),
  ];

  function selectGenre(genre) {
    dispatch(setGenre(genre));
  }

  function sortBy(e) {
    dispatch(setSort(e.target.value));
  }

  return (
    <div className="movies-filter">
      <div className="movies-filter__border"></div>
      <div className="movies-filter_cats">
        {buttons.map(button => (
          <button
            onClick={() => selectGenre(button.label)}
            className={button.label == activeGenre ? 'is-active' : ''}
            key={button.label}
          >
            {button.label}
          </button>
        ))}
      </div>
      <div className="movies-filter__sort">
        <label>sort by</label>
        <Select onChange={sortBy} options={options}></Select>
      </div>
    </div>
  );
};

export default MoviesFilter;
