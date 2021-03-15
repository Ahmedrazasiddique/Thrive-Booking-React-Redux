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
  editClickPromoCode(param) {
    this.setState({
      activeTab: "3", // open add new form when click on edit
    });
    this.setState({ promoCode: param[0] });
    console.log("do something: ", param);
  }

  toggle = (tab) => {
    this.setState({
      activeTab: tab,
    });
  };
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
                      active: this.state.activeTab === "1",
                    })}
                    onClick={() => {
                      this.toggle("1");
                    }}
                  >
                    <DollarSign size={16} />
                    <span className="align-middle ml-50">
                      Recurrent Discounts
                    </span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === "2",
                    })}
                    onClick={() => {
                      this.toggle("2");
                    }}
                  >
                    <Gift size={16} />
                    <span className="align-middle ml-50">Promocodes</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === "3",
                    })}
                    onClick={() => {
                      this.toggle("3");
                    }}
                  >
                    <Plus size={16} />
                    <span className="align-middle ml-50">Add New</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === "4",
                    })}
                    onClick={() => {
                      this.toggle("4");
                    }}
                  >
                    <Globe size={16} />
                    <span className="align-middle ml-50">Special Ribbon</span>
                  </NavLink>
                </NavItem>
              </Nav>

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
                    ></AddNewPromoCode>
                  </Col>
                </TabPane>
                <TabPane tabId="4">
                  <Col sm="6">
                    <SpecialOffer></SpecialOffer>
                  </Col>
                </TabPane>
              </TabContent>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}
export default Discount;
