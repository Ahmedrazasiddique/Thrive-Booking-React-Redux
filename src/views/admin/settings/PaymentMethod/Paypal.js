import React from "react";
import { CardBody, FormGroup, Button, Col, Input, Form } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import { HelpCircle } from "react-feather";
import Toggle from "react-toggle";
import Loader from "../../../../../src/components/Loader/Loader";
import { connect } from "react-redux";
import { updatePayPal } from "../../../../../src/actions/paymentAction";
import { getAdminBusinessId } from "../../../../utils/authHelper";
class Paypal extends React.Component {
  state = {
    Data: {},
    paypal_guest_payment_status:
      this.props.Data.paypal_guest_payment_status === "E" ? true : false,
    paypal_test_mode_status:
      this.props.Data.paypal_test_mode_status === "E" ? true : false,
    paypal_api_username: this.props.Data.paypal_api_username,
    paypal_signature: this.props.Data.paypal_signature,
    paypal_api_password: this.props.Data.paypal_api_password,
  };
  componentDidMount() {
    const { Data } = this.props.Data;
    this.setState({ Data: Data });
  }

  handleSwitchChange = (e) => {
    this.setState({ [e.target.id]: this.state[e.target.id] ? false : true });
  };

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: this.state[e.target.value] });
  };

  componentDidUpdate(previousProp) {
    if (previousProp !== this.props) {
      if (this.props.PayPalSuccess) {
        this.setState({ isShowLoader: false });
        toast.success("PayPal Info Update Successfully");
      }
      if (this.props.PayPalError) {
        this.setState({ isShowLoader: false });
        toast.error("something went wrong");
      }
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ isShowLoader: true });
    const formData = new FormData(event.target);
    formData.append(
      "paypal_guest_payment_status",
      this.state.paypal_guest_payment_status ? "E" : "D"
    );
    formData.append(
      "paypal_test_mode_status",
      this.state.paypal_test_mode_status ? "E" : "D"
    );
    formData.append("business_id", getAdminBusinessId());
    formData.append("id", this.props.Data.id);
    this.props.updatePayPal(formData);
  };
  render() {
    const { Data } = this.props;
    return (
      <CardBody>
        <Loader isShowLoader={this.state.isShowLoader}></Loader>
        <Form onSubmit={this.handleSubmit}>
          <Col sm="6">
            <FormGroup row>
              <Col sm="4">
                <h5>API Username </h5>
              </Col>
              <Col sm="8">
                <Input
                  className="form-control"
                  type="text"
                  name="paypal_api_username"
                  id="smtpHostName"
                  placeholder=""
                  value={this.state.paypal_api_username}
                  onChange={this.handleInputChange}
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col sm="4">
                <h5>API Password </h5>
              </Col>
              <Col sm="8">
                <Input
                  className="form-control"
                  type="password"
                  name="paypal_api_password"
                  id="smtpPasswardName"
                  placeholder=""
                  value={this.state.paypal_api_password}
                  onChange={this.handleInputChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col sm="4">
                <h5>Signature </h5>
              </Col>
              <Col sm="8">
                <Input
                  className="form-control"
                  type="text"
                  name="paypal_signature"
                  id="smtpUserName"
                  placeholder=""
                  value={this.state.paypal_signature}
                  onChange={this.handleInputChange}
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col sm="4">
                <h5>
                  Paypal guest payment <HelpCircle size={12} />
                </h5>
              </Col>
              <Col sm="8">
                <label className="react-toggle-wrapper">
                  <Toggle
                    defaultChecked={
                      Data.paypal_guest_payment_status === "E" ? true : false
                    }
                    id={"paypal_guest_payment_status"}
                    onChange={this.handleSwitchChange}
                  />
                </label>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col sm="4">
                <h5>
                  Test Mode <HelpCircle size={12} />
                </h5>
              </Col>
              <Col sm="8">
                <label className="react-toggle-wrapper">
                  <Toggle
                    defaultChecked={
                      Data.paypal_test_mode_status === "E" ? true : false
                    }
                    id={"paypal_test_mode_status"}
                    onChange={this.handleSwitchChange}
                  />
                </label>
              </Col>
            </FormGroup>
          </Col>

          <Col className="d-flex justify-content-end flex-wrap" sm="12">
            <Button.Ripple className="mr-1" color="primary">
              Save Changes
            </Button.Ripple>
          </Col>
        </Form>

        <ToastContainer />
      </CardBody>
    );
  }
}
//}
const mapStateToProps = (state) => {
  return {
    PayPalSuccess: state.payment.PaymentPaypalSuccess,
    PayPalError: state.payment.PaymentPaypalError,
  };
};

const actionMethods = {
  updatePayPal: updatePayPal,
};

export default connect(mapStateToProps, actionMethods)(Paypal);
