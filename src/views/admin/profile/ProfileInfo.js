import React, { useState, useEffect } from "react";
import {
  CardBody,
  FormGroup,
  Button,
  Label,
  Row,
  Col,
  Input,
  Media,
  Form
} from "reactstrap";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorSpan from "../../../components/Extra/ErrorSpan"
import {  User, Mail, Smartphone, Flag,Hash,Circle} from "react-feather"
import "../../../../src/assets/scss/style.scss"
import { connect } from "react-redux";
import { getMyProfileData,updateMyProfileData } from "../../../actions/myProfileActions";
import Loader  from "../../../../src/components/Loader/Loader"
import {baseURLImages} from "../../../Helper"

const ProfileInfo = (props) => {
  const [MyProfileData, setMyProfileData] = useState({});
  const[isShowLoader , setIsShowLoader] =useState(true);
  const[countries , setCountries] =useState([]);
  const[countryValue , setCountryValue] =useState([]);
  const[isEmailValid , setIsEmailValid] =useState(true);
  const[isPhoneValid , setIsPhoneValid] =useState(true);

  // image code 
  const [selectedFile, setSelectedFile] = useState()
  const[profileImageUrl , setProfileImageUrl] =useState(true);
  const[isImageChangedEventCalled , setIsImageChangedEventCalled] =useState(false);

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
      if (!selectedFile) {
        setProfileImageUrl(undefined)
          return
      }

      const objectUrl = URL.createObjectURL(selectedFile)
      setProfileImageUrl(objectUrl)

      // free memory when ever this component is unmounted
    //  return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  const onSelectFile = e => {

    setIsImageChangedEventCalled(true);
      if (!e.target.files || e.target.files.length === 0) {
          setSelectedFile(undefined)
          return
      }

      // I've kept this example simple by using the first image instead of multiple
      setSelectedFile(e.target.files[0])

    }



  useEffect(() => {
    if(!props.MyProfileSuccess)
    props.getMyProfileData(1);
  });
  const handleInputChange = (e) => {
  
  if(e.target.name==="email")
{
    var email = e.target.value;
    const r = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    r.test(String(email).toLowerCase())?setIsEmailValid(true):setIsEmailValid(false)
}
if(e.target.name==="phone")
{
    var email = e.target.value;
    const r = /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i;
    r.test(String(email).toLowerCase())?setIsPhoneValid(true):setIsPhoneValid(false)
}

    let value = { [e.target.name]: e.target.value } ;
    value = {
        ...MyProfileData,
        ...value,
    };
    setMyProfileData( {[e.target.name]: e.target.value} )
   // console.log(inputs);
  }
  const changeCountry=(event)=>
{
  setCountryValue(event)
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
  { setIsShowLoader(false);
    setIsImageChangedEventCalled(false);
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
    setCountryValue(props.MyProfileData.country)
    setProfileImageUrl(props.MyProfileData.profile_image)
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
                        required
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
                        required
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
                        required
                      />
                      <div className="form-control-position">
                        <Mail size={15} />
                      </div>
                   
                      {!isEmailValid? <div class="field-error text-danger">Invalid Email</div>:<></>}
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
                    
                      {!isPhoneValid? <div class="field-error text-danger">Invalid Phone #</div>:<></>}
                    </FormGroup>
                  </Col>
                  <Col sm="12">
                  <Media>
          <Media className="mr-1" left href="#">
            <Media
              className="rounded-circle"
              object
              src={!isImageChangedEventCalled?(baseURLImages)+profileImageUrl:profileImageUrl}
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
                <Input type="file" accept=".png,.jpg" onChange={onSelectFile} name="profile_image" id="uploadImg" hidden />
              </Button.Ripple>
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
                     
                    <textarea name="address_line_1"     value={MyProfileData.address_line_1}
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
                
                
                  <Col className="d-flex justify-content-end flex-wrap" sm="12">
                  {isEmailValid?  <Button.Ripple className="mr-1" color="primary">
              Save Changes
            </Button.Ripple>:<></>}
         
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