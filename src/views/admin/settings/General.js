import React, { Fragment } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  FormGroup,
  Button,
  Label,
  Row,
  Col,
  Input,
  FormText,
} from "reactstrap";
import Select from "react-select";
import Toggle from "react-toggle";
import { Formik, Form, Field } from "formik";
import NumericInput from "react-numeric-input";
import { defaultStyle } from "../../../components/NumberInput/InputStyle";
import Radio from "../../../components/Radio";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toggle/style.css";
import "../../../assets/scss/plugins/forms/switch/react-toggle.scss";

import Breadcrumbs from "../../../components/Breadcrumb";

const timeOptions = [
  { value: "0", label: "15 Minute(s)" },
  { value: "1", label: "20 Minute(s)" },
  { value: "2", label: "30 Minute(s)" },
  { value: "3", label: "45 Minute(s)" },
  { value: "4", label: "1 Hour(s)" },
  { value: "5", label: "1 Hour(s) 30 Minute(s)" },
  { value: "6", label: "2 Hour(s)" },
  { value: "7", label: "2 Hour(s) 30 Minute(s)" },
  { value: "8", label: "3 Hour(s)" },
];

const currencyOptions = [
  { value: "0", label: "Lek Albania Lek" },
  { value: "1", label: "د.إ UAE Dirham" },
  { value: "2", label: "؋ Afghanistan Afghani" },
  { value: "3", label: "$ Argentina Peso" },
  { value: "4", label: "NAƒ Neth Antilles Guilder" },
  { value: "5", label: "ƒ Aruba Guilder" },
  { value: "6", label: "$ Australia Dollar" },
  { value: "7", label: "ман Azerbaijan Manat" },
  { value: "8", label: "$ Bahamas Dollar" },
];

const currencySymbolPositionOptions = [
  { value: "0", label: "Before (e.g.$100)" },
  { value: "1", label: "After (e.g.100$)" },
];

const multipleUnitsOptions = [
  { value: "0", label: "DropDown Design" },
  { value: "1", label: "Blocks As Button Design" },
  { value: "2", label: "Qty Control Design" },
];

const designForAddonsOptions = [
  { value: "0", label: "Qty Control Design" },
  { value: "1", label: "Blocks As Button Design" },
];

const designForServicesOptions = [
  { value: "0", label: "Big Images Radio" },
  { value: "1", label: "Blocks As Button Design" },
];

const calculationPolicyOptions = [
  { value: "0", label: "Multiply" },
  { value: "1", label: "Equal" },
];

