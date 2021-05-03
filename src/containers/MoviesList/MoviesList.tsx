import React, {useEffect, useState } from 'react';
// import './MoviesList.scss';
import MoviesFilter from '../MoviesFilter/MoviesFilter';
import MovieCard from '../../components/MovieCard/MovieCard';
import { useDispatch, useSelector } from 'react-redux';

import { __dc } from '../../helpers';
import { getFilteredMovies } from '../../redux/movie/movie.selectors';


const MoviesList: React.FC<any> = props => {
  const [moviesFound, setMoviesFound] = useState(null);
  const dispatch = useDispatch();
  let movies = useSelector(getFilteredMovies());


  useEffect(() => {
      if (movies.length > 0) {
        setMoviesFound(true);
      } else {
        setMoviesFound(false);
      }
  }, [movies]);




  function renderMovieList() {
    return (
      <>
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
      </>
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

// MoviesList.whyDidYouRender = true;

export default MoviesList;
