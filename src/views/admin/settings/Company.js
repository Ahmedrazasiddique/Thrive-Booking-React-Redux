import React, { Fragment } from "react";
import {
  
  Button,
  
  Col,
 
  Form,
  Media,
} from "reactstrap";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import defaultImage from '../../../assets/images/no-event-image.jpg'
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
          
          companyImageUrl: this.props.CompanyData.MainData.data.company_logo
         
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
       
        <div class="eventdetailsaddbox rd_noshadow">
        <Loader isShowLoader={this.state.isShowLoader}></Loader>
            <div class="rd_supertoptwocom">
                <h3 class="rd_mbdispno">Company</h3>
                <div class="boxheader rd_floatingheaderthig">
                    <div class="rd_inputselectheader">
                        <div class="rd_selectheaderrdt2 rd_selectheaderrdt2profile">
                            <h3>
                                <span class="dashboardmenuicon"></span>
                                <span class="rd_nextarrows"></span>
                                Settings
                                <span class="rd_nextarrows"></span>
                                <a href="#">Company</a>
                            </h3>
                          </div>
        
                    </div>
                  </div>
            </div>
            
          <div class="rd_vacationfilterpart rd_vacationfilterpart3">
            <Form onSubmit={this.handleSubmit}>
            <div class="rd_profilerd_erpart">
                <div class="rd_vacationflex2">
                    <p>Company name *</p>
                      <div class="rd_profilethingco">
                      
                           <input type="text" id="" 
                      type="text"
                      name="company_name"
                      placeholder="Company Name"
                      onChange={this.handleInputChange}
                      value={companyInfo.company_name || ""}
                      required
                   
                    className="rd_adddayofinput"/>
    
                      </div>
                </div>
                <div class="rd_vacationflex2">
                      <p>Language *</p>
                      <div class="rd_profilethingco">
                        
                        <Select
                      className="language rd_adddayofinput"
                      classNamePrefix="select"
                      //   defaultValue={companyInfo.language}
                      value={this.state.languageValue || ""}
                      name="language_id"
                      options={languages}
                      onChange={this.changeLanguage}
                    />
                          
                      </div>
              </div>
              <div class="rd_vacationflex2">
                    <p>TimeZone *</p>
                    <div class="rd_profilethingco">
                    <div class="">
                    <Select
                      classNamePrefix="select"
                      //  defaultValue={companyInfo.timezone}
                      value={this.state.timeZoneValue || ""}
                      name="timezone_id"
                      options={timeZones}
                      onChange={this.changeTime}
                    />
                        </div>
                    </div>    
                </div>

              </div>
             
              <div class="rd_profilerd_erpart">
                <div class="rd_vacationflex3">
                    <p>Slug Url *</p>
                    <div class="input-group">
                        <div class="input-group-prepend rd_dropdownbtn">
                            <div class="input-group-text rd_domainunofi">http://meetocto.com</div>
                        </div>
                      
                        <input
                        className="form-control noshadfoc"
                        type="text"
                        name="url_slug"
                        placeholder="URL Slug"
                        onChange={this.handleInputChange}
                        value={companyInfo.url_slug || ""}
                      />
                    </div>
                    {!this.state.isSlugUrlValid ? (
                      <div className="field-error text-danger">Invalid Url</div>
                    ) : (
                      <></>
                    )}
                </div>
                <div class="rd_vacationflex2">
                    <p>Email *</p>
                    <div class="rd_profilethingco">
                    
                    <input
                      className="rd_adddayofinput"
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
                </div>
              </div>
              </div>
               
              <div class="rd_profilerd_erpart">
                <div class="rd_vacationflex2">
                    <p>Phone *</p>
                    <div class="rd_profilethingco">
                       
                        <input
                      className="rd_adddayofinput"
                      type="text"
                      name="phone_no"
                      placeholder="(012) 345 6789"
                      onChange={this.handleInputChange}
                      value={companyInfo.phone_no || ""}
                      required
                    />
                    </div>    
                </div>
                <div class="rd_vacationflex3">
                    <p>Address *</p>
                    <div className="rd_profilethingco">
                    <input
                      className="rd_adddayofinput"
                      type="text"
                      name="company_address"
                      onChange={this.handleInputChange}
                      value={companyInfo.company_address || ""}
                      required
                    />
                        
                    </div> 
                </div>
              </div>
            
              <div class="rd_profilerd_erpart rd_profilerd_erpart2">
                <div class="rd_vacationflex2">
                    <p>City</p>
                      <div class="rd_adddayofinput">
                      <input
                      className="rd_adddayofinput"
                      type="text"
                      name="company_city"
                      placeholder="City"
                      onChange={this.handleInputChange}
                      value={companyInfo.company_city || ""}
                      required
                    />
                       
    
                      </div>
                </div>
                <div class="rd_vacationflex2">
                    <p>State</p>
                      <div class="rd_profilethingco">
                      <input
                      className="rd_adddayofinput"
                      type="text"
                      name="company_state"
                      placeholder="State"
                      onChange={this.handleInputChange}
                      value={companyInfo.company_state || ""}
                      required
                    />
    
                      </div>
                </div>
                <div class="rd_vacationflex2">
                    <p>Zip Number</p>
                      <div class="rd_profilethingco">
                      <input
                      className="rd_adddayofinput"
                      type="number"
                      name="company_zip_code"
                      placeholder="Zip"
                      onChange={this.handleInputChange}
                      value={companyInfo.company_zip_code || ""}
                      required
                    />
    
                      </div>
                </div>
                <div class="rd_vacationflex2">
                    <p>Country</p>
                    <div class="">
                    <Select
                      className="country"
                      classNamePrefix="select"
                      // defaultValue={companyInfo.country}
                      value={this.state.countryValue || ""}
                      options={countries}
                      onChange={this.changeCountry}
                      name={"company_country_id"}
                    />
                    </div>

                        
                </div>

              </div>
              <div class="rd_profileimagepart">
                <div class="rd_imagethincontg">
                    <p>Company Logo</p>

                    <img  src={
                            !this.state.isImageChangedEventCalled
                              ? baseURLImages + this.state.companyImageUrl
                              : this.state.companyImageUrl
                          } alt=""/>
                </div>
                <div class="rd_imagethincontgbtnt">
                    <p>Allowed JPG, GIF or PNG. Max size of 800kB</p>
                    <label
                            
                            className="newButtonClass"
                           
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
                          </label>  
                          {/*<label type="button"   className="newButtonClass"
                            
                            >
                     Remove
                        </label>*/}
                </div>
            </div>

             

                <Col className="d-flex justify-content-end flex-wrap" sm="12">
                  {this.state.isEmailValid && this.state.isSlugUrlValid ? (
                    <Button.Ripple className="mr-1" color="primary">
                      Save Changes
                    </Button.Ripple>
                  ) : (
                    <></>
                  )}
                </Col>
            
            </Form>

            <ToastContainer />
            </div>
            </div>
    
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
