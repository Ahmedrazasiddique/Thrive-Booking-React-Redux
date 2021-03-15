/*
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
*/
import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
} from "reactstrap";
import LoginImage from "../../assets/images/login.png";
import "../../assets/scss/pages/authentication.scss";
//import "../../assets/scss/style.scss";
import { Mail, Lock, Check } from "react-feather";
import Checkbox from "../../components/Checkbox";
import { Link } from "react-router-dom";
import { history } from "../../history";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import isEmpty from "../../validation/is-empty";
import {
  getUserDashboardLink,
  getUserRoles,
  getUserBusinesses,
} from "../../utils/authHelper";
import CryptoJS from "crypto-js";
import { USER_TYPE_PREFIX } from "../../utils/prefixes";
import { USER_TYPES } from "../../routes/private";
import { loginUser } from "../../actions/authActions";
import PropTypes from "prop-types";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (props.auth.isAuthenticated) {
      // based on usertype redirect to user specific dashboard
      if (localStorage.userType) {
        props.history.push(
          getUserDashboardLink(localStorage.getItem("userType"))
        );
      } else {
        const userRoles = getUserRoles();
        const userBusinesses = getUserBusinesses();

        // Getting business ids
        let businessIds = [];
        if (!isEmpty(userBusinesses)) {
          for (let userBusiness in userBusinesses) {
            businessIds.push(userBusinesses[userBusiness]);
          }
        }

        if (
          userRoles.length === 1 &&
          (businessIds.length === 0 || businessIds.length === 1)
        ) {
          localStorage.setItem(
            "userType",
            CryptoJS.SHA256(USER_TYPE_PREFIX + userRoles.pop())
          );
          // for admin user save business id in local storage
          if (
            localStorage.userType === USER_TYPES.admin &&
            businessIds.length === 1
          ) {
            localStorage.setItem("businessId", businessIds.pop());
          }
          props.history.push(
            getUserDashboardLink(localStorage.getItem("userType"))
          );
        } else {
          props.history.push("/admin/user-type");
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.auth.isAuthenticated]);

  /**
   * On Login form submit handler
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      email,
      password,
    };
    props.loginUser(data);
  };

  return (
    <Row className="m-0 justify-content-center align-items-center main-login-row">
      <Col
        sm="8"
        xl="7"
        lg="10"
        md="8"
        className="d-flex justify-content-center"
      >
        <Card className="bg-authentication login-card rounded-0 mb-0 w-100">
          <Row className="m-0">
            <Col
              lg="6"
              className="d-lg-block d-none text-center align-self-center px-1 py-0"
            >
              <img src={LoginImage} alt="loginImg" />
            </Col>
            <Col lg="6" md="12" className="p-0">
              <Card className="rounded-0 mb-0 px-2 login-tabs-container">
                <CardHeader className="pb-1">
                  <CardTitle>
                    <h4 className="mb-0">Login</h4>
                  </CardTitle>
                </CardHeader>
                <p className="px-2 auth-title">
                  Welcome back, please login to your account.
                </p>

                <CardBody className="pt-1">
                  <Form action="/user-type" onSubmit={handleSubmit}>
                    <FormGroup className="form-label-group position-relative has-icon-left">
                      <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <div className="form-control-position">
                        <Mail size={15} />
                      </div>
                      <Label>Email</Label>
                    </FormGroup>
                    <FormGroup className="form-label-group position-relative has-icon-left">
                      <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <div className="form-control-position">
                        <Lock size={15} />
                      </div>
                      <Label>Password</Label>
                    </FormGroup>
                    <FormGroup className="d-flex justify-content-between align-items-center">
                      <Checkbox
                        color="success"
                        icon={<Check className="vx-icon" size={16} />}
                        label="Remember me"
                        defaultChecked={false}
                        onChange=""
                      />
                      <div className="float-right">
                        <Link to="/pages/forgot-password">
                          Forgot Password?
                        </Link>
                      </div>
                    </FormGroup>
                    <div className="d-flex justify-content-between">
                      <Button.Ripple
                        color="success"
                        outline
                        onClick={() => {
                          history.push("/pages/register");
                        }}
                      >
                        Register
                      </Button.Ripple>
                      <Button.Ripple color="success" type="submit">
                        Login
                      </Button.Ripple>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(withRouter(Login));
