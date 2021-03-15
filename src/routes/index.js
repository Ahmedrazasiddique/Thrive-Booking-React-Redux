import PublicLayout from "../templates/layouts/public/Layout";
import PrivateLayout from "../templates/layouts/private/Layout";
import privateRoutes from "./private";
import publicRoutes from "./public";
import sessionRoutes from "./session";
import { ROUTE_TYPES } from "./routeTypes";

const routesTemplate = [
  {
    routes: publicRoutes,
    template: PublicLayout,
    type: ROUTE_TYPES.public,
  },
  {
    routes: privateRoutes,
    template: PrivateLayout,
    type: ROUTE_TYPES.private,
  },
  {
    routes: sessionRoutes,
    template: PublicLayout,
    type: ROUTE_TYPES.session,
  },
];

export default routesTemplate;
