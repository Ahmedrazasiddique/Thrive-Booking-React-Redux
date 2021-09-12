import React from "react";

import { isPrivate, isSession } from "./routeTypes";
import { Redirect } from "react-router-dom";
import PublicLayout from "../templates/layouts/public/Layout";
import ForbiddenPage from "../views/errors/ForbiddenPage";

import PropTypes from "prop-types";
import { connect } from "react-redux";

const Auth = (props) => {
  const { appRoute, Template, route, type } = props;

  if (isPrivate(type) && !props.auth.isAuthenticated) {
    //return <PublicLayout Component={ForbiddenPage} route={route} />;
    return <Redirect to="/admin/login" />;
  }

  if (isPrivate(type) && props.auth.isAuthenticated) {
    if (localStorage.userType && appRoute.userType !== localStorage.userType) {
      return <PublicLayout Component={ForbiddenPage} route={route} />;
    }
  }

  if (isSession(type) && props.auth.isAuthenticated) {
    //return <Redirect to='/admin/login' />;
    return <PublicLayout Component={appRoute.component} route={route} />;
  }

  const Layout = appRoute.template ? appRoute.template : Template;

  return <Layout Component={appRoute.component} route={route} props={props} />;
};

Auth.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  SectionClass: state.layout.sectionClass,
});

export default connect(mapStateToProps, {})(Auth);
