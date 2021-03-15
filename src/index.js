import "react-app-polyfill/ie11"; // For IE 11 support
import "react-app-polyfill/stable";

import "bootstrap/dist/css/bootstrap.css";

import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import "./i18n";
import * as serviceWorker from "./serviceWorker";
import Spinner from "./components/Spinner";

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<Spinner />}>
      <App />
    </Suspense>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
