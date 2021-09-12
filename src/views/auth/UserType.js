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
        return (
          <a href="#" class="rd_splashcard rd_splashcardadmin">
            {" "}
          </a>
        );
      case "admin":
        return (
          <a href="#" class="rd_splashcard rd_splashcardadmin">
            {" "}
          </a>
        );
      case "staff":
        return (
          <a href="#" class="rd_splashcard rd_splashcardstaff">
            {" "}
          </a>
        );
      default:
        return (
          <a href="#" class="rd_splashcard rd_splashcardsuperadmin">
            {" "}
          </a>
        );
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
        <div
          className={`rd_carditem ${
            role == userType ? "rd_splashitemselected" : ""
          }`}
          key={index}
          onClick={() => setUserType(role)}
        >
          {getRoleIcon(role)}
        </div>
      );
      {
        /*
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
          */
      }
    });
  }

  let userBusinesses = null;
  if (!isEmpty(businesses) && Object.keys(businesses).length > 1) {
    businesses = Object.keys(businesses).map((key) => [key, businesses[key]]);
    userBusinesses = businesses.map((business, index) => {
      const [businessName, businessId] = business;
      return (
        <div
          className={`rd_carditem rd_carditemsub ${
            businessId == userBusiness ? "rd_splashitemselected" : ""
          }`}
          key={businessId}
        >
          <a
            href="#"
            onClick={() => setUserBusiness(businessId)}
            className={
              businessId == 1
                ? "rd_splashcard rd_splashcardhairsalon"
                : "rd_splashcard rd_splashcardacademy"
            }
          ></a>
        </div>
      );
      {
        /*
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
        */
      }
    });
  } else if (!isEmpty(businesses) && Object.keys(businesses).length === 1) {
    setUserBusiness(businesses[Object.keys(businesses)[0]]);
  }

  return (
    <div class="container">
      <div class="eventdetailsaddbox rd_noshadow">
        <div class="rd_pasevencontth rd_pasevencontth2">
          <h4>Create New Events</h4>
          {userRoles && <div class="rd_eventcardscontainer">{userRoles}</div>}

          {userBusinesses && userType === "admin" && (
            <>
              <h4>Select Business Type</h4>
              <div class="rd_eventcardscontainer">{userBusinesses}</div>
            </>
          )}

          <Col md="12" className="text-right mt-2 mb-2">
            <button
            className="rd_mainbuttonstylelight"
              type="button"
              onClick={onCloseHandler}
            >
              Cancel
            </button>
            <button
              className="rd_mainbuttonstyleorange"
              type="button"
              onClick={onContinueHandler}
            >
              Continue
            </button>
          </Col>
        </div>
      </div>
    </div>
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
