import React from "react";
import { Navbar } from "reactstrap";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from "reactstrap";
import * as Icon from "react-feather";
import DefaultProfileImage from "../../../assets/images/default-profile.png";
import { Link } from "react-router-dom";

/*
const handleNavigation = (e, path) => {
	e.preventDefault()
	history.push(path)
}
*/
const CustomerDropdown = (props) => {
  return (
    <DropdownMenu right>
      <Link to="/customer/profile" className="dropdown-item">
        <Icon.User size={14} className="mr-50" />
        <span className="align-middle">Profile</span>
      </Link>

      {/* <DropdownItem
		  tag="a"
		  href="#"
		  onClick={e => handleNavigation(e, "/embed-code")}
		>
		  <Icon.MessageSquare size={14} className="mr-50" />
		  <span className="align-middle">Embed Code</span>
		</DropdownItem> */}

      <DropdownItem divider />

      <Link to="#" className="dropdown-item" onClick={props.userLogout}>
        <Icon.Power size={14} className="mr-50" />
        <span className="align-middle">Log Out</span>
      </Link>
    </DropdownMenu>
  );
};

const CustomerTopNav = (props) => {
  return (
    <React.Fragment>
      <div className="content-overlay" />
      <div className="header-navbar-shadow" />
      <Navbar className="header-navbar navbar-expand-lg navbar navbar-with-menu navbar-shadow navbar-light fixed-top scrolling navbar">
        <div className="navbar-wrapper">
          <div className="navbar-container content">
            <div
              className="navbar-collapse d-flex justify-content-between align-items-center"
              id="navbar-mobile"
            >
              <div className="bookmark-wrapper"></div>
              <div className="logo d-flex align-items-center">
                <div className="brand-logo mr-50"></div>
                {/* <h2 className="text-primary brand-text mb-0">Vuexy</h2> */}
              </div>

              <ul className="nav navbar-nav navbar-nav-user float-right">
                <UncontrolledDropdown
                  tag="li"
                  className="dropdown-user nav-item"
                >
                  <DropdownToggle
                    tag="a"
                    className="nav-link dropdown-user-link"
                  >
                    <div className="user-nav d-sm-flex d-none">
                      <span className="user-name text-bold-600">
                        Customer Login
                      </span>
                      {/* <span className="user-status">Available</span> */}
                    </div>
                    <span data-tour="user">
                      <img
                        src={DefaultProfileImage}
                        className="round"
                        height="40"
                        width="40"
                        alt="avatar"
                      />
                    </span>
                  </DropdownToggle>
                  <CustomerDropdown {...props} />
                </UncontrolledDropdown>
              </ul>
            </div>
          </div>
        </div>
      </Navbar>
    </React.Fragment>
  );
};

export default CustomerTopNav;
