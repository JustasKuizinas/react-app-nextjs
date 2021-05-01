import { __dc } from '../helpers';
import { MOVIE_GENRES, SORT_BY } from '../types';
export const SET_GENRE = 'SET_GENRE';

export const setGenre = sortBy => ({
  type: SET_GENRE,
  payload: sortBy,
});

const genreReducer = (state: string = MOVIE_GENRES.ALL, action) => {
  switch (action.type) {
    case SET_GENRE:
      return action.payload;
    default:
      return state;
  }
};

export default genreReducer;
