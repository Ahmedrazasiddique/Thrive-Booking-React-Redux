import Bootstrap from "../views/site/bootstrap/Bootstrap";
import Booking from "../views/site/booking/Booking";
import LandingPage from "../views/site/LandingPage";
import Login from "../views/site/Login";
import Signup from "../views/site/Signup";
import Payments from "../views/site/Payments";
import ProfileStepOne from "../views/site/ProfileSteps/Components/ProfileStepOne";
import ProfileStepTwo from "../views/site/ProfileSteps/Components/ProfileStepTwo";
import ProfileStepThree from "../views/site/ProfileSteps/Components/ProfileStepThree";
import ProfileStepFour from "../views/site/ProfileSteps/Components/ProfileStepFour";
import ConfirmEmail from "../views/site/ConfrimEmail";
import WelcomeToMeetOcto from "../views/site/WelcomeToMeetOcto";
import DoneAndWelcome from "../views/site/DoneAndWelcome";
import ThanksForPayment from "../views/site/ThanksForPayment";
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
    component: LandingPage,
    exact: true,
    path: "/landingPage",
  },
  {
    component: Login,
    exact: true,
    path: "/login",
  },
  {
    component: Signup,
    exact: true,
    path: "/signup",
  },
  {
    component: Payments,
    exact: true,
    path: "/signup/payment",
  },
  {
    component: ProfileStepOne,
    exact: true,
    path: "/signup/profile-step-one",
  },
  {
    component: ProfileStepTwo,
    exact: true,
    path: "/signup/profile-step-two/:id",
  },
  {
    component: ProfileStepThree,
    exact: true,
    path: "/signup/profile-step-three",
  },
  {
    component: ProfileStepFour,
    exact: true,
    path: "/signup/profile-step-four",
  },
  {
    component: ConfirmEmail,
    exact: true,
    path: "/confirmEmail",
  },
  {
    component: WelcomeToMeetOcto,
    exact: true,
    path: "/welcomeToMeetOcto",
  },
  {
    component: DoneAndWelcome,
    exact: true,
    path: "/doneAndWelcome",
  },
  {
    component: ThanksForPayment,
    exact: true,
    path: "/signup/thanksForPayment",
  },
  {
    component: MainPage,
    exact: true,
    path: "/event-booking",
  },
];

export default routes;
