import Home from '../views/pages/home';
import Favorites from '../views/pages/favorite';
import Detail from '../views/pages/detail';

const routes = {
  '/': Home,
  '/favorites': Favorites,
  '/detail/:id': Detail,
};

export default routes;
