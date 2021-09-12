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
      
    
        
      
      <div className="rd_vacationfilterpart rd_vacationfilterpart3">
        <Form onSubmit={handleSubmit}>
      <div className="rd_profilerd_erpart">
          <Loader isShowLoader={isShowLoader}></Loader>
      
                
               
                  <div className="rd_vacationflex2">
                  <p>First Name *</p>
                  <div className="rd_profilethingco">
                      <input
                       className="rd_adddayofinput"
                        type="text"
                        name="first_name"
                        id="first_name"
                        placeholder="First Name"
                        value={MyProfileData.first_name}
                        onChange={handleInputChange}
                        required
                      />
                      
                    </div>

                    <p>Email *</p>
                      <div class="rd_profilethingco">
                      <input
                       className="rd_adddayofinput"
                        type="text"
                        name="email"
                        id="email"
                        placeholder="Type your email"
                        value={MyProfileData.email}
                        onChange={handleInputChange}
                        required
                      />
    
                      </div>
    
                  </div>
                  <div className="rd_vacationflex2">
                      <p>Last Name *</p>
                      <div class="rd_profilethingco">
                      <input
                        className="rd_adddayofinput"
                        type="text"
                        name="last_name"
                        id="last_name"
                        placeholder="Last Name"
                        value={MyProfileData.last_name}
                        onChange={handleInputChange}
                        required
                      />
                      </div>
    
    
                      
                      <p>Phone Number</p>
                      <div  class="rd_profilethingco">
                      <input
                      className="rd_adddayofinput"
                        type="text"
                        name="text"
                        id="phone"
                        name="phone"
                        placeholder="(012) 345 6789"
                        value={MyProfileData.phone}
                        onChange={handleInputChange}
                      />
    
                      </div>
    
                      

              </div>
              <div className="rd_vacationflex2">
                  <p>Address</p>
    
                  <div  className="rd_profilethingco">
                  <textarea name="address_line_1"     value={MyProfileData.address_line_1}
                        onChange={handleInputChange} id="address" className="rd_areaprofilepagethi"></textarea>
                     
                  </div>
              </div>
              </div>
              <div class="rd_profilerd_erpart rd_profilerd_erpart2">
                <div class="rd_vacationflex2">
                    <p>City</p>
                      <div class="rd_profilethingco">
                      <input
                       className="rd_adddayofinput"
                        type="text"
                        name="city"
                        id="city"
                        placeholder="city"
                        value={MyProfileData.city}
                        onChange={handleInputChange}
                      />
    
                      </div>
                </div>
                <div class="rd_vacationflex2">
                    <p>State</p>
                      <div class="rd_profilethingco">
                      <input
                       className="rd_adddayofinput"
                        type="text"
                        name="state"
                        id="state"
                        placeholder="state"
                        value={MyProfileData.state}
                        onChange={handleInputChange}
                      />
                        
    
                      </div>
                </div>
                <div class="rd_vacationflex2">
                    <p>Zip Number</p>
                      <div class="rd_profilethingco">
                      <input
                        className="rd_adddayofinput"
                        type="number"
                        name="zip"
                        id="zip"
                        placeholder="Zip"
                        value={MyProfileData.zip}
                        onChange={handleInputChange}
                      />
    
                      </div>
                </div>
                <div class="rd_vacationflex2">
                    <p>Country</p>
                      <div class="rd_profilethingco">
                      <Select
                   
                   className="country"
                   classNamePrefix="select"
                   defaultValue={MyProfileData.country}
                   value={countryValue}
                   options={countries}
                   name="country_id" 
                   onChange={changeCountry}

                  
                   
                 />
                        
                      </div>
                </div>

              </div>

              <div class="rd_profileimagepart">
                <div class="rd_imagethincontg">
                    <p>User</p>

                    <img src={!isImageChangedEventCalled?(baseURLImages)+profileImageUrl:profileImageUrl} alt=""/>
                </div>
                <div class="rd_imagethincontgbtnt">
                    <p>Allowed JPG, GIF or PNG. Max size of 800kB</p>
                    <FormGroup className="has-icon-left position-relative">
                    <label
                
                className="CustomButton"
                outline
              >
                Upload Photo
                <Input type="file" accept=".png,.jpg" onChange={onSelectFile} name="profile_image" id="uploadImg" hidden />
              </label>
                   { /*<label  className="CustomButton" type="button">Remove</label>*/}
                    </FormGroup>
                </div>
            </div>

                 

                
                
                
                
                  <Col className="d-flex justify-content-end flex-wrap" sm="12">
                  {isEmailValid?  <Button.Ripple className="mr-1" color="primary">
              Save Changes
            </Button.Ripple>:<></>}
         
          </Col>
                
              </Form>
           
      
       

          <ToastContainer />
        </div>
       
     
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