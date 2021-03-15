import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/authActions";
import { withRouter } from "react-router-dom";

import { USER_TYPES } from "../../../routes/private";

//const AdminNav = React.lazy(() => import("./AdminNav"));
//const SuperAdminNav = React.lazy(() => import("./SuperAdminNav"));
//const StaffNav = React.lazy(() => import("./StaffNav"));
//const CustomerNav = React.lazy(() => import("./CustomerNav"));

import AdminNav from "./AdminNav";
import SuperAdminNav from "./SuperAdminNav";
import StaffNav from "./StaffNav";
import CustomerNav from "./CustomerNav";
const Nav = (props) => {
  /**
   * logout current logged in user
   * @returns void
   */
  const onLogout = () => {
    props.logoutUser();
  };

  if (localStorage.userType) {
    switch (localStorage.userType) {
      case USER_TYPES.admin:
        return <AdminNav userLogout={onLogout} />;
      case USER_TYPES.superAdmin:
        return <SuperAdminNav  />;
      case USER_TYPES.staff:
        return <StaffNav userLogout={onLogout} />;
      case USER_TYPES.customer:
        return <CustomerNav userLogout={onLogout} />;
      default:
        return null;
    }
  }

  // to be removed
  return (<AdminNav userLogout={onLogout} />);
};

Nav.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(withRouter(Nav));
