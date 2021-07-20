import Home from './Home';
import Grid from './Grid';
import { fetchRepos } from './actions';
const routes = [
  {
    path: '/',
    exact: true,
    component: Home,
    fetchInitialData: ({ path, reduxDispatch }) => {
      return reduxDispatch(fetchRepos('all'));
    },
  },
  {
    path: '/popular/:id',
    component: Grid,
    fetchInitialData: ({ path, reduxDispatch }) => {
      let lang = path.split('/').pop();
      return reduxDispatch(fetchRepos(lang));
    },
  },
];

export default routes;
