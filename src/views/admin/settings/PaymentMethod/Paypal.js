import React, { useState,useEffect } from "react";
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
  UncontrolledTooltip} from "reactstrap";
  import Select from "react-select";
  import * as Yup from "yup"
  import { Formik, Form, Field,ErrorMessage } from "formik";
  import { ToastContainer, toast } from "react-toastify";
  import {  Lock ,HelpCircle,Calendar,Mail,Send,Server,Trash} from "react-feather"
  import Toggle from "react-toggle"

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

const Paypal = (props) => {

    
    const [adminEmailNotificationChk, setAdminEmailNotificationChk] = useState(true);
    const [clientEmailNotificationChk, setClientEmailNotificationChk] = useState(true);
    const [staffEmailNotificationChk, setStaffEmailNotificationChk] = useState(true);
    const [smtpNotificationChk, setSmtpNotificationChk] = useState(true);

    const handleSwitchChange = (event) => {
        if(event.target.name=="adminEmailNotificationChk")
        setAdminEmailNotificationChk(adminEmailNotificationChk?false:true)
        else if (event.target.name=="clientEmailNotificationChk")
        setClientEmailNotificationChk(clientEmailNotificationChk?false:true)
        else if (event.target.name=="staffEmailNotificationChk")
        setStaffEmailNotificationChk(staffEmailNotificationChk?false:true)
        else if (event.target.name=="smtpNotificationChk")
        setSmtpNotificationChk(smtpNotificationChk?false:true)

       }
//class Profile extends React.Component {
//  render() {
    return (
      
    
        
      
        <CardBody>
          <Formik
            initialValues={{
              firstName: "Sample Name",
              lastName: "Sample Name",
              businessName: "Sample",
              email: "sample@sample.com",
              phone: "(012) 345 6789",
              address: "sample address",
              city: "sample city",
              state: "sample state",
              country: "",
              zip: "8000",
            }}
            validationSchema={ProfileSchema}
            onSubmit={(values) => {
              setTimeout(() => {
                toast.success(JSON.stringify(values, null, 2));
              }, 500);
            }}
          >
            {(formikprops, errors, touched,resetForm ) => (
                <Form>
                 <Col sm="6">
             
                 
                  <FormGroup row>
              <Col sm="4">
                <h5>API Username </h5>
              </Col>
              <Col sm="8">
              <Field
                       className="form-control"
                        type="text"
                        name="smtpHostName"
                        id="smtpHostName"
                        placeholder=""
                      />
              </Col>
            </FormGroup>
          
            <FormGroup row>
              <Col sm="4">
                <h5>API Password </h5>
              </Col>
              <Col sm="8">
              <Field
                       className="form-control"
                        type="password"
                        name="smtpPasswardName"
                        id="smtpPasswardName"
                        placeholder=""
                      />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col sm="4">
                <h5>Signature </h5>
              </Col>
              <Col sm="8">
              <Field
                       className="form-control"
                        type="text"
                        name="smtpUserName"
                        id="smtpUserName"
                        placeholder=""
                      />
              </Col>
            </FormGroup>
       

         
            <FormGroup row>
              <Col sm="4">
                <h5>Paypal guest payment <HelpCircle size={12} /></h5>
              </Col>
              <Col sm="8">
              <label className="react-toggle-wrapper">
            <Toggle
              checked={smtpNotificationChk}
              onChange={handleSwitchChange}
              name="smtpNotificationChk"
              value="yes"
              defaultChecked={smtpNotificationChk}
            />
          
          </label>
              </Col>
            </FormGroup>
            
            <FormGroup row>
              <Col sm="4">
                <h5>Test Mode <HelpCircle size={12} /></h5>
              </Col>
              <Col sm="8">
              <label className="react-toggle-wrapper">
            <Toggle
              checked={smtpNotificationChk}
              onChange={handleSwitchChange}
              name="smtpNotificationChk"
              value="yes"
              defaultChecked={smtpNotificationChk}
            />
          
          </label>
              </Col>
            </FormGroup>
        
               
                  </Col>


              
              </Form>
               )}
          </Formik>
       

          <ToastContainer />
        </CardBody>
       
     
    );
  }
//}
export default Paypal;
