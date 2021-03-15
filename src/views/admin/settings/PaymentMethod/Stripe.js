import React from "react";
import { CardBody, FormGroup, Button, Col, Input, Form } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../../../../../src/components/Loader/Loader";
import { connect } from "react-redux";
import { updateStripe } from "../../../../../src/actions/paymentAction";
import { getAdminBusinessId } from "../../../../utils/authHelper";
class Stripe extends React.Component {
  state = {
    Data: {},
    stripe_publishable_key: this.props.Data.stripe_publishable_key,
    stripe_secret_key: this.props.Data.stripe_secret_key,
  };
  handleInputChange = (e) => {
    this.setState({ [e.target.name]: this.state[e.target.value] });
  };

  componentDidMount() {
    const { Data } = this.props.Data;
    this.setState({ Data: Data });
  }

  componentDidUpdate(previousProp) {
    if (previousProp !== this.props) {
      if (this.props.PaymentStripeSuccess) {
        this.setState({ isShowLoader: false });
        toast.success("Stripe Info Update Successfully");
      }
      if (this.props.PaymentStripeError) {
        this.setState({ isShowLoader: false });
        toast.error("something went wrong");
      }
    }
  }
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ isShowLoader: true });
    const formData = new FormData(event.target);
    formData.append("business_id", getAdminBusinessId());
    formData.append("id", this.props.Data.id);
    this.props.updateStripe(formData);
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
                <h5>Secret Key </h5>
              </Col>
              <Col sm="8">
                <Input
                  className="form-control"
                  type="password"
                  name="stripe_publishable_key"
                  id="smtpPasswardName"
                  placeholder=""
                  value={this.state.stripe_publishable_key}
                  onChange={this.handleInputChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col sm="4">
                <h5>Publishable Key </h5>
              </Col>
              <Col sm="8">
                <Input
                  className="form-control"
                  type="text"
                  name="stripe_secret_key"
                  id="smtpUserName"
                  placeholder=""
                  value={this.state.stripe_secret_key}
                  onChange={this.handleInputChange}
                />
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

const mapStateToProps = (state) => {
  return {
    PaymentStripeSuccess: state.payment.PaymentStripeSuccess,
    PaymentStripeError: state.payment.PaymentStripeError,
  };
};

const actionMethods = {
  updateStripe: updateStripe,
};

export default connect(mapStateToProps, actionMethods)(Stripe);
