import Bootstrap from "../views/site/bootstrap/Bootstrap";
import Booking from "../views/site/booking/Booking";
import MainPage from "../views/eventbooking/MainPage";

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
  {
    component: MainPage,
    exact: true,
    path: "/event-booking",
  },
];

export default routes;
