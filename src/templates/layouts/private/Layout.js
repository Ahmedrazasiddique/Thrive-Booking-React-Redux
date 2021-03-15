import React, { Fragment } from "react";

import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ Component, route }) => (
  <Fragment>
    <div className="wrapper horizontal-layout theme-primary navbar-floating">
      <Header />
      <div className="app-content content">
        <div className="content-wrapper">
          <Component route={route} />
        </div>
        <Footer />
      </div>
    </div>
  </Fragment>
);

export default Layout;
