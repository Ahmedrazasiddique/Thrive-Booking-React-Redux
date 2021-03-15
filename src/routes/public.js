import Bootstrap from "../views/site/bootstrap/Bootstrap";
import Booking from "../views/site/booking/Booking";

const routes = [
  {
    component: Bootstrap,
    exact: true,
    path: "/",
  },
  {
    component: Booking,
    exact: true,
    path: "/booking/:slug",
  },
];

export default routes;
