import React, { Component, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import './MoviesList.scss';
import MoviesFilter from '../MoviesFilter/MoviesFilter';
import MovieCard from '../../components/MovieCard/MovieCard';
import { connect, shallowEqual, useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux';
import { API_URL } from '../../types';
import MovieService from '../../services/movie/movie.service';
import { __dc } from '../../helpers';
import { getFilteredMovies } from '../../redux/movie/movie.selectors';
import { movieInit } from '../../redux/movie/movie.actions';

const MoviesList: React.FC<any> = props => {
  const [moviesFound, setMoviesFound] = useState(null);
  const [moviesInitialized, setMoviesInitialized] = useState(null);
  const dispatch = useDispatch();
  let movies = useSelector(getFilteredMovies());

  useEffect(() => {
    if (moviesInitialized) {
      if (movies.length > 0) {
        setMoviesFound(true);
      } else {
        setMoviesFound(false);
      }
    }
  }, [movies]);

  useEffect(() => {
    MovieService.getAll(1000).then(movies => {
      setMoviesInitialized(true);
      dispatch(movieInit(movies));
    });
  }, []);

  function renderMovieList() {
    return (
      <div>
        <div className="movies-list__found">
          <span>{movies.length}</span> movies found
        </div>
        <div className="movies-list__grid">
          {movies.map(movie => (
            <MovieCard
              openModal={props.openModal}
              movie={movie}
              key={movie.id}
            />
          ))}
        </div>
      </div>
    );
  }

  function renderNotFound() {
    return <div className="movies-list__notfound">No Movie Found</div>;
  }

  return (
    <div className="movies-list">
      <div className="container">
        <MoviesFilter />
        {moviesFound != null
          ? moviesFound
            ? renderMovieList()
            : renderNotFound()
          : ''}
      </div>
    </div>
  );
};

MoviesList.propTypes = {
  movies: PropTypes.array,
  moviesReceived: PropTypes.bool,
};

// MoviesList.whyDidYouRender = true;

export default MoviesList;
