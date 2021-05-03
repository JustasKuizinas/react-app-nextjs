import React, { Component, useEffect } from 'react';
import PropTypes from 'prop-types';
// import './Header.scss';
import { VscSearch } from 'react-icons/vsc';
import Button from '../../components/Button/Button';
import Search from '../../components/Search/Search';
import { MODAL } from '../../types';
import { connect, useDispatch, useSelector } from 'react-redux';
import { movieFilter } from '../../redux/movie/movie.actions';
import { setSearch } from '../../redux/search';
import { getFilteredMovies, getMovie } from '../../redux/movie/movie.selectors';
import { useRouter } from 'next/router';

const Header: React.FC<any> = props => {
  const dispatch = useDispatch();
  const router = useRouter();
  const filmID = +router.query.filmID;
  let activeMovie = useSelector(getMovie(filmID));
  let movies = useSelector(getFilteredMovies());
  let searchQuery:any = '';

  useEffect(() => {
    console.log(router.query);
    if (activeMovie) {
      window.scrollTo(0, 0);
    }
    if (movies.length > 0 && filmID && !activeMovie) {
      router.push('/404');
    }
  }, [movies, activeMovie]);



  useEffect(() => {
    if (router.query.search) {
      searchQuery = router.query.search;
      dispatch(setSearch(searchQuery));
    } else {
      searchQuery = '';
      dispatch(setSearch(''));
    }
  }, [router.query.search]);

  function closeMovieInfo() {
    router.push('', undefined, { shallow: true });
  }
  
  function addMovie() {
    props.openModal(MODAL.MOVIE_ADD);
  }

  function doSearch(value) {
    if (value.trim()) {
      router.push('?search=' + value, undefined, { shallow: true });
    } else {
      router.push('', undefined, { shallow: true });
    }
  }

  function renderSearch() {
    return (
      <div className="header__search">
        <div className="container">
          <div className="header__add">
            <Button onClick={addMovie} style="-secondary">
              + ADD MOVIE
            </Button>
          </div>

          <h1>Find your movie</h1>
          <Search value={searchQuery} onSearch={doSearch} />
        </div>
      </div>
    );
  }

  function renderMovieDetails() {
    return (
      <div className="movie-info">
        <div className="container">
          <VscSearch onClick={closeMovieInfo} className="icon-search" />
          <img src={activeMovie?.poster_path} alt="" />
          <div className="movie-info__desc">
            <div className="movie-info__title">
              {activeMovie?.title}
              <span>{activeMovie?.vote_average}</span>
            </div>
            <div className="movie-info__sub">{activeMovie?.tagline}</div>
            <div className="movie-info__yt">
              {activeMovie?.release_date.slice(0, 4)}
              {activeMovie?.runtime && <span>{activeMovie?.runtime} min</span>}
            </div>
            <p>{activeMovie?.overview}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="header">
      <div className="header__bg"></div>
      {!activeMovie && renderSearch()}
      {activeMovie && renderMovieDetails()}
    </div>
  );
};

Header.propTypes = {
  movie: PropTypes.object,
};

export default Header;
