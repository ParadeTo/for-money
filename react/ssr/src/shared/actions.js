import { fetchPopularRepos } from './api';

export function fetchRepos(language) {
  return function (dispatch) {
    dispatch({ type: 'start' });
    return fetchPopularRepos(language).then(items => {
      return dispatch({
        type: 'success',
        data: items,
      });
    });
  };
}
