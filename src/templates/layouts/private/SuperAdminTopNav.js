import React from "react";
import { Navbar } from "reactstrap";

import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  Badge,
  Media,
} from "reactstrap";
import {
  Bell,
  PlusSquare,
  DownloadCloud,
  AlertTriangle,
  CheckCircle,
  File,
} from "react-feather";
import * as Icon from "react-feather";
import DefaultProfileImage from "../../../assets/images/default-profile.png";
import { Link } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";

/*
const handleNavigation = (e, path) => {
	e.preventDefault()
	history.push(path)
}
*/
const SuperAdminDropDown = (props) => {
  return (
    <DropdownMenu right>
      <Link to="/super-admin/profile" className="dropdown-item">
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

const SuperAdminTopNav = (props) => {
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
                  className="dropdown-notification nav-item"
                  tag="li"
                >
                  <DropdownToggle
                    tag="a"
                    data-toggle="dropdown"
                    //  aria-expanded={this.state.dropdownNotification}
                    className="nav-link nav-link-label"
                  >
                    <Bell size={21} />
                    <Badge pill color="primary" className="badge-up">
                      {" "}
                      5{" "}
                    </Badge>
                  </DropdownToggle>
                  <DropdownMenu tag="ul" right className="dropdown-menu-media">
                    <li className="dropdown-menu-header">
                      <div className="dropdown-header mt-0">
                        <h3 className="text-white">5 New</h3>
                        <span className="notification-title">
                          App Notifications
                        </span>
                      </div>
                    </li>
                    <PerfectScrollbar
                      className="media-list overflow-hidden position-relative"
                      options={{
                        wheelPropagation: false,
                      }}
                    >
                      <div className="d-flex justify-content-between">
                        <Media className="d-flex align-items-start">
                          <Media left href="#">
                            <PlusSquare
                              className="font-medium-5 primary"
                              size={21}
                            />
                          </Media>
                          <Media body>
                            <Media
                              heading
                              className="primary media-heading"
                              tag="h6"
                            >
                              You have new order!
                            </Media>
                            <small className="notification-text">
                              Are your going to meet me tonight?
                            </small>
                          </Media>
                          <small>
                            <time
                              className="media-meta"
                              dateTime="2015-06-11T18:29:20+08:00"
                            >
                              9 hours ago
                            </time>
                          </small>
                        </Media>
                      </div>
                      <div className="d-flex justify-content-between">
                        <Media className="d-flex align-items-start">
                          <Media left href="#">
                            <DownloadCloud
                              className="font-medium-5 success"
                              size={21}
                            />
                          </Media>
                          <Media body>
                            <Media
                              heading
                              className="success media-heading"
                              tag="h6"
                            >
                              99% Server load
                            </Media>
                            <small className="notification-text">
                              You got new order of goods?
                            </small>
                          </Media>
                          <small>
                            <time
                              className="media-meta"
                              dateTime="2015-06-11T18:29:20+08:00"
                            >
                              5 hours ago
                            </time>
                          </small>
                        </Media>
                      </div>
                      <div className="d-flex justify-content-between">
                        <Media className="d-flex align-items-start">
                          <Media left href="#">
                            <AlertTriangle
                              className="font-medium-5 danger"
                              size={21}
                            />
                          </Media>
                          <Media body>
                            <Media
                              heading
                              className="danger media-heading"
                              tag="h6"
                            >
                              Warning Notification
                            </Media>
                            <small className="notification-text">
                              Server has used 99% of CPU
                            </small>
                          </Media>
                          <small>
                            <time
                              className="media-meta"
                              dateTime="2015-06-11T18:29:20+08:00"
                            >
                              Today
                            </time>
                          </small>
                        </Media>
                      </div>
                      <div className="d-flex justify-content-between">
                        <Media className="d-flex align-items-start">
                          <Media left href="#">
                            <CheckCircle
                              className="font-medium-5 info"
                              size={21}
                            />
                          </Media>
                          <Media body>
                            <Media
                              heading
                              className="info media-heading"
                              tag="h6"
                            >
                              Complete the task
                            </Media>
                            <small className="notification-text">
                              One of your task is pending.
                            </small>
                          </Media>
                          <small>
                            <time
                              className="media-meta"
                              dateTime="2015-06-11T18:29:20+08:00"
                            >
                              Last week
                            </time>
                          </small>
                        </Media>
                      </div>
                      <div className="d-flex justify-content-between">
                        <Media className="d-flex align-items-start">
                          <Media left href="#">
                            <File className="font-medium-5 warning" size={21} />
                          </Media>
                          <Media body>
                            <Media
                              heading
                              className="warning media-heading"
                              tag="h6"
                            >
                              Generate monthly report
                            </Media>
                            <small className="notification-text">
                              Reminder to generate monthly report
                            </small>
                          </Media>
                          <small>
                            <time
                              className="media-meta"
                              dateTime="2015-06-11T18:29:20+08:00"
                            >
                              Last month
                            </time>
                          </small>
                        </Media>
                      </div>
                      <div className="d-flex justify-content-between">
                        <Media className="d-flex align-items-start">
                          <Media left href="#">
                            <File className="font-medium-5 warning" size={21} />
                          </Media>
                          <Media body>
                            <Media
                              heading
                              className="warning media-heading"
                              tag="h6"
                            >
                              Generate monthly report
                            </Media>
                            <small className="notification-text">
                              Reminder to generate monthly report
                            </small>
                          </Media>
                          <small>
                            <time
                              className="media-meta"
                              dateTime="2015-06-11T18:29:20+08:00"
                            >
                              Last month
                            </time>
                          </small>
                        </Media>
                      </div>
                    </PerfectScrollbar>
                    <li className="dropdown-menu-footer">
                      <DropdownItem tag="a" className="p-1 text-center">
                        {" "}
                        Read all notifications{" "}
                      </DropdownItem>
                    </li>
                  </DropdownMenu>
                </UncontrolledDropdown>

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
                        Super Admin
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
                  <SuperAdminDropDown {...props} />
                </UncontrolledDropdown>
              </ul>
            </div>
          </div>
        </div>
      </Navbar>
    </React.Fragment>
  );
};

export default SuperAdminTopNav;
