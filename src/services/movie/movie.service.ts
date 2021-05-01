import { __dc } from '../../helpers';
import { API_URL } from '../../types';

let headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export default class MovieService {
  static getAll(limit = 10) {
    return fetch(API_URL + 'movies?limit=' + limit, {
      headers,
    }).then(function (res) {
      return res.json().then(res => res.data);
    });
  }

  static add(movie) {
    return fetch(API_URL + 'movies', {
      headers,
      method: 'POST',
      body: JSON.stringify(movie),
    }).then(function (res) {
      return res.json();
    });
  }

  static update(movie) {
    movie = __dc(movie);
    return fetch(API_URL + 'movies', {
      headers,
      method: 'PUT',
      body: JSON.stringify(movie),
    });
  }

  static delete(id) {
    return fetch(API_URL + 'movies/' + id, {
      headers,
      method: 'DELETE',
    });
  }
}
