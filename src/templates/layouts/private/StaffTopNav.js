import React  ,{useState,useEffect}from "react";
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
import logo from "../../../assets/images/logo-new.svg";
/*
const handleNavigation = (e, path) => {
	e.preventDefault()
	history.push(path)
}
*/
const StaffDropdown = (props) => {
  
  return (
    <div className="rd_menuthingcont">
      <Link to="/staff/profile" className="dropdown-item">
        <Icon.User size={14} className="mr-50" />
        <span className="align-middle">Profile</span>
      </Link>
      <Link to="/staff/calendar" className="dropdown-item">
        <Icon.User size={14} className="mr-50" />
        <span className="align-middle">Calendar </span>
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
    </div>
  );
};

const StaffTopNav = (props) => {
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
            
            <StaffDropdown {...props} />:<></>}
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
   
   );
  };
    {/*
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
                        Staff Login
                      </span>
                   
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
                  <StaffDropdown {...props} />
                </UncontrolledDropdown>
              </ul>
            </div>
          </div>
        </div>
      </Navbar>
    </React.Fragment>
    */}
   

export default StaffTopNav;
