import React from "react";
import { Row, Col, Button, Form, Input, Label, FormGroup } from "reactstrap";
import { Check, User, MapPin } from "react-feather";
import Select from "react-select";
import Flatpickr from "react-flatpickr";
import { connect } from "react-redux";
import {
  updateDirectoryInformation,
  saveDirectoryInformation,
  getSingleUserByIDDirectoryInformation
} from "../../../../../../actions/directoryInformationAction";
import Loader from "../../../../../../../src/components/Loader/Loader";
import {
  getAdminBusinessId,
} from "../../../../../../utils/authHelper";
import "flatpickr/dist/themes/light.css";
import "../../../../../../../src/assets/scss/plugins/forms/flatpickr/flatpickr.scss";
import Checkbox from "../../../../../../../src/components/Checkbox/CheckboxesVuexy";
import { ToastContainer, toast } from "react-toastify";

class UserInfoTab extends React.Component {

  componentDidMount() {
   
    const { getSingleUserByIDDirectoryInformation } = this.props;
    if(this.props.UserID&&this.props.UserID>0){
    getSingleUserByIDDirectoryInformation(this.props.UserID);
    this.setState({ isShowLoader: true });
    }
  }

  state = {
    dob: new Date("1995-05-22"),
    languages: this.props.languages,
    countries: this.props.countries, 
    isShowLoader:false,
    userInfo:{},
  };
  handledob = (date) => {
    this.setState({
      dob: date,
    });
  };

 
  componentDidUpdate(previousProp) {
    if (previousProp !== this.props) {
      if (this.props.IsDataSubmitedSuccessfullyDirectoryInformation) {
        
        
 toast.success("Directory Information Updated Successfully");
       this.setState({ isShowLoader: false });
    //   window.location.replace('http://example.com/#');
      }
      if (this.props.DirectoryInformationSuccess) {
        this.setState({ isShowLoader: false });
        this.setState({ userInfo: this.props.DInfoData.data
         });
        this.setState({
          countryValue: this.props.DInfoData.data.country,
        });
        this.setState({
          languageValue: this.props.DInfoData.data.language,
        });
        //this.setState({ employeeImageUrl: this.props.DInfoData.data.profile_image });
       }
    }
  }
  
handleInputChange = (e) => {
  let value = { [e.target.name]: e.target.value };
  value = {
    ...this.state.userInfo,
    ...value,
  };
  this.setState({
    userInfo: {
      // object that we want to update
      ...this.state.userInfo, // keep all other key-value pairs
      ...value, // update the value of specific key
    },
  });
}
handleSwitchChange = (e) => {
  this.setState({ [e.target.id]: this.state[e.target.id] ? false : true });
};

  handleSubmit = (event) => {

    event.preventDefault();
    this.setState({ isShowLoader: true });
    this.state.userInfo.country_id= this.state.userInfo.country.value
    delete this.state.userInfo.country
    delete this.state.userInfo.profile_image
    this.state.userInfo.business_id=getAdminBusinessId()
    this.state.userInfo.username="fortestingusername" // waiting for mansoor bhai
    const formData = new FormData(event.target);
    formData.append("business_id", getAdminBusinessId());
    for (let [key, value] of Object.entries(this.state.userInfo)) {
    
      for (let [key1, value1] of formData.entries()) {
        if (key1 === key) {
          continue
        }
      }
    
      formData.append(key, value);
     
    }
  
  console.log('Data',formData)
    this.props.updateDirectoryInformation(formData);
  };

  changeCountry = (event) => {
    this.setState({ countryValue: event });
  };

  changeLanguage = (event) => {
    this.setState({ languageValue: event });
  };

