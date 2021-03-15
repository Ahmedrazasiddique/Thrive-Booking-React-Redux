import React, { Fragment } from "react";
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
  Form,
  Media,
} from "reactstrap";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Breadcrumbs from "../../../components/Breadcrumb";
import { connect } from "react-redux";
import {
  getCompanyData,
  updateCompanyData,
} from "../../../actions/companyInfoActions";
import Loader from "../../../../src/components/Loader/Loader";
import { baseURLImages } from "../../../Helper";
import { getAdminBusinessId } from "../../../utils/authHelper";

class Company extends React.Component {
  state = {
    companyInfo: {},
    timeZones: [],
    languages: [],
    countries: [],
    isShowLoader: true,
    timeZoneValue: {},
    countryValue: {},
    languageValue: {},
    isSlugUrlValid: true,
    isEmailValid: true,
    companyImageUrl: "",
    isImageChangedEventCalled: false,
    selectedFile: {},
    fields: {},
  };
  componentDidMount() {
    const { getCompanyData } = this.props;
    getCompanyData(1);
    this.setState({ isShowLoader: true });
  }

  componentDidUpdate(previousProp) {
    if (previousProp !== this.props) {
      if (this.props.CompanySuccess) {
        this.setState({ isShowLoader: false });
        this.setState({
          companyInfo: this.props.CompanyData.MainData.data,
          timeZones: this.props.CompanyData.timezones,
          languages: this.props.CompanyData.languages,
          countries: this.props.CompanyData.countries,
        });
        this.setState({
          timeZoneValue: this.props.CompanyData.MainData.data.timezone,
        });
        this.setState({
          countryValue: this.props.CompanyData.MainData.data.country,
        });
        this.setState({
          languageValue: this.props.CompanyData.MainData.data.language,
        });
        this.setState({
          companyImageUrl: this.props.CompanyData.MainData.data.company_logo,
        });
      }
      if (this.props.IsDataSubmitedSuccessfully) {
        // this.setState({isImageChangedEventCalled:false})
        toast.success("Company Info Updated Successfully");
        this.setState({ isShowLoader: false });
      }

      if (this.props.IsError) {
        toast.error("something went wrong");
        this.setState({ isShowLoader: false });
      }
    }
  }
  handleSwitchChange = (e) => {
    this.setState({
      guestUserCheckOut: this.state.guestUserCheckOut ? false : true,
    });
  };
  handleInputChange = (e) => {
    let value = { [e.target.name]: e.target.value };
    value = {
      ...this.state.companyInfo,
      ...value,
    };
    this.setState({
      companyInfo: {
        // object that we want to update
        ...this.state.companyInfo, // keep all other key-value pairs
        ...value, // update the value of specific key
      },
    });

    //url validator
    if (e.target.name === "url_slug") {
      var url = e.target.value;
      var r = new RegExp(/^(ftp|http|https):\/\/[^ "]+$/);
      r.test(url)
        ? this.setState({ isSlugUrlValid: true })
        : this.setState({ isSlugUrlValid: false });
    }
    if (e.target.name === "company_email") {
      var email = e.target.value;
      const r = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      r.test(String(email).toLowerCase())
        ? this.setState({ isEmailValid: true })
        : this.setState({ isEmailValid: false });
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ isShowLoader: true });
    //setIsShowLoader(true);
    const formData = new FormData(event.target);
    formData.append("business_id", getAdminBusinessId());
    formData.append("id", this.props.CompanyData.MainData.data.id);

    for (let [key, value] of formData.entries()) {
      console.log(key, value);
      //formObject[key]=value
    }
    // formObject.guest_user_checkout_status=this.state.guestUserCheckOut?"E":"D"

    this.props.updateCompanyData(formData);
  };
  changeCountry = (event) => {
    this.setState({ countryValue: event });
  };
  changeTime = (event) => {
    this.setState({ timeZoneValue: event });
  };
  changeLanguage = (event) => {
    this.setState({ languageValue: event });
  };

  onSelectFile = (e) => {
    this.setState({ isImageChangedEventCalled: true });
    if (!e.target.files || e.target.files.length === 0) {
      this.setState({ selectedFile: undefined });
      return;
    }

    const objectUrl = URL.createObjectURL(e.target.files[0]);
    this.setState({ companyImageUrl: objectUrl });
    // return () => URL.revokeObjectURL(objectUrl)
  };

  render() {
    const { companyInfo, timeZones, languages, countries } = this.state;

    return (
      <Fragment>
        <Breadcrumbs
          breadCrumbTitle="Company"
          breadCrumbParent="Settings"
          breadCrumbActive="Company"
        />
        <Card>
          <Loader isShowLoader={this.state.isShowLoader}></Loader>
          <CardHeader>
            <CardTitle>Company Details</CardTitle>
          </CardHeader>
          <CardBody>
            <Form onSubmit={this.handleSubmit}>
              <Row>
                <Col md="6" sm="12">
                  <FormGroup>
                    <h6 htmlFor="companyName">
                      Company Name <span className="RequiredMark">*</span>
                    </h6>
                    <input
                      className="form-control"
                      type="text"
                      name="company_name"
                      placeholder="Company Name"
                      onChange={this.handleInputChange}
                      value={companyInfo.company_name || ""}
                      required
                    />
                  </FormGroup>
                </Col>
                <Col md="6" sm="12">
                  <FormGroup>
                    <h6 htmlFor="language">Language</h6>
                    <Select
                      className="language"
                      classNamePrefix="select"
                      //   defaultValue={companyInfo.language}
                      value={this.state.languageValue || ""}
                      name="language_id"
                      options={languages}
                      onChange={this.changeLanguage}
                    />
                  </FormGroup>
                </Col>
                <Col md="6" sm="12">
                  <FormGroup>
                    <h6 htmlFor="timezone">TimeZone </h6>
                    <Select
                      classNamePrefix="select"
                      //  defaultValue={companyInfo.timezone}
                      value={this.state.timeZoneValue || ""}
                      name="timezone_id"
                      options={timeZones}
                      onChange={this.changeTime}
                    />
                  </FormGroup>
                </Col>
                <Col md="6" sm="12">
                  <FormGroup>
                    <h6 htmlFor="slugLanguage">
                      Slug Language <span className="RequiredMark">*</span>
                    </h6>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        http://domainName.com
                      </InputGroupAddon>
                      <input
                        className="form-control"
                        type="text"
                        name="url_slug"
                        placeholder="URL Slug"
                        onChange={this.handleInputChange}
                        value={companyInfo.url_slug || ""}
                      />
                    </InputGroup>
                    {!this.state.isSlugUrlValid ? (
                      <div className="field-error text-danger">Invalid Url</div>
                    ) : (
                      <></>
                    )}
                  </FormGroup>
                </Col>
                <Col md="6" sm="12">
                  <FormGroup>
                    <h6 htmlFor="email">
                      Email <span className="RequiredMark">*</span>
                    </h6>
                    <input
                      className="form-control"
                      type="text"
                      name="company_email"
                      placeholder="Type your email"
                      onChange={this.handleInputChange}
                      value={companyInfo.company_email || ""}
                      required
                    />
                    {!this.state.isEmailValid ? (
                      <div className="field-error text-danger">
                        Invalid Email
                      </div>
                    ) : (
                      <></>
                    )}
                  </FormGroup>
                </Col>
                <Col md="6" sm="12">
                  <FormGroup>
                    <h6 htmlFor="phone">
                      Phone <span className="RequiredMark">*</span>
                    </h6>
                    <input
                      className="form-control"
                      type="text"
                      name="phone_no"
                      placeholder="(012) 345 6789"
                      onChange={this.handleInputChange}
                      value={companyInfo.phone_no || ""}
                      required
                    />
                  </FormGroup>
                </Col>
                <Col sm="12">
                  <FormGroup>
                    <h6 htmlFor="address">
                      Address <span className="RequiredMark">*</span>
                    </h6>
                    <input
                      className="form-control"
                      type="textarea"
                      name="company_address"
                      onChange={this.handleInputChange}
                      value={companyInfo.company_address || ""}
                      required
                    />
                  </FormGroup>
                </Col>
                <Col md="6" sm="12">
                  <FormGroup>
                    <h6 htmlFor="address">
                      City <span className="RequiredMark">*</span>
                    </h6>
                    <input
                      className="form-control"
                      type="text"
                      name="company_city"
                      placeholder="City"
                      onChange={this.handleInputChange}
                      value={companyInfo.company_city || ""}
                      required
                    />
                  </FormGroup>
                </Col>
                <Col md="6" sm="12">
                  <FormGroup>
                    <h6 htmlFor="address">
                      State <span className="RequiredMark">*</span>
                    </h6>
                    <input
                      className="form-control"
                      type="text"
                      name="company_state"
                      placeholder="State"
                      onChange={this.handleInputChange}
                      value={companyInfo.company_state || ""}
                      required
                    />
                  </FormGroup>
                </Col>
                <Col md="6" sm="12">
                  <FormGroup>
                    <h6 htmlFor="address">Country</h6>
                    <Select
                      className="country"
                      classNamePrefix="select"
                      // defaultValue={companyInfo.country}
                      value={this.state.countryValue || ""}
                      options={countries}
                      onChange={this.changeCountry}
                      name={"company_country_id"}
                    />
                  </FormGroup>
                </Col>
                <Col md="6" sm="12">
                  <FormGroup>
                    <h6 htmlFor="address">
                      Zip Code <span className="RequiredMark">*</span>
                    </h6>
                    <input
                      className="form-control"
                      type="number"
                      name="company_zip_code"
                      placeholder="Zip"
                      onChange={this.handleInputChange}
                      value={companyInfo.company_zip_code || ""}
                      required
                    />
                  </FormGroup>
                </Col>
                <Col sm="6">
                  <FormGroup>
                    <h6 htmlFor="companyLogo">Company Logo</h6>

                    <Media>
                      <Media className="mr-1" left href="#">
                        <Media
                          className="rounded-circle"
                          object
                          src={
                            !this.state.isImageChangedEventCalled
                              ? baseURLImages + this.state.companyImageUrl
                              : this.state.companyImageUrl
                          }
                          alt="Company Logo"
                          height="64"
                          width="64"
                        />
                      </Media>
                      <Media className="mt-25" body>
                        <div className="d-flex flex-sm-row flex-column justify-content-start px-0">
                          <Button.Ripple
                            tag="label"
                            className="mr-50 cursor-pointer"
                            color="primary"
                            outline
                          >
                            Upload Photo
                            <input
                              type="file"
                              value={""}
                              onChange={this.onSelectFile}
                              name="company_logo"
                              id="uploadImg"
                              hidden
                            />
                          </Button.Ripple>
                        </div>
                        <p className="text-muted mt-50">
                          <small>
                            Allowed JPG, GIF or PNG. Max size of 800kB
                          </small>
                        </p>
                      </Media>
                    </Media>
                  </FormGroup>
                </Col>
                <Col className="d-flex justify-content-end flex-wrap" sm="12">
                  {this.state.isEmailValid && this.state.isSlugUrlValid ? (
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
        </Card>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    CompanyData: state.companyInfo.CompanyData,
    CompanySuccess: state.companyInfo.CompanySuccess,
    //  TimeZones:state.companyInfo.CompanyData.timezones,
    //  Countries:state.companyInfo.CompanyData.countries,
    //  Languages:state.companyInfo.CompanyData.languages,
    IsDataSubmitedSuccessfully: state.companyInfo.IsDataSubmitedSuccessfully,
  };
};

const actionMethods = {
  getCompanyData: getCompanyData,
  updateCompanyData: updateCompanyData,
};

export default connect(mapStateToProps, actionMethods)(Company);
