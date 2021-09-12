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
import PromoCodeList from "./PromoCode/PromoCodeList";
import AddNewPromoCode from "./PromoCode/AddNewPromoCode";
import SpecialOffer from "./PromoCode/SpecialOffer";
import DiscountTab from "./PromoCode/DiscountTab";

class Discount extends React.Component {
  constructor(props) {
    super(props);
    this.setState({ promoCode: {} });

    this.editClickPromoCode = this.editClickPromoCode.bind(this);
  }
  state = {
    activeTab: "1",
  };

  editClick = (value) => {
    console.log(value);
  };

  ChangeTab = () => {
    this.setState({
      activeTab: "2", // open add new form when click on edit
    });
  };

  editClickPromoCode(param) {
    this.setState({
      activeTab: "3", // open add new form when click on edit
    });
    this.setState({ promoCode: param });
    console.log("do something: ", param);
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
                      active: this.state.activeTab === "1"
                    })}
                    onClick={() => {
                      this.toggle("1")
                    }}>Recurrent Discounts</button>
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
                      this.toggle("3")
                      this.setState({promoCode:{}})
                    }}>Add New</button>

<button  className={classnames({
                      active: this.state.activeTab === "4"
                    })}
                    onClick={() => {
                      this.toggle("4")
                    }}>Special Ribbon</button>
                  </div>

            </div>
          </div>

              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                  
                  <DiscountTab />
                  
                </TabPane>
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
                      ChangeTab={this.ChangeTab}
                    ></AddNewPromoCode>
                  </Col>
                </TabPane>
                <TabPane tabId="4">
                  <Col sm="6">
                    <SpecialOffer></SpecialOffer>
                  </Col>
                </TabPane>
              </TabContent>
           </div>
    );
  }
}
export default Discount;
