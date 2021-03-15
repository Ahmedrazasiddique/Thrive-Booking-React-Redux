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
  Input,
  InputGroup,
  InputGroupAddon,
  CustomInput,
  Form,
} from "reactstrap";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Breadcrumbs from "../../../components/Breadcrumb";
import { connect } from "react-redux";
import { getCompanyData,updateCompanyData } from "../../../actions/companyInfoActions";
import Loader  from "../../../../src/components/Loader/Loader"

const languageOptions = [
  { value: "0", label: "English (United States)" },
  { value: "1", label: "English (United Kingdom)" },
  { value: "2", label: "Arabic" },
  { value: "3", label: "German" },
];

const timezoneOptions = [
  { value: "0", label: "(GMT - 05:00) Central Time - Chicago" },
  { value: "1", label: "(GMT - 05:00) Central Time - NewYourk" },
  { value: "2", label: "(GMT - 05:00) Central Time - Albama" },
  { value: "3", label: "(GMT - 05:00) Central Time - Alaska" },
];

const countryOptions = [
  { value: "0", label: "United State" },
  { value: "1", label: "Pakistan" },
  { value: "2", label: "Germany" },
  { value: "3", label: "United Kingdom" },
];

class Company extends React.Component {

  constructor(props)
  {
    super(props);
  }
  state = {
    companyInfo:{},
    timeZones:[],
    languages:[],
    countries:[],
    isShowLoader:true
  }
  componentDidMount() {
    const { getCompanyData } = this.props;
   
    getCompanyData(1);
    
    this.setState({isShowLoader:true});
  }

  componentDidUpdate(previousProp) {
    if (previousProp != this.props) {
      if(this.props.CompanySuccess)
      {
    
        this.setState({isShowLoader:false});
        this.setState({companyInfo:this.props.CompanyData.data,
          timeZones:this.props.TimeZones ,
          languages:this.props.Languages,
          countries:this.props.Countries,
        
        })
      }
      if(this.props.IsDataSubmitedSuccessfully)
      {
        toast.success("Event Settings Updated Successfully");
      }
    
      if(this.props.IsError)
      { 
       
        toast.error("something went wrong");
      }
    

    }
  }
  handleSwitchChange = (e) => {
  
    this.setState({guestUserCheckOut:this.state.guestUserCheckOut?false:true});
  //  let value = { [e.target.name]: e.target.value } ;
  //  value = {
  //      ...EventData,
  //      ...value,
 //   };
    //setEventData( {[e.target.name]: e.target.value} )
   // console.log(inputs);
  }

   handleSubmit = (event) => {
    debugger
    event.preventDefault();
    this.setState({isShowLoader:true});
    //setIsShowLoader(true);
    const formData = new FormData(event.target);
   // formData.append('business_id', 1);
    //formData.append('id', this.state.EventData.id);
    var formObject = {};
    //formObject.business_id=1;
    //formObject.id=1;
 
    for (let [key, value] of formData.entries()) {
        console.log(key, value);
        formObject[key]=value
    }
   // formObject.guest_user_checkout_status=this.state.guestUserCheckOut?"E":"D"
    
  this.props.updateCompanyData(formObject)

}

  render() {
    const {companyInfo,timeZones,languages,countries} = this.state
    debugger
    return (
      <Fragment>
        
        <Breadcrumbs
          breadCrumbTitle="Company"
          breadCrumbParent="Settings"
          breadCrumbActive="Company"
        />
        <Card>
          
  <Loader isShowLoader={this.state.isShowLoader }></Loader>
          <CardHeader>
            <CardTitle>Company Details</CardTitle>
          </CardHeader>
          <CardBody>
            
                <Form onSubmit={this.handleSubmit}>
                  <Row>
                    <Col sm="12">
                      <FormGroup>
                        <h6 htmlFor="companyLogo">Company Logo</h6>
                        <CustomInput
                          type="file"
                          name="company_logo"
                          id="companyLogo"
                         
                          value={companyInfo.company_logo}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6" sm="12">
                      <FormGroup>
                        <h6 htmlFor="companyName">Company Name</h6>
                        <Input
                          className="form-control"
                          type="text"
                          name="company_name"
                          placeholder="Company Name"
                        
                          value={companyInfo.company_name}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6" sm="12">
                      <FormGroup>
                        <h6 htmlFor="language">Language</h6>
                        <Select
                          className="language"
                          classNamePrefix="select"
                          defaultValue={companyInfo.language}
                          value={companyInfo.language}
                          name="language_id"
                          options={languages}
                         
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6" sm="12">
                      <FormGroup>
                        <h6 htmlFor="timezone">TimeZone</h6>
                        <Select
                          className="timezone"
                          classNamePrefix="select"
                          defaultValue={companyInfo.timezone}
                          value={companyInfo.timezone}
                          name="timezone_id"
                          options={timeZones}
                         
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6" sm="12">
                      <FormGroup>
                        <h6 htmlFor="slugLanguage">Slug Language</h6>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            http://domainName.com
                          </InputGroupAddon>
                          <Input
                            className="form-control"
                            type="text"
                            name="url_slug"
                            placeholder="URL Slug"
                           
                          value={companyInfo.url_slug}
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                    <Col md="6" sm="12">
                      <FormGroup>
                        <h6 htmlFor="email">Email</h6>
                        <Input
                          className="form-control"
                          type="text"
                          name="company_email"
                          placeholder="Type your email"
                         
                          value={companyInfo.company_email}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6" sm="12">
                      <FormGroup>
                        <h6 htmlFor="phone">Phone</h6>
                        <Input
                          className="form-control"
                          type="text"
                          name="phone_no"
                          placeholder="(012) 345 6789"
                         
                          value={companyInfo.phone_no}
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="12">
                      <FormGroup>
                        <h6 htmlFor="address">Address</h6>
                        <Input
                          className="form-control"
                          type="textarea"
                          name="address"
                         
                          value={companyInfo.address}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6" sm="12">
                      <FormGroup>
                        <Input
                          className="form-control"
                          type="text"
                          name="company_city"
                          placeholder="City"
                          
                          value={companyInfo.company_city}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6" sm="12">
                      <FormGroup>
                        <Input
                          className="form-control"
                          type="text"
                          name="company_state"
                          placeholder="State"
                         
                          value={companyInfo.company_state}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6" sm="12">
                      <FormGroup>
                        <Select
                          className="country"
                          classNamePrefix="select"
                          defaultValue={companyInfo.country}
                          value={companyInfo.country}
                          options={countries}
                         
                          name={"company_country_id"}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6" sm="12">
                      <FormGroup>
                        <Input
                          className="form-control"
                          type="text"
                          name="company_zip_code"
                          placeholder="Zip"
                         
                          value={companyInfo.company_zip_code}
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="12">
                    <Button.Ripple className="mr-1" color="primary">
              Save Changes
            </Button.Ripple>
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
    CompanyData: state.companyInfo.CompanyData.MainData?state.companyInfo.CompanyData.MainData:{},
    CompanySuccess:state.companyInfo.CompanySuccess,
    TimeZones:state.companyInfo.CompanyData.timezones,
    Countries:state.companyInfo.CompanyData.countries,
    Languages:state.companyInfo.CompanyData.languages,
    
  };
};

const actionMethods = {
  getCompanyData: getCompanyData,
  updateCompanyData:updateCompanyData,
  
};

export default connect(mapStateToProps, actionMethods)(Company);
