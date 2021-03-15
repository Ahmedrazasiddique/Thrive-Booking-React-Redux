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
import PayLocal from "./PaymentMethod/PayLocal"
import Paypal from "./PaymentMethod/Paypal"

import "../../../../../frontend/src/assets/scss/pages/users.scss"
class Payment extends React.Component {
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
      <Row>
        <Col sm="12">
          <Card>
            <CardBody className="pt-2">
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === "1"
                    })}
                    onClick={() => {
                      this.toggle("1")
                    }}
                  >
                    <User size={16} />
                    <span className="align-middle ml-50">Pay Local</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === "2"
                    })}
                    onClick={() => {
                      this.toggle("2")
                    }}
                  >
                    <Info size={16} />
                    <span className="align-middle ml-50">Paypal</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === "3"
                    })}
                    onClick={() => {
                      this.toggle("3")
                    }}
                  >
                    <Share size={16} />
                    <span className="align-middle ml-50">Stripe</span>
                  </NavLink>
                </NavItem>
              </Nav>
              
              <TabContent activeTab={this.state.activeTab}>
            
               <TabPane tabId="1">
             <PayLocal></PayLocal>
                </TabPane>
                <TabPane tabId="2">
               <Paypal></Paypal>
                </TabPane>
                <TabPane tabId="3">
              
                </TabPane>
              </TabContent>
            </CardBody>
          </Card>
        </Col>
      </Row>
    )
  }
}
export default Payment
