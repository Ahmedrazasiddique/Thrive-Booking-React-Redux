import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  FormGroup,
  Button,
  Row,
  Col,
  InputGroup,
  InputGroupAddon,
  Input,
  Form,
} from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import Toggle from "react-toggle";
import { HelpCircle } from "react-feather";
import ColorPickerCustom from "../../../../src/components/CustomComponents/ColorPickerCustom";
import { connect } from "react-redux";
import {
  getMyThriveLink,
  updateMyThriveLink,
} from "../../../actions/myThriveLinkAction";
import Loader from "../../../../src/components/Loader/Loader";

const MyThriveLink = (props) => {
  const [inputs, setInputs] = useState({});
  const [isColorComponentToLoad, setisColorComponentToLoad] = useState(false);
  const [isShowLoader, setIsShowLoader] = useState(true);
  const [isUrlValid, setIsUrlValid] = useState(true);

  const handleInputChange = (e) => {
    if (e.target.id == "thankYouPageURL") {
      var url = e.target.value;
      var r = new RegExp(/^(ftp|http|https):\/\/[^ "]+$/);

      if (r.test(url)) {
        setIsUrlValid(true);
      } else {
        setIsUrlValid(false);
      }
    }

    let value = { [e.target.name]: e.target.value };
    value = {
      ...inputs,
      ...value,
    };
    setInputs({ [e.target.name]: e.target.value });
    console.log(inputs);
  };
  //const [ThriveLinkData, setThriveLinkData] = useState({});
  useEffect(() => {
    if (!props.ThriveLinkSuccess) props.getMyThriveLink(1);
  });

  useEffect(() => {
    if (props.IsDataSubmitedSuccessfully) {
      toast.success("My Thrive Link Updated Successfully");
    }

    if (props.IsError) {
      toast.error("something went wrong");
    }
    // toast.error("something went wrong");

    if (props.ThriveLinkSuccess) {
      setInputs(props.myThriveLinkData);
      setDefaultColorSchemeChk(
        props.myThriveLinkData.default_color_status == "E" ? true : false
      );
      setAppointmentAutoConfirmChk(
        props.myThriveLinkData.appointment_auto_confirm_status == "E"
          ? true
          : false
      );
      setisColorComponentToLoad(true);
      setIsShowLoader(false);
    } else {
      setIsShowLoader(true);
    }
  }, [props.myThriveLinkData]);

  const [defaultColorSchemeChk, setDefaultColorSchemeChk] = useState(false);
  const [appointmentAutoConfirmChk, setAppointmentAutoConfirmChk] = useState(
    false
  );

  const handleSwitchChange = (event) => {
    if (event.target.name == "default_color_status")
      setDefaultColorSchemeChk(defaultColorSchemeChk ? false : true);
    else setAppointmentAutoConfirmChk(appointmentAutoConfirmChk ? false : true);
  };
  const initialStateOfEventColors = {
    primaryColor: "#7367f0",
    secondaryColor: "#4367f0",
    backgroundColor: "",
    textColor: "",
  };

  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [eventColor, setEventColor] = useState(initialStateOfEventColors);

  const handleSubmit = (event) => {
    event.preventDefault();

    setIsShowLoader(true);
    const formData = new FormData(event.target);
    formData.append(
      "default_color_status",
      appointmentAutoConfirmChk == true ? "E" : "D"
    );
    formData.append(
      "appointment_auto_confirm_status",
      defaultColorSchemeChk == true ? "E" : "D"
    );
    formData.append("id", props.myThriveLinkData.id);

    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    if (isUrlValid) {
      props.updateMyThriveLink(formData);
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Thrive Link</CardTitle>
      </CardHeader>
      <hr />{" "}
      <CardBody>
        <Loader isShowLoader={isShowLoader}></Loader>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col sm="6">
              <FormGroup row>
                <Col sm="3">
                  <h5>
                    {" "}
                    Thrive Link <HelpCircle id="defaultIntervalTp" size={12} />
                  </h5>
                </Col>
                <Col sm="9">
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      mythrive.com
                    </InputGroupAddon>
                    <Input
                      placeholder="enter here"
                      name="url_slug"
                      onChange={handleInputChange}
                      value={inputs.url_slug}
                    />
                  </InputGroup>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm="3">
                  <h5>
                    {" "}
                    Company Description{" "}
                    <HelpCircle id="defaultIntervalTp" size={12} />
                  </h5>
                </Col>
                <Col sm="9">
                  <textarea
                    name="company_description"
                    onChange={handleInputChange}
                    id="companyDescription"
                    value={inputs.company_description}
                    class="form-control textAreaCss"
                  ></textarea>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm="3">
                  <h5>
                    {" "}
                    Thank You Page URL{" "}
                    <HelpCircle id="defaultIntervalTp" size={12} />
                  </h5>
                </Col>
                <Col sm="9">
                  <Input
                    className="form-control"
                    type="text"
                    name="thank_u_page_url"
                    id="thankYouPageURL"
                    placeholder="Add here"
                    value={inputs.thank_u_page_url}
                    onChange={handleInputChange}
                  />
                  {!isUrlValid ? (
                    <div class="field-error text-danger">Invalid Url</div>
                  ) : (
                    <></>
                  )}
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col sm="3">
                  <h5>
                    {" "}
                    Appointment Auto Confirm{" "}
                    <HelpCircle id="defaultIntervalTp" size={12} />
                  </h5>
                </Col>
                <Col sm="9">
                  <label className="react-toggle-wrapper">
                    <Toggle
                      checked={appointmentAutoConfirmChk}
                      onChange={handleSwitchChange}
                      name="appointment_auto_confirm_status"
                      defaultChecked={appointmentAutoConfirmChk}
                    />
                  </label>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col sm="3">
                  <h5>
                    {" "}
                    Privacy Policy{" "}
                    <HelpCircle id="defaultIntervalTp" size={12} />
                  </h5>
                </Col>
                <Col sm="9">
                  <textarea
                    name="privacy_policy"
                    onChange={handleInputChange}
                    value={inputs.privacy_policy}
                    id="privacyPolicy"
                    class="form-control textAreaCss"
                  ></textarea>
                </Col>
              </FormGroup>
            </Col>

            <Col sm="6">
              <FormGroup row>
                <Col sm="3">
                  <h5>
                    {" "}
                    Cancellation Policy{" "}
                    <HelpCircle id="defaultIntervalTp" size={12} />
                  </h5>
                </Col>
                <Col sm="9">
                  <textarea
                    name="cancellation_policy"
                    onChange={handleInputChange}
                    value={inputs.cancellation_policy}
                    id="cacellarionPolicy"
                    class="form-control textAreaCss"
                  ></textarea>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm="3">
                  <h5>
                    {" "}
                    Terms and Conditions{" "}
                    <HelpCircle id="defaultIntervalTp" size={12} />
                  </h5>
                </Col>
                <Col sm="9">
                  <textarea
                    name="terms_and_conditions"
                    onChange={handleInputChange}
                    value={inputs.terms_and_conditions}
                    id="termsAndConditions"
                    class="form-control textAreaCss"
                  ></textarea>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col sm="3">
                  <h5>
                    {" "}
                    Event Color <HelpCircle id="defaultIntervalTp" size={12} />
                  </h5>
                </Col>

                {isColorComponentToLoad == true ? (
                  <>
                    <ColorPickerCustom
                      text="Primary"
                      value={inputs.event_primary_color}
                      color={inputs.event_primary_color}
                      colorFormName="event_primary_color"
                    ></ColorPickerCustom>
                    <ColorPickerCustom
                      text="Secondary"
                      value={inputs.event_secondary_color}
                      color={inputs.event_secondary_color}
                      colorFormName="event_secondary_color"
                    ></ColorPickerCustom>
                    <ColorPickerCustom
                      text="Background"
                      value={inputs.event_background_color}
                      color={inputs.event_background_color}
                      colorFormName="event_background_color"
                    ></ColorPickerCustom>
                    <ColorPickerCustom
                      text="TextColor"
                      value={inputs.text_color}
                      color={inputs.text_color}
                      colorFormName="text_color"
                    ></ColorPickerCustom>
                  </>
                ) : (
                  <></>
                )}
              </FormGroup>

              <FormGroup row>
                <Col sm="3">
                  <h5>
                    {" "}
                    Default Color Scheme{" "}
                    <HelpCircle id="defaultIntervalTp" size={12} />
                  </h5>
                </Col>
                <Col sm="9">
                  <label className="react-toggle-wrapper">
                    <Toggle
                      checked={defaultColorSchemeChk}
                      onChange={handleSwitchChange}
                      name="default_color_status"
                      defaultChecked={defaultColorSchemeChk}
                    />
                  </label>
                </Col>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-end flex-wrap" sm="12">
              {isUrlValid ? (
                <Button.Ripple className="mr-1" color="primary" type="submit">
                  Save Changes
                </Button.Ripple>
              ) : (
                <></>
              )}
            </Col>
          </Row>
        </Form>

        <ToastContainer />
      </CardBody>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    myThriveLinkData: state.myThriveLink.data,
    ThriveLinkSuccess: state.myThriveLink.ThriveLinkSuccess,
    IsDataSubmitedSuccessfully: state.myThriveLink.IsDataSubmitedSuccessfully,
    IsError: state.myThriveLink.IsError,
  };
};

const actionMethods = {
  getMyThriveLink: getMyThriveLink,
  updateMyThriveLink: updateMyThriveLink,
};

export default connect(mapStateToProps, actionMethods)(MyThriveLink);
