import LayoutPrivate from '../components/layouts/LayoutPrivate';
import LayoutPublic from '../components/layouts/LayoutPublic';
import privateRoutes from './private';
import publicRoutes from './public';

const routesTemplate = [
  {
    routes: publicRoutes,
    template: LayoutPublic,
  },
  {
    routes: privateRoutes,
    template: LayoutPrivate,
  },
];

export default routesTemplate;
