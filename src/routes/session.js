import Login from '../views/auth/Login';
import UserType from '../views/auth/UserType';

const routes = [
  {
    component: Login,
    exact: true,
    path: '/admin/login',
  },
  {
    component: Login,
    exact: true,
    path: '/admin/',
  },
  {
    component: UserType,
    exact: true,
    path: '/admin/user-type'
  }
];

export default routes;