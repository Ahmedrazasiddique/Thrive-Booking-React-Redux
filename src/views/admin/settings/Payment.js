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
import { User, Info, Share } from "react-feather";
import PayLocal from "./PaymentMethod/PayLocal";
import Paypal from "./PaymentMethod/Paypal";
import Stripe from "./PaymentMethod/Stripe";
//import "../../../../../frontend/src/assets/scss/pages/users.scss";
import { connect } from "react-redux";
import { getMyPayment } from "../../../actions/paymentAction";
import Loader from "../../../../src/components/Loader/Loader";
import { ToastContainer, toast } from "react-toastify";

class Payment extends React.Component {
  state = {
    paymentData: {},
    isShowLoader: true,
    activeTab: "1",
    payLocally: {},
    payPaypal: {},
    payStripe: {},
    isComponentLoaded: false,
  };

  componentDidMount() {
    const { getMyPayment } = this.props;

    getMyPayment(1);

    this.setState({ isShowLoader: true });
  }

  componentDidUpdate(previousProp) {
    if (previousProp !== this.props) {
      if (this.props.PaymentSuccess) {
        this.setState({ isShowLoader: false });
        this.setState({ paymentData: this.props.PaymentData.data });
        this.setState({ isComponentLoaded: true });
        //pay locally
        var payLocally1 = {};
        payLocally1.id = this.props.PaymentData.data.id;
        payLocally1.cash_status = this.props.PaymentData.data.cash_status;
        payLocally1.visa_mastercard_status = this.props.PaymentData.data.visa_mastercard_status;
        payLocally1.amex_status = this.props.PaymentData.data.amex_status;
        payLocally1.cheque_status = this.props.PaymentData.data.cheque_status;

        var payPaypal1 = {};
        payPaypal1.id = this.props.PaymentData.data.id;
        payPaypal1.paypal_api_username = this.props.PaymentData.data.paypal_api_username;
        payPaypal1.paypal_signature = this.props.PaymentData.data.paypal_signature;
        payPaypal1.paypal_guest_payment_status = this.props.PaymentData.data.paypal_guest_payment_status;
        payPaypal1.paypal_test_mode_status = this.props.PaymentData.data.paypal_test_mode_status;
        payPaypal1.paypal_verified_status = this.props.PaymentData.data.paypal_verified_status;
        payPaypal1.paypal_api_password = this.props.PaymentData.data.paypal_api_password;

        var payStripe1 = {};
        payStripe1.id = this.props.PaymentData.data.id;
        payStripe1.stripe_secret_key = this.props.PaymentData.data.stripe_secret_key;
        payStripe1.stripe_publishable_key = this.props.PaymentData.data.stripe_publishable_key;
        payStripe1.stripe_verified_status = this.props.PaymentData.data.stripe_verified_status;

        this.setState({ payLocally: payLocally1 });
        this.setState({ payPaypal: payPaypal1 });
        this.setState({ payStripe: payStripe1 });
      }
      if (this.props.IsDataSubmitedSuccessfully) {
        toast.success("Payment Update Updated Successfully");
      }

      if (this.props.IsError) {
        toast.error("something went wrong");
      }
    }
  }

  toggle = (tab) => {
    this.setState({
      activeTab: tab,
    });
  };
  render() {
    console.log("Payment Objects", this.state);
    return (
      <Row>
        <Loader isShowLoader={this.state.isShowLoader}></Loader>
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
                    <User size={16} />
                    <span className="align-middle ml-50">Pay Local</span>
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
                    <Info size={16} />
                    <span className="align-middle ml-50">Paypal</span>
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
                    <Share size={16} />
                    <span className="align-middle ml-50">Stripe</span>
                  </NavLink>
                </NavItem>
              </Nav>
              {this.state.isComponentLoaded ? (
                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="1">
                    <PayLocal Data={this.state.payLocally}></PayLocal>
                  </TabPane>
                  <TabPane tabId="2">
                    <Paypal Data={this.state.payPaypal}></Paypal>
                  </TabPane>
                  <TabPane tabId="3">
                    <Stripe Data={this.state.payStripe}></Stripe>
                  </TabPane>
                </TabContent>
              ) : (
                <></>
              )}
              <ToastContainer />
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    PaymentData: state.payment.data,
    PaymentSuccess: state.payment.PaymentSuccess,
  };
};

const actionMethods = {
  getMyPayment: getMyPayment,
};

export default connect(mapStateToProps, actionMethods)(Payment);
