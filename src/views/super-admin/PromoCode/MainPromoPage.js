import React from "react";
import {
  Card,
  CardBody,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";
import { Globe, Gift, Plus, DollarSign } from "react-feather";
import PromoCodeList from "./PromoCodeList";
import AddNewPromoCode from "./AddNewPromoCode";

class Discount extends React.Component {
  constructor(props) {
    super(props);
    this.setState({ promoCode: {} });

    this.editClickPromoCode = this.editClickPromoCode.bind(this);
  }
  state = {
    activeTab: "2",
  };

  editClick = (value) => {
    console.log(value);
  };

  editClickPromoCode(param) {
    this.setState({
      activeTab: "3", // open add new form when click on edit
    });
    this.setState({ promoCode: param });
    console.log("do something: ", param);
  }
  changeTab=()=> {
    this.setState({ activeTab: "2" });
  }
  toggle = (tab) => {
    this.setState({
      activeTab: tab,
    });
  };
  render() {
    return (
      <div class="eventdetailsaddbox rd_noshadow">
          <div class="boxheader rd_floatingheaderthig">
            <div class="rd_inputselectheader">
                <div class="rd_selectheaderrdt2 rd_selectheaderrdt2profile">
                   

                    
                   
                    <button  className={classnames({
                      active: this.state.activeTab === "2"
                    })}
                    onClick={() => {
                      this.toggle("2")
                    }}>Promocodes</button>
                    <button  className={classnames({
                      active: this.state.activeTab === "3"
                    })}
                    onClick={() => {
                      this.setState({promoCode:null})
                      this.toggle("3")
                    }}>Add New</button>

                  </div>

            </div>
          </div>

              <TabContent activeTab={this.state.activeTab}>
               
                <TabPane tabId="2">
                  <PromoCodeList
                    onEditClick={this.editClickPromoCode}
                  ></PromoCodeList>
                </TabPane>
                <TabPane tabId="3">
                  <Col sm="6">
                    <AddNewPromoCode
                      PromoRecord={
                        this.state.promoCode ? this.state.promoCode : {}
                      }
                      ChangeTab={this.changeTab}
                    ></AddNewPromoCode>
                  </Col>
                </TabPane>
               
              </TabContent>
           </div>
    );
  }
}
export default Discount;
