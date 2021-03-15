import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Button,
  Col,
  Form,
} from "reactstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Check } from "react-feather";
import Checkbox from "../../../../../src/components//Checkbox/CheckboxesVuexy";
import Loader from "../../../../../src/components/Loader/Loader";
import { connect } from "react-redux";
import { updatePayLocal } from "../../../../../src/actions/paymentAction";
import { getAdminBusinessId } from "../../../../utils/authHelper";
class PayLocal extends React.Component {
  state = {
    PayLocal: {},
    isShowLoader: false,
    cash_status: this.props.Data.cash_status === "E" ? true : false,
    visa_mastercard_status:
      this.props.Data.visa_mastercard_status === "E" ? true : false,
    amex_status: this.props.Data.amex_status === "E" ? true : false,
    cheque_status: this.props.Data.cheque_status === "E" ? true : false,
  };
  componentDidMount() {}
  handleSwitchChange = (e) => {
    this.setState({ [e.target.id]: this.state[e.target.id] ? false : true });
  };
  componentDidUpdate(previousProp) {
    if (previousProp !== this.props) {
      if (this.props.PaymentLocallySuccess) {
        this.setState({ isShowLoader: false });
        toast.success("Pay Locally Update Successfully");
      }
      if (this.props.PaymentLocallyError) {
        this.setState({ isShowLoader: false });
        toast.error("something went wrong");
      }
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ isShowLoader: true });
    const formData = new FormData(event.target);

    console.log("cash_status", this.state.cash_status);
    console.log("visa_mastercard_status", this.state.visa_mastercard_status);
    console.log("amex_status", this.state.amex_status);
    console.log("cheque_status", this.state.cheque_status);

    formData.append("cash_status", this.state.cash_status ? "E" : "D");
    formData.append(
      "visa_mastercard_status",
      this.state.visa_mastercard_status ? "E" : "D"
    );
    formData.append("amex_status", this.state.amex_status ? "E" : "D");
    formData.append("cheque_status", this.state.cheque_status ? "E" : "D");
    formData.append("business_id", getAdminBusinessId());
    formData.append("id", this.props.Data.id);

    this.props.updatePayLocal(formData);
  };

  render() {
    const { Data } = this.props;

    return (
      <Card>
        <Loader isShowLoader={this.state.isShowLoader}></Loader>
        <CardHeader>
          <CardTitle>Pay Locally</CardTitle>
        </CardHeader>
        <CardBody>
          <Form onSubmit={this.handleSubmit}>
            <div className="d-inline-block mr-1">
              <Checkbox
                color="primary"
                icon={<Check className="vx-icon" size={16} />}
                label="Cash"
                defaultChecked={Data.cash_status === "E" ? true : false}
                id={"cash_status"}
                onChange={this.handleSwitchChange}
              />
            </div>
            <div className="d-inline-block mr-1">
              <Checkbox
                color="success"
                icon={<Check className="vx-icon" size={16} />}
                label="Visa/Mastercard"
                defaultChecked={
                  Data.visa_mastercard_status === "E" ? true : false
                }
                id={"visa_mastercard_status"}
                onChange={this.handleSwitchChange}
              />
            </div>
            <div className="d-inline-block mr-1">
              <Checkbox
                color="danger"
                icon={<Check className="vx-icon" size={16} />}
                label="Amex"
                defaultChecked={Data.amex_status === "E" ? true : false}
                id={"amex_status"}
                onChange={this.handleSwitchChange}
              />
            </div>
            <div className="d-inline-block mr-1">
              <Checkbox
                color="info"
                icon={<Check className="vx-icon" size={16} />}
                label="Cheque"
                defaultChecked={Data.cheque_status === "E" ? true : false}
                id={"cheque_status"}
                onChange={this.handleSwitchChange}
              />
            </div>
            <Col className="d-flex justify-content-end flex-wrap" sm="12">
              <Button.Ripple className="mr-1" color="primary">
                Save Changes
              </Button.Ripple>
            </Col>
          </Form>
        </CardBody>
      </Card>
    );
  }
}
//}
const mapStateToProps = (state) => {
  return {
    PaymentLocallySuccess: state.payment.PaymentLocallySuccess,
    PaymentLocallyError: state.payment.PaymentLocallyError,
  };
};

const actionMethods = {
  updatePayLocal: updatePayLocal,
};

export default connect(mapStateToProps, actionMethods)(PayLocal);
