import React, { useState, useEffect } from "react";
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
  InputGroup,
  InputGroupAddon,
  CustomInput,
  Media,
  Form
} from "reactstrap";
import Select from "react-select";
import * as Yup from "yup"
import { Formik, Field,ErrorMessage } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DropzoneAccept from "../../../components/Dropzone/DropzoneAccept"
import "../../../../src/assets/scss/plugins/extensions/dropzone.scss"
import SweetAlert from 'react-bootstrap-sweetalert';
import {TabContent, TabPane, Nav, NavItem, NavLink} from "reactstrap"
import ErrorSpan from "../../../components/Extra/ErrorSpan"
import { Check, User, Mail, Smartphone, Lock ,Code,Flag,Hash,Circle} from "react-feather"
import "../../../../src/assets/scss/style.scss"
import img from "../../../../src/assets/img/portrait/small/avatar-s-11.jpg"
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getMyProfileData,updateMyProfileData } from "../../../actions/myProfileActions";
import Loader  from "../../../../src/components/Loader/Loader"

const ProfileSchema = Yup.object().shape({
  firstName: Yup.string()
   // .email("Invalid email address")
    .required("Required"),
    lastName: Yup.string()
    //.email("Invalid email address")
    .required("Required"),

    email: Yup.string()
    .email("Invalid email address")
    .required("Required"),

  
})

const countryOptions = [
  { value: "0", label: "United State" },
  { value: "1", label: "Pakistan" },
  { value: "2", label: "Germany" },
  { value: "3", label: "United Kingdom" },
];

const ProfileInfo = (props) => {
  const [MyProfileData, setMyProfileData] = useState({});
  const[isShowLoader , setIsShowLoader] =useState(true);
  const[countries , setCountries] =useState([]);
  
  useEffect(() => {
    if(!props.MyProfileSuccess)
    props.getMyProfileData(1);
  });
  const handleInputChange = (e) => {
  
    let value = { [e.target.name]: e.target.value } ;
    value = {
        ...MyProfileData,
        ...value,
    };
    setMyProfileData( {[e.target.name]: e.target.value} )
   // console.log(inputs);
  }

  const handleSubmit = (event) => {
   
    event.preventDefault();
    
    setIsShowLoader(true);
    const formData = new FormData(event.target);
    //formData.append('business_id', 1);
 
    for (let [key, value] of formData.entries()) {
        console.log(key, value);
    }
  props.updateMyProfileData(formData)// need to pass id from token

}
useEffect(() => {

  if(props.IsDataSubmitedSuccessfully)
  {setIsShowLoader(false);
    toast.success("My Profile Updated Successfully");
  }

  if(props.IsError)
  { 
    setIsShowLoader(false);
    toast.error("something went wrong");
  }}
  ,[props.IsDataSubmitedSuccessfully,props.IsError]);

  useEffect(() => {

    if(props.MyProfileSuccess)
    {
     
    setMyProfileData(props.MyProfileData)
    setCountries(props.countryDD)
    setIsShowLoader(false);
    console.log(MyProfileData)
    }else
    {
      setIsShowLoader(true);
    }
   

  },[props.MyProfileData,props.MyProfileSuccess]);


    return (
      
    
        
      
        <CardBody>
          <Loader isShowLoader={isShowLoader}></Loader>
      
                <Form onSubmit={handleSubmit}>
                <Row>
                  <Col sm="6">
                  <Col sm="12">
                    <Label for="firstName">First Name <ErrorSpan></ErrorSpan></Label>
                    <FormGroup className="has-icon-left position-relative">
                      <Input
                       className="form-control"
                        type="text"
                        name="first_name"
                        id="first_name"
                        placeholder="First Name"
                        value={MyProfileData.first_name}
                        onChange={handleInputChange}
                      />
                      <div className="form-control-position">
                        <User size={15} />
                      </div>
                     

                    </FormGroup>
                  </Col>
                  <Col sm="12">
                    <Label for="lastName">Last Name <ErrorSpan></ErrorSpan></Label>
                    <FormGroup className="has-icon-left position-relative">
                      <Input
                        className="form-control"
                        type="text"
                        name="last_name"
                        id="last_name"
                        placeholder="Last Name"
                        value={MyProfileData.last_name}
                        onChange={handleInputChange}
                      />
                      <div className="form-control-position">
                        <User size={15} />
                      </div>
                   
                    </FormGroup>
                  </Col>
                  <Col sm="12">
                    <Label for="IconsMobile">Email <ErrorSpan></ErrorSpan></Label>
                    <FormGroup className="has-icon-left position-relative">
                      <Input
                       className="form-control"
                        type="text"
                        name="email"
                        id="email"
                        placeholder="Type your email"
                        value={MyProfileData.email}
                        onChange={handleInputChange}
                      />
                      <div className="form-control-position">
                        <Mail size={15} />
                      </div>
                   
                    </FormGroup>
                  </Col>

                  <Col sm="12">
                    <Label for="IconsMobile">Phone</Label>
                    <FormGroup className="has-icon-left position-relative">
                      <Input
                        type="text"
                        name="phone"
                        id="phone"
                        placeholder="(012) 345 6789"
                        value={MyProfileData.phone}
                        onChange={handleInputChange}
                      />
                      <div className="form-control-position">
                        <Smartphone size={15} />
                      </div>
                    
                    </FormGroup>
                  </Col>
                  <Col sm="12">
                  <Media>
          <Media className="mr-1" left href="#">
            <Media
              className="rounded-circle"
              object
              src={img}
              alt="User"
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
                <Input type="file" name="profile_image" id="uploadImg" hidden />
              </Button.Ripple>
              <Button.Ripple color="flat-danger">Remove</Button.Ripple>
            </div>
            <p className="text-muted mt-50">
              <small>Allowed JPG, GIF or PNG. Max size of 800kB</small>
            </p>
          </Media>
        </Media>
                  </Col>

                  </Col>

                  <Col sm="6">
                  <Row>
                  <Col sm="12">
                    <Label for="address">Address</Label>
                    <FormGroup className="has-icon-left position-relative">
                     
                    <textarea name="address"     value={MyProfileData.address}
                        onChange={handleInputChange} id="address" class="form-control textAreaCss"></textarea>
                     
                    </FormGroup>
                  </Col>
                  <br/>
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
                        type="text"
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
                        value={MyProfileData.country}
                        options={countries}
                        name="country_id" 
                       
                        
                      />
                    
                    </FormGroup>
                  </Col>
                  </Row>

                  </Col>
                
                
                  <Col className="d-flex justify-content-end flex-wrap" sm="12">
            <Button.Ripple className="mr-1" color="primary">
              Save Changes
            </Button.Ripple>
         
          </Col>
                </Row>
              </Form>
           
      
       

          <ToastContainer />
        </CardBody>
       
     
    );
  }
//}

const mapStateToProps = (state) => {
 
  return {
    MyProfileData: state.myProfile.data,
    MyProfileSuccess:state.myProfile.MyProfileSuccess,
    IsDataSubmitedSuccessfully:state.myProfile.IsDataSubmitedSuccessfully,
    IsError:state.myProfile.IsError,
    countryDD:state.myProfile.countryDD
  };
};

const actionMethods = {
  getMyProfileData: getMyProfileData,
  updateMyProfileData:updateMyProfileData
};

export default connect(mapStateToProps, actionMethods)(ProfileInfo);