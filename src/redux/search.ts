export const SET_SEARCH = 'SET_SEARCH';

export const setSearch = search => ({
  type: SET_SEARCH,
  payload: search,
});

const searchReducer = (state: string = '', action) => {
  switch (action.type) {
    case SET_SEARCH:
      return action.payload;
    default:
      return state; 
  }
};

export default searchReducer;
