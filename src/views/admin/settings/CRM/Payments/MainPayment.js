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
      <div class="eventdetailsaddbox rd_noshadow">
      <div class="boxheader rd_floatingheaderthig">
        <div class="rd_inputselectheader">
            <div class="rd_selectheaderrdt2 rd_selectheaderrdt2profile">
          
           
       
       <button  className={classnames({
         active: this.state.activeTab === "1"
       })}
       onClick={() => {
         this.toggle("1")
       }}>Client Payment</button>
       <button  className={classnames({
         active: this.state.activeTab === "2"
       })}
       onClick={() => {
         this.toggle("2")
       }}>Staff Payment</button>
      
     </div>
     </div></div>
              
              <TabContent activeTab={this.state.activeTab}>
            
              <TabPane tabId="1">
              <div class="rd_vacationfilterpart rd_vacationfilterpart3">
          <div class="rd_remplate_part">
          <ClientPayment></ClientPayment>
           </div></div>
                </TabPane>
               <TabPane tabId="2">
               <div class="rd_vacationfilterpart rd_vacationfilterpart3">
          <div class="rd_remplate_part">

              <StaffPayment></StaffPayment>
              </div></div>
                </TabPane>
            
              </TabContent>
         
              </div>
                  
    )
  }
}
export default MainPayment
