import React ,{useState,useEffect} from "react";
import { Navbar } from "reactstrap";
import {
  DropdownItem,
  DropdownMenu,
} from "reactstrap";
import * as Icon from "react-feather";
import DefaultProfileImage from "../../../assets/images/default-profile.png";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo-new.svg";
import AdminNotifications from "../../../components/AdminComponents/AdminNotifications"

const UserDropdown = (props) => {
  return (
    <div className="rd_menuthingcont" >
      <Link to="/admin/profile" className="dropdown-item">
        <Icon.User size={14} className="mr-50" />
        <span className="align-middle">Profile</span>
      </Link>
      <Link to="/admin/manage-sunscription" className="dropdown-item">
        <Icon.Mail size={14} className="mr-50" />
        <span className="align-middle">Subscription</span>
      </Link>

      <Link to="/admin/settings/company" className="dropdown-item">
        <Icon.Settings size={14} className="mr-50" />
        <span className="align-middle">Setting</span>
      </Link>

      <Link to="/admin/embed-code" className="dropdown-item">
        <Icon.MessageSquare size={14} className="mr-50" />
        <span className="align-middle">Embed Code</span>
      </Link>
      <Link to="/admin/settings/admin-refferal" className="dropdown-item">
        <Icon.MessageSquare size={14} className="mr-50" />
        <span className="align-middle">Admin Referral</span>
      </Link>
      <DropdownItem divider />

      <Link to="#" className="dropdown-item" onClick={props.userLogout}>
        <Icon.Power size={14} className="mr-50" />
        <span className="align-middle">Log Out</span>
      </Link>
    </div>
  );
};

const AdminTopNav = (props) => {
  
  const [toggleDD, setToggleDD] = useState(false);
  
  const toogleDropDown = (event) => {
    
    if(toggleDD){
    setToggleDD(false)
    }
    else{
    setToggleDD(true)
    }
  }
  useEffect(() => {
    
  },[toggleDD]);
  return (
   /* old code
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
                <img src={logo} alt="logo" />
              
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
                      <span className="user-name text-bold-600">John Doe</span>
                    
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
                  <UserDropdown {...props} />
                </UncontrolledDropdown>
              </ul>
            </div>
          </div>
        </div>
      </Navbar>

    </React.Fragment>
    old code */
<header class="rd_headerthing">
        <div class="topheadertext">
          Your <span>Free</span> trial ends in 10 days <a href="#">Upgrade now</a>
        </div>
        <div class="headercont">
          <div class="logocont">
            <a href="#">
              <img src={logo}  alt="MeetOcto Logo" />
            </a>
          </div>
  
          <div class="notificationtabmen">
            <div class="rd_flexrow">
              <div class="rd_flexrowitem dispnonemobile">
                <div class="buttonnotgcont">
                  <button class="rd_iconthing rd_settingico"><span>Quick setup</span></button>
                </div>
              </div>
              <div class="rd_flexrowitem dispnonemobile">
                <div class="buttonnotgcont">
                  <button class="rd_iconthing rd_supproticonbtn"><span>Support</span></button>
                </div>
              </div>
              <div class="rd_flexrowitem dispnonemobile">
                <div class="buttonnotgcont">
                  <button class="rd_iconthing rd_requesticonthtnb"><span>Request</span></button>
                </div>
              </div>
              <div class="rd_flexrowitem dispnonemobile">
                <div class="buttonnotgcont">
                  <button class="rd_iconthing notbtnnav notifiexist"><span>Notification</span></button>
                </div>
              </div>
              <div class="rd_flexrowitem dispnonemobile">
                <div class="buttonnotgcont">
                  <button class="rd_addneewnottopba "><span>Create new</span></button>
                </div>
              </div>
              <div class="rd_flexrowitem dispnonemobile">
                <div class="menumobileham">
                  <button class="humbergermenu"></button>
                </div>
                <div class="accountdiccon">
                  <div class="imageaccountnav">
                    <img src="assets/images/Oval.png" alt="" />
                  </div>
                  <div class="accountnamenavbar" onClick={toogleDropDown}>
                    <p>
                      <strong> Buff Brown </strong>
                    </p>
  
                    <button class="detaiaccountmo">Sign me out</button>
                  </div>
                  {toggleDD?
                
                <UserDropdown {...props} />:<></>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    
  );
};

export default AdminTopNav;
