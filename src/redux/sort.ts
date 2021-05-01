import { __dc } from '../helpers';
import { SORT_BY } from '../types';
export const SET_SORT = 'SET_SORT';

export const setSort = sortBy => ({
  type: SET_SORT,
  payload: sortBy,
});

const sortReducer = (state: string = SORT_BY.DATE, action) => {
  switch (action.type) {
    case SET_SORT:
      return action.payload;
    default:
      return state;
  }
};

export default sortReducer;
