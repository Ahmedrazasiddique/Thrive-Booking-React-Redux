import React from "react"
import {
  Card,
  CardBody,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from "reactstrap"
import classnames from "classnames"
import { User, Info, Share } from "react-feather"
import ProfileInfo from "./ProfileInfo"
import CardInfo from "./CardInfo"
import ProfileChangePassword from "./ChangePassword"

import "../../../../../frontend/src/assets/scss/pages/users.scss"
class Profile extends React.Component {
  state = {
    activeTab: "1"
  }

  toggle = tab => {
    this.setState({
      activeTab: tab
    })
  }
  render() {
    return (
      <div class="eventdetailsaddbox rd_noshadow">
          <div class="boxheader rd_floatingheaderthig">
            <div class="rd_inputselectheader">
                <div class="rd_selectheaderrdt2 rd_selectheaderrdt2profile">
                    <button  className={classnames({
                      active: this.state.activeTab === "1"
                    })}
                    onClick={() => {
                      this.toggle("1")
                    }}>Profile</button>
                    <button  className={classnames({
                      active: this.state.activeTab === "2"
                    })}
                    onClick={() => {
                      this.toggle("2")
                    }}>Payment Info</button>
                    <button  className={classnames({
                      active: this.state.activeTab === "3"
                    })}
                    onClick={() => {
                      this.toggle("3")
                    }}>Change Password</button>
                  </div>

            </div>
          </div>
             
              
              <TabContent activeTab={this.state.activeTab}>
             
               <TabPane tabId="1">
               <ProfileInfo/>
                </TabPane>
                <TabPane tabId="2">
               <CardInfo/>
                </TabPane>
                <TabPane tabId="3">
               <ProfileChangePassword/>
                </TabPane>
              </TabContent>
           
     </div>
    )
  }
}
export default Profile
