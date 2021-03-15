import React, { Fragment, useState, useEffect } from "react";
import {
  Row,
  Col,
  Container,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Button,
} from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as Icon from "react-feather";
import classnames from "classnames";
import { useTranslation } from "react-i18next";

import { logoutUser } from "../../actions/authActions";
import {
  getUserDashboardLink,
  getUserRoles,
  getUserBusinesses,
  encryptUserRole,
} from "../../utils/authHelper";
import isEmpty from "../../validation/is-empty";

//import logo from "../../assets/images/thrive2a.jpg";

const UserType = (props) => {
  const { t } = useTranslation();

  const [userType, setUserType] = useState(null);
  const [userBusiness, setUserBusiness] = useState(null);

  useEffect(() => {
    if (props.auth.isAuthenticated && localStorage.userType) {
      props.history.push(getUserDashboardLink(localStorage.userType));
    }

    if (!props.auth.isAuthenticated) {
      props.history.push("/admin/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.auth.isAuthenticated]);

  /**
   * Get User Role Icon
   * @param String role
   * @returns String
   */
  const getRoleIcon = (role) => {
    switch (role) {
      case "customer":
        return <Icon.Users className="success" size={100} />;
      case "admin":
        return <Icon.Settings className="success" size={100} />;
      case "staff":
        return <Icon.Shield className="success" size={100} />;
      default:
        return <Icon.Users className="success" size={100} />;
    }
  };

  /**
   * on close button handler
   */
  const onCloseHandler = () => {
    props.logoutUser();
    props.history.push("/admin/login");
  };

  /**
   * on continue button handler
   */
  const onContinueHandler = () => {
    if (userType !== "admin") {
      localStorage.setItem("userType", encryptUserRole(userType));
      props.history.push(getUserDashboardLink(localStorage.userType));
    } else {
      if (userBusiness !== null) {
        localStorage.setItem("userType", encryptUserRole(userType));
        localStorage.setItem("businessId", userBusiness);
        props.history.push(getUserDashboardLink(localStorage.userType));
      }
    }
  };

  const roles = getUserRoles();
  let businesses = getUserBusinesses();

  let userRoles = null;
  if (!isEmpty(roles) && roles.length > 1) {
    userRoles = roles.map((role, index) => {
      return (
        <Col xl="4" lg="4" sm="6" key={index} onClick={() => setUserType(role)}>
          <Card
            className={classnames("fonticon-container", {
              active: role === userType,
            })}
          >
            <CardHeader className="mx-auto">
              <CardTitle>
                <div className="fonticon-wrap">{getRoleIcon(role)}</div>
              </CardTitle>
            </CardHeader>
            <CardBody className="text-center">
              <h4>{role.charAt(0).toUpperCase() + role.slice(1)}</h4>
            </CardBody>
          </Card>
        </Col>
      );
    });
  }

  let userBusinesses = null;
  if (!isEmpty(businesses) && Object.keys(businesses).length > 1) {
    businesses = Object.keys(businesses).map((key) => [key, businesses[key]]);
    userBusinesses = businesses.map((business, index) => {
      const [businessName, businessId] = business;
      return (
        <Col
          xl="3"
          lg="3"
          sm="6"
          key={index}
          onClick={() => setUserBusiness(businessId)}
        >
          <Card className="fonticon-container">
            <CardHeader className="mx-auto">
              <CardTitle>
                <Icon.Scissors className="success" size={100} />
              </CardTitle>
            </CardHeader>
            <CardBody className="text-center">
              <h4>
                {businessName.charAt(0).toUpperCase() + businessName.slice(1)}
              </h4>
            </CardBody>
          </Card>
        </Col>
      );
    });
  } else if (!isEmpty(businesses) && Object.keys(businesses).length === 1) {
    setUserBusiness(businesses[Object.keys(businesses)[0]]);
  }

  return (
    <Container>
      {userRoles && (
        <Col lg="12" md="12" className="mt-1">
          <Row>{userRoles}</Row>
        </Col>
      )}

      {userBusinesses && userType === "admin" && (
        <Fragment>
          <hr />
          <Col md="12" className="text-center mt-2">
            <h2>Select Business Type</h2>
          </Col>
          <Col lg="12" md="12" className="mt-2">
            <Row>{userBusinesses}</Row>
          </Col>
        </Fragment>
      )}

      <Col md="12" className="text-right mt-2 mb-2">
        <Button.Ripple
          color="dark"
          className="mr-1"
          size="lg"
          onClick={onCloseHandler}
        >
          Cancel
        </Button.Ripple>
        <Button.Ripple color="success" size="lg" onClick={onContinueHandler}>
          Continue
        </Button.Ripple>
      </Col>
    </Container>
  );
};

UserType.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(withRouter(UserType));
