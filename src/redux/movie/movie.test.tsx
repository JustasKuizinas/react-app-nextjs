import reducer from './movie.reducer';
import {
  MOVIE_ADD,
  MOVIE_DELETE,
  MOVIE_EDIT,
  MOVIE_FILTER,
  MOVIE_INIT,
  MOVIE_SORT,
} from './movie.types';
import * as actions from './movie.actions';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
// import fetchMock from 'fetch-mock';
import { API_URL } from '../../types';
const fetchMock = require('fetch-mock-jest');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const DUMMY_MOVIE = {
  id: 54,
  name: 'Avatar',
  genre: 'Fantasy',
  release_date: '2016-02-11',
  active: true
};
const DUMMY_MOVIE_2 = {
  id: 55,
  name: 'Avatar2',
  genre: 'Fantasy',
  release_date: '2018-02-11',
  active: true
};

describe('Movie reducer', () => {
  it('should return the initial state', () => {
    expect(reducer([], { type: '' })).toEqual([]);
  });

  it('should work MOVIE_ADD', () => {
    expect(
      reducer([], {
        type: MOVIE_ADD,
        payload: DUMMY_MOVIE,
      })
    ).toEqual([{ ...DUMMY_MOVIE,  }]);
  });

  it('should work MOVIE_INIT', () => {
    expect(
      reducer([], {
        type: MOVIE_INIT,
        payload: [DUMMY_MOVIE],
      })
    ).toEqual([{ ...DUMMY_MOVIE }]);
  });

  it('should work MOVIE_EDIT', () => {
    expect(
      reducer([DUMMY_MOVIE], {
        type: MOVIE_EDIT,
        payload: { ...DUMMY_MOVIE, name: 'Transformers' },
      })
    ).toEqual([{ ...DUMMY_MOVIE, name: 'Transformers' }]);
  });

  it('should work MOVIE_DELETE', () => {
    expect(
      reducer([DUMMY_MOVIE], {
        type: MOVIE_DELETE,
        payload: DUMMY_MOVIE.id,
      })
    ).toEqual([]);
  });
});

describe('Movie actions sync', () => {
  afterEach(() => {
    fetchMock.mockReset();
  });

  it('should work movieAdd', () => {
    fetchMock.postOnce(API_URL + 'movies', DUMMY_MOVIE);
    const expectedActions = [{ type: MOVIE_ADD, payload: DUMMY_MOVIE }];
    const store = mockStore({ movies: [] });

    return store.dispatch(actions.movieAdd(DUMMY_MOVIE)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should work movieEdit', () => {
    fetchMock.putOnce(API_URL + 'movies', DUMMY_MOVIE);
    const expectedActions = [{ type: MOVIE_EDIT, payload: DUMMY_MOVIE }];
    const store = mockStore({ movies: [DUMMY_MOVIE] });

    return store.dispatch(actions.movieEdit(DUMMY_MOVIE)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should work movieDelete', () => {
    fetchMock.deleteOnce(API_URL + 'movies/'+DUMMY_MOVIE.id, 200);
    const expectedActions = [{ type: MOVIE_DELETE, payload: DUMMY_MOVIE.id }];
    const store = mockStore({ movies: [DUMMY_MOVIE] });

    return store.dispatch(actions.movieDelete(DUMMY_MOVIE.id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('Movie actions sync', () => {
  it('should work movieInit', () => {
    const expectedAction = {
      type: MOVIE_INIT,
      payload: [DUMMY_MOVIE],
    };
    expect(actions.movieInit([DUMMY_MOVIE])).toEqual(expectedAction);
  });

  it('should work movieFilter', () => {
    const expectedAction = {
      type: MOVIE_FILTER,
      payload: { genre: 'Animation', search: '' },
    };
    expect(actions.movieFilter('Animation', '')).toEqual(expectedAction);
  });

  it('should work movieSort', () => {
    const expectedAction = {
      type: MOVIE_SORT,
      payload: 'Date',
    };
    expect(actions.movieSort('Date')).toEqual(expectedAction);
  });

  
});