  render() {
    const { languages, countries } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Loader isShowLoader={this.state.isShowLoader}></Loader>
        <Row className="mt-1">
          <Col className="mt-1" md="6" sm="12">
            <h5 className="mb-1">
              <User className="mr-50" size={16} />
              <span className="align-middle">Personal Info</span>
            </h5>
            <FormGroup>
              <Label className="d-block" for="dob">
                Date of birth
              </Label>
              <Flatpickr
                id="dob"
                className="form-control"
                options={{ dateFormat: "Y-m-d" }}
                value={this.state.dob}
                onChange={(date) => this.handledob(date)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="contactnumber">Contact Number</Label>
              <Input
                type="number"
                name="phone"
                placeholder="Contact Number"
                onChange={this.handleInputChange}
                value={this.state.userInfo.phone||''}
              />
            </FormGroup>
            <FormGroup>
              <Label for="website">Website</Label>
              <Input type="url" name="website" value={this.state.userInfo.website||''}
                  onChange={this.handleInputChange}  placeholder="Web Address" />
            </FormGroup>
            <FormGroup>
              <Label for="languages">Languages</Label>
            
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
            <FormGroup>
              <Label className="d-block mb-50">Gender</Label>
              <Input type="select"
                   value={this.state.userInfo.gender||''}
                  onChange={this.handleInputChange} 
                  name="status" id="status">
                    <option value="M">Male</option>
                    <option value="F"> Female</option>
                   
                  </Input>
            </FormGroup>
            <FormGroup>
              <Label className="d-block mb-50" for="communication">
                Communication
              </Label>
              <div className="d-inline-block mr-1">
                <Checkbox
                  color="primary"
                  icon={<Check className="vx-icon" size={16} />}
                  label="Email"
                  defaultChecked={false}
                  onChange={this.handleSwitchChange}
                />
              </div>
              <div className="d-inline-block mr-1">
                <Checkbox
                  color="primary"
                  icon={<Check className="vx-icon" size={16} />}
                  label="SMS"
                  defaultChecked={false}
                  onChange={this.handleSwitchChange}
                />
              </div>
              <div className="d-inline-block">
                <Checkbox
                  color="primary"
                  icon={<Check className="vx-icon" size={16} />}
                  label="Phone"
                  defaultChecked={false}
                  onChange={this.handleSwitchChange}
                />
              </div>
            </FormGroup>
          </Col>
          <Col className="mt-1" md="6" sm="12">
            <h5 className="mb-1">
              <MapPin className="mr-50" size={16} />
              <span className="align-middle">Address</span>
            </h5>
            <FormGroup>
              <Label for="address1">Address Line 1</Label>
              <Input type="text" name="address_line_1"  value={this.state.userInfo.address_line_1||''}
                  onChange={this.handleInputChange}  placeholder="Address Line 1" />
            </FormGroup>
            <FormGroup>
              <Label for="address1">Address Line 2</Label>
              <Input type="text" name="address_line_2"  value={this.state.userInfo.address_line_2||''}
                  onChange={this.handleInputChange}  placeholder="Address Line 2" />
            </FormGroup>
           
            <FormGroup>
              <Label for="city">City</Label>
              <Input
                type="text"
                defaultValue="Camden Town"
                name="city"
                placeholder="City"
                value={this.state.userInfo.city||''}
                onChange={this.handleInputChange} 
              />
            </FormGroup>
            <FormGroup>
              <Label for="State">State</Label>
              <Input
                type="text"
                defaultValue="London"
                name="state"
                placeholder="State"
                value={this.state.userInfo.state||''}
                onChange={this.handleInputChange} 
              />
            </FormGroup>
            <FormGroup>
              <Label for="Country">Country</Label>
              <Select
                      className="country"
                      classNamePrefix="select"
                      // defaultValue={companyInfo.country}
                      value={this.state.countryValue || ""}
                      options={countries}
                      onChange={this.changeCountry}
                      name={"country_id"}
                    />
            </FormGroup>
          </Col>
          <Col className="d-flex justify-content-end flex-wrap" sm="12">
            <Button.Ripple className="mr-1" color="primary">
              Save Changes
            </Button.Ripple>
           
          </Col>
          <ToastContainer />
        </Row>
      </Form>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    DInfoData: state.directoryinformation.data,
    DirectoryInformationSuccess: state.directoryinformation.DirectoryInformationSuccess,
    IsDataSubmitedSuccessfullyDirectoryInformation: state.directoryinformation.IsDataSubmitedSuccessfullyDirectoryInformation,
  };
};

const actionMethods = {
  updateDirectoryInformation: updateDirectoryInformation,
  saveDirectoryInformation: saveDirectoryInformation,
   getSingleUserByIDDirectoryInformation: getSingleUserByIDDirectoryInformation
};

export default connect(mapStateToProps, actionMethods)(UserInfoTab);