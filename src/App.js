import React from "react";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { logoutUser, setCurrentUser } from "./actions/authActions";
import Routes from "./routes/Routes";
import "./components/RippleButton";
import { ToastContainer, toast } from 'react-toastify';
import "prismjs/themes/prism-tomorrow.css";

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000;

  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile
    // Redirect to login
    window.location.href = "/admin/login";
  }
}

const App = () => {
  return (
    <Provider store={store}>
      <ToastContainer />
      <Routes />
    </Provider>
  );
};

export default App;
