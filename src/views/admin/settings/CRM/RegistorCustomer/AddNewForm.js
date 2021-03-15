import React, { useState, useEffect } from "react";
import {
  CardBody,
  FormGroup,
  Button,
  Label,
  Row,
  Col,
  Input,
  Form,
} from "reactstrap";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorSpan from "../../../../../../src/components/Extra/ErrorSpan";
import { User, Mail, Smartphone, Flag, Hash, Circle } from "react-feather";
import Loader from "../../../../../../src/components/Loader/Loader";
import { connect } from "react-redux";
import { updateCrm, saveCrm } from "../../../.././../actions/crmAction";
import { getAdminBusinessId } from "../../../../../utils/authHelper";

const AddNewForm = (props) => {
  console.log("Edit Data", props.EditData);
  const [MyProfileData, setMyProfileData] = useState(props.EditData);
  const [isShowLoader, setIsShowLoader] = useState(true);
  const [countries, setCountries] = useState([]);
  const [countryValue, setCountryValue] = useState([]);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPhoneValid, setIsPhoneValid] = useState(true);

  // image code
  const [selectedFile, setSelectedFile] = useState();
  const [profileImageUrl, setProfileImageUrl] = useState(true);
  const [isImageChangedEventCalled, setIsImageChangedEventCalled] = useState(
    false
  );

  const handleInputChange = (e) => {
    if (e.target.name == "email") {
      var email = e.target.value;
      const r = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      r.test(String(email).toLowerCase())
        ? setIsEmailValid(true)
        : setIsEmailValid(false);
    }
    if (e.target.name == "phone") {
      var email = e.target.value;
      const r = /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i;
      r.test(String(email).toLowerCase())
        ? setIsPhoneValid(true)
        : setIsPhoneValid(false);
    }

    let value = { [e.target.name]: e.target.value };
    value = {
      ...MyProfileData,
      ...value,
    };
    setMyProfileData({ [e.target.name]: e.target.value });
    // console.log(inputs);
  };
  const changeCountry = (event) => {
    setCountryValue(event);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsShowLoader(true);
    const formData = new FormData(event.target);
    formData.append("business_id", getAdminBusinessId());

    if (props.EditData.id) {
      formData.append("id", props.EditData.id);
      props.updateCrm(formData);
    } else {
      props.saveCrm(formData);
    }

    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
  };
  useEffect(() => {
    if (props.IsDataSubmitedSuccessfullyCrm) {
      setIsShowLoader(false);
      toast.success("My Profile Updated Successfully");
    }

    if (props.IsError) {
      setIsShowLoader(false);
      toast.error("something went wrong");
    }
  }, [props.IsDataSubmitedSuccessfullyCrm, props.IsError]);

  useEffect(() => {
    if (props.EditData) {
      setMyProfileData(props.EditData);
      setCountries(props.CountryDD);
      setIsShowLoader(false);
      setCountryValue(props.EditData.country);
      //setProfileImageUrl(props.MyProfileData.profile_image)
      console.log(MyProfileData);
    } else {
      setIsShowLoader(true);
    }
  }, []);

  return (
    <CardBody>
      <Loader isShowLoader={isShowLoader}></Loader>

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col sm="6">
            <Col sm="12">
              <Label for="firstName">
                First Name <ErrorSpan></ErrorSpan>
              </Label>
              <FormGroup className="has-icon-left position-relative">
                <Input
                  className="form-control"
                  type="text"
                  name="first_name"
                  id="first_name"
                  placeholder="First Name"
                  value={MyProfileData.first_name}
                  onChange={handleInputChange}
                  required
                />
                <div className="form-control-position">
                  <User size={15} />
                </div>
              </FormGroup>
            </Col>
            <Col sm="12">
              <Label for="lastName">
                Last Name <ErrorSpan></ErrorSpan>
              </Label>
              <FormGroup className="has-icon-left position-relative">
                <Input
                  className="form-control"
                  type="text"
                  name="last_name"
                  id="last_name"
                  placeholder="Last Name"
                  value={MyProfileData.last_name}
                  onChange={handleInputChange}
                  required
                />
                <div className="form-control-position">
                  <User size={15} />
                </div>
              </FormGroup>
            </Col>
            <Col sm="12">
              <Label for="IconsMobile">
                Email <ErrorSpan></ErrorSpan>
              </Label>
              <FormGroup className="has-icon-left position-relative">
                <Input
                  className="form-control"
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Type your email"
                  value={MyProfileData.email}
                  onChange={handleInputChange}
                  required
                />
                <div className="form-control-position">
                  <Mail size={15} />
                </div>

                {!isEmailValid ? (
                  <div class="field-error text-danger">Invalid Email</div>
                ) : (
                  <></>
                )}
              </FormGroup>
            </Col>

            <Col sm="12">
              <Label for="IconsMobile">Phone</Label>
              <FormGroup className="has-icon-left position-relative">
                <Input
                  type="text"
                  name="text"
                  id="phone"
                  name="phone"
                  placeholder="(012) 345 6789"
                  value={MyProfileData.phone}
                  onChange={handleInputChange}
                />
                <div className="form-control-position">
                  <Smartphone size={15} />
                </div>

                {!isPhoneValid ? (
                  <div class="field-error text-danger">Invalid Phone #</div>
                ) : (
                  <></>
                )}
              </FormGroup>
            </Col>
          </Col>
          <Col sm="6">
            <Row>
              <Col sm="12">
                <Label for="address">Address</Label>
                <FormGroup className="has-icon-left position-relative">
                  <textarea
                    name="address_line_1"
                    value={MyProfileData.address_line_1}
                    onChange={handleInputChange}
                    id="address"
                    class="form-control textAreaCss"
                  ></textarea>
                </FormGroup>
              </Col>
              <br />
            </Row>
            <Row>
              <Col sm="6">
                <Label for="city">City</Label>
                <FormGroup className="has-icon-left position-relative">
                  <Input
                    className="form-control"
                    type="text"
                    name="city"
                    id="city"
                    placeholder="city"
                    value={MyProfileData.city}
                    onChange={handleInputChange}
                  />
                  <div className="form-control-position">
                    <Flag size={15} />
                  </div>
                </FormGroup>
              </Col>
              <Col sm="6">
                <Label for="state">State</Label>
                <FormGroup className="has-icon-left position-relative">
                  <Input
                    className="form-control"
                    type="text"
                    name="state"
                    id="state"
                    placeholder="state"
                    value={MyProfileData.state}
                    onChange={handleInputChange}
                  />
                  <div className="form-control-position">
                    <Circle size={15} />
                  </div>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col sm="6">
                <Label for="zip">Zip</Label>
                <FormGroup className="has-icon-left position-relative">
                  <Input
                    className="form-control"
                    type="number"
                    name="zip"
                    id="zip"
                    placeholder="Zip"
                    value={MyProfileData.zip}
                    onChange={handleInputChange}
                  />
                  <div className="form-control-position">
                    <Hash size={15} />
                  </div>
                </FormGroup>
              </Col>
              <Col sm="6">
                <Label for="country">Country</Label>
                <FormGroup className="has-icon-left position-relative">
                  <Select
                    className="country"
                    classNamePrefix="select"
                    defaultValue={MyProfileData.country}
                    value={countryValue}
                    options={countries}
                    name="country_id"
                    onChange={changeCountry}
                  />
                </FormGroup>
              </Col>
            </Row>
          </Col>
          <br /> <br /> <br />
          <Col
            className="modal-footer d-flex justify-content-end flex-wrap"
            sm="12"
          >
            {isEmailValid ? (
              <Button.Ripple className="mr-1" color="primary">
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
  );
};
//}
const mapStateToProps = (state) => {
  return {
    IsDataSubmitedSuccessfullyCrm: state.crm.IsDataSubmitedSuccessfullyCrm,
    IsError: state.crm.IsError,
  };
};

const actionMethods = {
  updateCrm: updateCrm,
  saveCrm: saveCrm,
};

export default connect(mapStateToProps, actionMethods)(AddNewForm);
