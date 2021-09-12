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
import { User, Info, Share, Globe, Gift, Plus } from "react-feather";
import PromoCodeList from "./PromoCodeList";
import AddNewPromoCode from "./AddNewPromoCode";
import SpecialOffer from "./SpecialOffer";

class MainPromoPage extends React.Component {
  state = {
    activeTab: "1",
  };
  constructor(props) {
    super(props);

    this.changeTab = this.changeTab.bind(this);
  }

  toggle = (tab) => {
    this.setState({
      activeTab: tab,
    });
  };
  changeTab() {
    this.setState({ activeTab: "2" });
  }
  componentDidUpdate(previousProp) {
    if (previousProp != this.props) {
      if (this.props.PromoCodeSuccess) {
        this.setState({ activeTab: "2" });
      }
    }
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
                      active: this.state.activeTab === "1",
                    })}
                    onClick={() => {
                      this.toggle("1");
                    }}
                  >
                    <Gift size={16} />
                    <span className="align-middle ml-50">Promocodes</span>
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
                    <Plus size={16} />
                    <span className="align-middle ml-50">Add New</span>
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
                    <Globe size={16} />
                    <span className="align-middle ml-50">Special Offer</span>
                  </NavLink>
                </NavItem>
              </Nav>

              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                  <PromoCodeList />
                </TabPane>
                <TabPane tabId="2">
                <div class="eventdetailsaddbox rd_noshadow">
                  <AddNewPromoCode></AddNewPromoCode>
                  </div>
                </TabPane>
                <TabPane tabId="3">
                  <SpecialOffer></SpecialOffer>
                </TabPane>
              </TabContent>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}
export default MainPromoPage;

const mapStateToProps = (state) => {
  return {
    PromoCodeSuccess: state.promoCode.PromoCodeSuccess,
  };
};

const actionMethods = {};

export default connect(mapStateToProps, actionMethods)(MainPromoPage);
