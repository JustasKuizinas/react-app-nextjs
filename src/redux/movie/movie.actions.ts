import MovieService from '../../services/movie/movie.service';
import { API_URL } from '../../types';
import {
  MOVIE_ADD,
  MOVIE_DELETE,
  MOVIE_EDIT,
  MOVIE_FILTER,
  MOVIE_INIT,
  MOVIE_SORT,
} from './movie.types';


export const movieInit = movies => ({
  type: MOVIE_INIT,
  payload: movies,
});

export const movieFilter = (genre, search = '') => ({
  type: MOVIE_FILTER,
  payload: { genre, search },
});

export const movieSort = sortBy => ({
  type: MOVIE_SORT,
  payload: sortBy,
});


export const movieAdd = movie => dispatch => {
  return MovieService.add(movie).then(movie => {
    dispatch({
      type: MOVIE_ADD,
      payload: movie,
    });
  });
};

export const movieEdit = movie => dispatch => {
  return MovieService.update(movie).then(resp => {
    dispatch({
      type: MOVIE_EDIT,
      payload: movie,
    });
  });
};

export const movieDelete = id => dispatch => {
  return MovieService.delete(id).then(resp => {
    dispatch({
      type: MOVIE_DELETE,
      payload: id,
    });
  });
};

