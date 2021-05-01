import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import movieReducer from './movie/movie.reducer';
import thunk from 'redux-thunk';
import sortReducer from './sort';
import genreReducer from './genre';
import searchReducer from './search';
import { useMemo } from 'react';
import { composeWithDevTools } from 'redux-devtools-extension';

let store;

const allReducers = combineReducers({
  movies: movieReducer,
  sort: sortReducer,
  genre: genreReducer,
  search: searchReducer,
});
export type RootState = ReturnType<typeof allReducers>;

function initStore(preloadedState) {
  return createStore(
    allReducers,
    preloadedState,
    composeWithDevTools(applyMiddleware(thunk))
  );
}

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