class General extends React.Component {
  state = {
    isPostalChecked: false,
    isTaxChecked: false,
    isPartialDepositChecked: false,
    isCancellationPolicyChecked: false,
    isAllowMultipleBookingChecked: false,
    isAppointmentAutoConfirmChecked: false,
    isTermsConditionsChecked: false,
    isPrivacyPolicyChecked: false,
    isBookingPageChecked: false,
  };
  render() {
    return (
      <Fragment>
        <Breadcrumbs
          breadCrumbTitle="General"
          breadCrumbParent="Settings"
          breadCrumbActive="General"
        />
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
          </CardHeader>
          <CardBody>
            <Formik
              onSubmit={(values) => {
                setTimeout(() => {
                  toast.success(JSON.stringify(values, null, 2));
                }, 500);
              }}
            >
              {(formikprops) => (
                <Form>
                  <Row>
                    <Col sm="12">
                      <FormGroup>
                        <span className="label-text align-middle mr-1">
                          Postal Code
                        </span>
                        <Label className="react-toggle-wrapper d-inline-block align-middle">
                          <Toggle
                            postalCodeChecked={this.state.isPostalChecked}
                            formikprops={formikprops}
                          />
                        </Label>
                      </FormGroup>
                    </Col>
                    <Col md="4" sm="12">
                      <FormGroup>
                        <h6 for="language">Time Interval</h6>
                        <Select
                          className="language"
                          classNamePrefix="select"
                          defaultValue={timeOptions[0]}
                          name="language"
                          options={timeOptions}
                          formikprops={formikprops}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4" sm="12">
                      <FormGroup>
                        <h6 for="language">Minimum advance booking time</h6>
                        <Select
                          className="language"
                          classNamePrefix="select"
                          defaultValue={timeOptions[0]}
                          name="language"
                          options={timeOptions}
                          formikprops={formikprops}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4" sm="12">
                      <FormGroup>
                        <h6 for="language">Maximum advance booking time</h6>
                        <Select
                          className="language"
                          classNamePrefix="select"
                          defaultValue={timeOptions[0]}
                          name="language"
                          options={timeOptions}
                          formikprops={formikprops}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6" sm="12">
                      <FormGroup>
                        <h6 for="language">Cancellation Buffer Time</h6>
                        <Select
                          className="language"
                          classNamePrefix="select"
                          defaultValue={timeOptions[0]}
                          name="language"
                          options={timeOptions}
                          formikprops={formikprops}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6" sm="12">
                      <FormGroup>
                        <h6 for="language">Reschedule Buffer Time</h6>
                        <Select
                          className="language"
                          classNamePrefix="select"
                          defaultValue={timeOptions[0]}
                          name="language"
                          options={timeOptions}
                          formikprops={formikprops}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4" sm="12">
                      <FormGroup>
                        <h6 for="language">Currency</h6>
                        <Select
                          className="language"
                          classNamePrefix="select"
                          defaultValue={currencyOptions[0]}
                          name="language"
                          options={currencyOptions}
                          formikprops={formikprops}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4" sm="12">
                      <FormGroup>
                        <h6 for="language">Price Format</h6>
                        <Select
                          className="language"
                          classNamePrefix="select"
                          defaultValue={currencyOptions[0]}
                          name="language"
                          options={currencyOptions}
                          formikprops={formikprops}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4" sm="12">
                      <FormGroup>
                        <h6 for="language">Currency Symbol Position</h6>
                        <Select
                          className="language"
                          classNamePrefix="select"
                          defaultValue={currencySymbolPositionOptions[0]}
                          name="language"
                          options={currencySymbolPositionOptions}
                          formikprops={formikprops}
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="12" className="mt-1">
                      <div className="d-inline-block mb-1 mr-1">
                        <span className="label-text align-middle mr-1">Tax/Vat</span>
                        <Label className="react-toggle-wrapper d-inline-block align-middle">
                          <Toggle
                            taxChecked={this.state.isTaxChecked}
                            formikprops={formikprops}
                          />
                        </Label>
                      </div>
                      <div className="d-inline-block mb-1 mr-1">
                        <NumericInput
                          className="form-control"
                          value={10}
                          style={defaultStyle}
                          formikprops={formikprops}
                        />
                      </div>
                      <div className="d-inline-block mr-1">
                        <Radio
                          label="Percentage"
                          defaultChecked={false}
                          name="taxType"
                        />
                      </div>
                      <div className="d-inline-block mr-1">
                        <Radio
                          label="Flat Fee"
                          defaultChecked={true}
                          name="taxType"
                        />
                      </div>
                    </Col>
                    <Col sm="12" className="mt-1">
                      <FormGroup>
                        <span className="label-text align-middle mr-1">
                          Partial Deposit
                        </span>
                        <Label className="react-toggle-wrapper d-inline-block align-middle">
                          <Toggle
                            partialDepositChecked={
                              this.state.isPartialDepositChecked
                            }
                            formikprops={formikprops}
                          />
                        </Label>
                        <span className="label-text align-middle danger">
                          Please Enable Payment Gateway
                        </span>
                      </FormGroup>
                    </Col>
                    <Col sm="12">
                      <FormGroup>
                        <h6 for="thankYouPageUrl">Thankyou Page URL</h6>
                        <Field
                          className="form-control"
                          type="text"
                          name="thankYouPageUrl"
                          placeholder="Custom Thankyou Page URL"
                          formikprops={formikprops}
                        />
                        <FormText className="text-muted">
                          Default url is :
                          https://dev.thrivebooking.com/front/thankyou.php
                        </FormText>
                      </FormGroup>
                    </Col>
                  </Row>
                  <hr />
                  <h3>Policy Settings</h3>
                  <Row>
                    <Col sm="12" className="mt-1">
                      <div className="d-inline-block mb-1 mr-1">
                        <span className="label-text align-middle mr-1">
                          Cancellation Policy
                        </span>
                        <Label className="react-toggle-wrapper d-inline-block align-middle">
                          <Toggle
                            cancellationPolicyChecked={this.state.isCancellationPolicyChecked}
                            formikprops={formikprops}
                          />
                        </Label>
                      </div>
                      <div className="d-inline-block mb-1 mr-1">
                        <span className="label-text align-middle mr-1">
                          Allow Multiple Booking For Same Timeslot
                        </span>
                        <Label className="react-toggle-wrapper d-inline-block align-middle">
                          <Toggle
                            allowMultipleBookingChecked={this.state.isAllowMultipleBookingChecked}
                            formikprops={formikprops}
                          />
                        </Label>
                      </div>
                      <div className="d-inline-block mb-1 mr-1">
                        <span className="label-text align-middle mr-1">
                          Appointment Auto Confirm
                        </span>
                        <Label className="react-toggle-wrapper d-inline-block align-middle">
                          <Toggle
                            appointmentAutoConfirmChecked={
                              this.state.isAppointmentAutoConfirmChecked
                            }
                            formikprops={formikprops}
                          />
                        </Label>
                      </div>
                    </Col>
                    <Col sm="12" className="mt-1">
                      <div className="d-inline-block mb-1 mr-1">
                        <span className="label-text align-middle mr-1">
                          Terms & Conditions
                        </span>
                        <Label className="react-toggle-wrapper d-inline-block align-middle">
                          <Toggle
                            termsConditionsChecked={this.state.isTermsConditionsChecked}
                            formikprops={formikprops}
                          />
                        </Label>
                      </div>
                    </Col>
                    <Col sm="12">
                      <FormGroup>
                        <Field
                          className="form-control"
                          type="text"
                          name="termsConditions"
                          placeholder="Terms & Condition Link"
                          formikprops={formikprops}
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="12" className="mt-1">
                      <div className="d-inline-block mb-1 mr-1">
                        <span className="label-text align-middle mr-1">
                          Privacy Policy
                        </span>
                        <Label className="react-toggle-wrapper d-inline-block align-middle">
                          <Toggle
                            privacyPolicyChecked={this.state.isPrivacyPolicyChecked}
                            formikprops={formikprops}
                          />
                        </Label>
                      </div>
                    </Col>
                    <Col sm="12">
                      <FormGroup>
                        <Field
                          className="form-control"
                          type="text"
                          name="privacyPolicy"
                          placeholder="Privacy Policy Link"
                          formikprops={formikprops}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6" sm="12">
                      <FormGroup>
                        <h6 for="language">
                          Default Design For Methods With Multiple units
                        </h6>
                        <Select
                          className="language"
                          classNamePrefix="select"
                          defaultValue={multipleUnitsOptions[0]}
                          name="language"
                          options={multipleUnitsOptions}
                          formikprops={formikprops}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6" sm="12">
                      <FormGroup>
                        <h6 for="language">Default Design For Addons</h6>
                        <Select
                          className="language"
                          classNamePrefix="select"
                          defaultValue={designForAddonsOptions[0]}
                          name="language"
                          options={designForAddonsOptions}
                          formikprops={formikprops}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6" sm="12">
                      <FormGroup>
                        <h6 for="language">Default Design For Services</h6>
                        <Select
                          className="language"
                          classNamePrefix="select"
                          defaultValue={designForServicesOptions[0]}
                          name="language"
                          options={designForServicesOptions}
                          formikprops={formikprops}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6" sm="12">
                      <FormGroup>
                        <h6 for="language">Change Calculation Policy</h6>
                        <Select
                          className="language"
                          classNamePrefix="select"
                          defaultValue={calculationPolicyOptions[0]}
                          name="language"
                          options={calculationPolicyOptions}
                          formikprops={formikprops}
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="12" className="mt-1">
                      <div className="d-inline-block mb-1 mr-1">
                        <span className="label-text align-middle mr-1">
                          Booking Page Rightside Description
                        </span>
                        <Label className="react-toggle-wrapper d-inline-block align-middle">
                          <Toggle
                            bookingPageChecked={this.state.isBookingPageChecked}
                            formikprops={formikprops}
                          />
                        </Label>
                      </div>
                    </Col>
                    <Col sm="12">
                      <FormGroup>
                        <Input
                          className="form-control"
                          type="textarea"
                          name="rightsideDescription"
                          formikprops={formikprops}
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="12">
                      <Button.Ripple color="primary" type="submit">
                        Submit Settings
                      </Button.Ripple>
                    </Col>
                  </Row>
                </Form>
              )}
            </Formik>
            <ToastContainer />
          </CardBody>
        </Card>
      </Fragment>
    );
  }
}
export default General;
