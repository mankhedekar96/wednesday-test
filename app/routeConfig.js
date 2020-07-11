import NotFound from '@containers/NotFoundPage/Loadable';
// import HomeContainer from '@containers/HomeContainer/Loadable';
import SongsContainer from '@containers/SongsContainer/Loadable';

export const routeConfig = {
  repos: {
    component: SongsContainer,
    route: '/',
    props: {
      maxwidth: 500,
      padding: 20
    },
    exact: true
  },
  notFoundPage: {
    component: NotFound,
    route: '/'
  }
};
