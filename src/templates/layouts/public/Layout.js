import React, { Fragment } from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ Component, route }) => (
  <Fragment>
      <Header />
      <Component route={route} />
      <Footer />
  </Fragment>
);

export default Layout;