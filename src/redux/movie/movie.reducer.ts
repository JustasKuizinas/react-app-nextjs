import { Action } from 'redux';
import { RootState } from '..';
import { __dc } from '../../helpers';
import { SORT_BY } from '../../types';
import {
  MOVIE_ADD,
  MOVIE_DELETE,
  MOVIE_EDIT,
  MOVIE_FILTER,
  MOVIE_INIT,
  MOVIE_SORT,
} from './movie.types';

const movieReducer = (state: any = [], action) => {
  switch (action.type) {
    case MOVIE_ADD:
      action.payload.active = true;
      return __dc([...state, action.payload]);

    case MOVIE_INIT:
      action.payload.forEach(movie => (movie.active = true));
      return [...action.payload];

    case MOVIE_EDIT:
      let i = state.findIndex(movie => movie.id == action.payload.id);
      state[i] = {...state[i],...action.payload};
      return __dc(state);

    case MOVIE_DELETE:
      return __dc(state.filter(movie => movie.id != action.payload));

    // case MOVIE_FILTER:
    //   let { genre, search } = action.payload;
    //   state.forEach(movie => {
    //     movie.active = false;
    //     if (search) {
    //       if (movie.title.toLowerCase().indexOf(search.toLowerCase()) >= 0) {
    //         movie.active = true;
    //       }
    //     } else if (genre) {
    //       if (genre == 'All' || movie.genres.includes(genre)) {
    //         movie.active = true;
    //       }
    //     } else {
    //       movie.active = true;
    //     }
    //   });
    //   return __dc(state);

    // case MOVIE_SORT:
    //   let sortBy = action.payload;
    //   if (sortBy == SORT_BY.DATE) {
    //     state.sort((a, b) => {
    //       return +new Date(b.release_date) - +new Date(a.release_date);
    //     });
    //   } else if (sortBy == SORT_BY.TITLE) {
    //     state.sort((a, b) => {
    //       return b.title > a.title ? -1 : 1;
    //     });
    //   }
    //   return __dc(state);

    default:
      return state;
  }
};

export default movieReducer;
