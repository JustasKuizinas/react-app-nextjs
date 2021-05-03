import React from 'react';
import PropTypes from 'prop-types';
// import './MovieCard.scss';
import MovieOptions from '../MovieOptions/MovieOptions';
import { MODAL } from '../../types';
import { __dc } from '../../helpers';
import { useRouter } from 'next/router';

const MovieCard: React.FC<any> = props => {
  let genres = '';
  let genresArr = props.movie.genres;
  let router = useRouter();
 
  if (genresArr.length == 1) {
    genres = props.movie.genres[0];
  } else if (genresArr.length == 2) {
    genres = genresArr.join(' & ');
  } else if (genresArr.length > 2) {
    genres = genresArr.join(', ');
  }

  function setActiveMovie() {
    router.push('/?filmID=' + props.movie.id+45);
  }

  function editMovie() {
    props.openModal(MODAL.MOVIE_EDIT, {
      movie: __dc(props.movie),
    });
  }

  function deleteMovie() {
    props.openModal(MODAL.MOVIE_DELETE, {
      title: 'delete movie',
      submitContent: 'Are you sure you want to delete this movie?',
      id: props.movie.id,
    });
  }

  function onImgError(e) {
    e.target.src =
      'https://lh3.googleusercontent.com/proxy/KVnTKIQGqeBWUkoBm1iqqDxfcKuPRIckyGYu2o2r_RyWFAxjZYCPL7kMsHkMFEjNb8QxpALUs-bq31CRsndHiOyWD6FXo64TRHNY9LLSN0mJ1ux9uyG2h3aIrq0';
  }

  return (
    <div className="movie-card" onClick={setActiveMovie}>
      <MovieOptions editMovie={editMovie} deleteMovie={deleteMovie} />
      <img src={props.movie.poster_path} loading="lazy" alt="" />
      <div className="movie-card__desc">
        <div className="movie-card__left">
          <p>{props.movie.title}</p>
          <p>{genres}</p>
        </div>
        <div className="movie-card__year">
          {props.movie.release_date.slice(0, 4)}
        </div>
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  openModal: PropTypes.func,
  movie: PropTypes.object,
};

// MovieCard.whyDidYouRender = true

export default MovieCard;
