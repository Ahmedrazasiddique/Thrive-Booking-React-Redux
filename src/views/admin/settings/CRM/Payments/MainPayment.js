import React from "react"
import {
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from "reactstrap"
import classnames from "classnames"
import ClientPayment from "./ClientPayment"
import StaffPayment from "./StaffPayment"


class MainPayment extends React.Component {

  constructor(props)
  {
   
    super(props)
    this.setState({  promoCode:{}})
   
  this.editClickPromoCode = this.editClickPromoCode.bind(this);
  }
  state = {
    activeTab: "1",
  
  }
  editClick = (value) => {
  
   
    console.log(value)
  }
  editClickPromoCode(param){
    this.setState({
      activeTab: "3" // open add new form when click on edit
    })
    this.setState({promoCode:param[0]})
    console.log('do something: ', param);
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
                 
                    <span className="align-middle ml-50">Client Payment</span>
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
                  
                    <span className="align-middle ml-50">Staff Payment</span>
                  </NavLink>
                </NavItem>
          
              
              </Nav>
              
              <TabContent activeTab={this.state.activeTab}>
            
              <TabPane tabId="1">
          <ClientPayment></ClientPayment>
           
                </TabPane>
               <TabPane tabId="2">
              <StaffPayment></StaffPayment>
                </TabPane>
            
              </TabContent>
         
        </Col>
      </Row>
    )
  }
}
export default MainPayment
