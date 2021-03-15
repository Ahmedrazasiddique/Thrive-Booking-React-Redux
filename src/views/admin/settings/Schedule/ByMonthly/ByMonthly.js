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
import { User, Info, Share,Globe,Gift ,Plus,DollarSign} from "react-feather"
import ByMonthlyChild from "./ByMonthlyChild"


class ByMonthly extends React.Component {

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
                 
                    <span className="align-middle ml-50">Week 1</span>
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
                  
                    <span className="align-middle ml-50">Week 2</span>
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
                    
                    <span className="align-middle ml-50">Week 3</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === "4"
                    })}
                    onClick={() => {
                      this.toggle("4")
                    }}
                  >
                    
                    <span className="align-middle ml-50">Week 4</span>
                  </NavLink>
                </NavItem>
              </Nav>
              
              <TabContent activeTab={this.state.activeTab}>
            
              <TabPane tabId="1">
          
              <ByMonthlyChild ></ByMonthlyChild>
                </TabPane>
               <TabPane tabId="2">
               <ByMonthlyChild ></ByMonthlyChild>
                </TabPane>
                <TabPane tabId="3">
               
          
                  <ByMonthlyChild ></ByMonthlyChild>
             
                </TabPane>
                <TabPane tabId="4">
              
             
                <ByMonthlyChild ></ByMonthlyChild>
          
                </TabPane>
              </TabContent>
         
        </Col>
      </Row>
    )
  }
}
export default ByMonthly
