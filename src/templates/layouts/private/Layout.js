import React, { Fragment } from "react";

import Header from "./Header";
import Footer from "./Footer";
import { connect } from "react-redux";

const Layout = ({ Component, route,props }) => (
  
  /* old code
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
  */
  <Fragment>
  <div className="">
    <Header />
    <section class={!props.SectionClass?"contentboxcont":props.SectionClass}>
    <Component route={route} />
    </section>
     
      <Footer />
    
  </div>
</Fragment>
);


const mapStateToProps = (state) => {
  return {
    SectionClass: state.layout.sectionClass,
  };
};

export default connect(mapStateToProps, null)(Layout);

