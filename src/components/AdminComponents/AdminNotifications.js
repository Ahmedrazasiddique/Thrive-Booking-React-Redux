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
import DefaultProfileImage from "../../assets/images/default-profile.png";
import { Link } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";

const AdminNotifications = (props) => {
    return (
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
    )
                    }
                    export default AdminNotifications;