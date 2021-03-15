import React from "react";
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
  Media
} from "reactstrap";
import Select from "react-select";
import * as Yup from "yup"
import { Formik, Form, Field,ErrorMessage } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorSpan from "../../../../../../src/components/Extra/ErrorSpan"
import { Check, User, Mail, Smartphone, Lock ,Code,Flag,Hash,Circle} from "react-feather"

import img from "../../../../../../src/assets/img/portrait/small/avatar-s-11.jpg"

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
const stateOptions = [
  { value: "0", label: "Ohio" },
  { value: "1", label: "Pakistan" },
  { value: "2", label: "Germany" },
  { value: "3", label: "United Kingdom" },
];

const AddNewForm = (props) => {
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
                <Row>
                  <Col sm="6">
                  <Col sm="12">
                    <Label for="firstName">First Name <ErrorSpan></ErrorSpan></Label>
                    <FormGroup className="has-icon-left position-relative">
                      <Field
                       className="form-control"
                        type="text"
                        name="firstName"
                        id="firstName"
                        placeholder="First Name"
                      />
                      <div className="form-control-position">
                        <User size={15} />
                      </div>
                      <ErrorMessage name="firstName">
                    {(msg /** this is the same as the above */) => (
                      <div className="field-error text-danger">{"First Name Is "+msg}</div>
                    )}
                  </ErrorMessage>

                    </FormGroup>
                  </Col>
                  <Col sm="12">
                    <Label for="lastName">Last Name <ErrorSpan></ErrorSpan></Label>
                    <FormGroup className="has-icon-left position-relative">
                      <Field
                        className="form-control"
                        type="text"
                        name="lastName"
                        id="lastName"
                        placeholder="Last Name"
                      />
                      <div className="form-control-position">
                        <User size={15} />
                      </div>
                      <ErrorMessage name="lastName">
                    {(msg /** this is the same as the above */) => (
                      <div className="field-error text-danger">{"Last Name Is "+msg}</div>
                    )}
                  </ErrorMessage>
                    </FormGroup>
                  </Col>
                  <Col sm="12">
                    <Label for="IconsMobile">Email <ErrorSpan></ErrorSpan></Label>
                    <FormGroup className="has-icon-left position-relative">
                      <Field
                       className="form-control"
                        type="text"
                        name="email"
                        id="email"
                        placeholder="Type your email"
                      />
                      <div className="form-control-position">
                        <Mail size={15} />
                      </div>
                      <ErrorMessage name="email">
                    {(msg /** this is the same as the above */) => (
                      <div className="field-error text-danger">{"Email Is "+msg}</div>
                    )}
                  </ErrorMessage>
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
                      />
                      <div className="form-control-position">
                        <Smartphone size={15} />
                      </div>
                      <ErrorMessage name="phone">
                    {(msg /** this is the same as the above */) => (
                      <div className="field-error text-danger">{msg}</div>
                    )}
                  </ErrorMessage>
                    </FormGroup>
                  </Col>
               

                  </Col>

                  <Col sm="6">
                  <Row>
                  <Col sm="12">
                    <Label for="address">Address</Label>
                    <FormGroup className="has-icon-left position-relative">
                     
                    <textarea name="address"  id="address" class="form-control textAreaCss"></textarea>
                     
                    </FormGroup>
                  </Col>
                  <br/>
                  </Row>
                  <Row>
                    
                  <Col sm="6">
                    <Label for="city">City</Label>
                    <FormGroup className="has-icon-left position-relative">
                      <Field
                       className="form-control"
                        type="text"
                        name="city"
                        id="city"
                        placeholder="city"
                      />
                      <div className="form-control-position">
                        <Flag size={15} />
                      </div>
                    </FormGroup>
                  </Col>
                  <Col sm="6">
                    <Label for="country">State</Label>
                    <FormGroup className="has-icon-left position-relative">
                    <Select
                   
                      
                        classNamePrefix="select"
                        defaultValue={stateOptions[0]}
                        options={stateOptions}
                        formikprops={formikprops}
                      />
                    
                    </FormGroup>
                  </Col>
                 
                  </Row>
                  <Row>
                  <Col sm="6">
                    <Label for="zip">Zip</Label>
                    <FormGroup className="has-icon-left position-relative">
                      <Field
                       className="form-control"
                        type="text"
                        name="zip"
                        id="zip"
                        placeholder="Zip"
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
                   
                      
                        classNamePrefix="select"
                        defaultValue={countryOptions[0]}
                        options={countryOptions}
                        formikprops={formikprops}
                      />
                    
                    </FormGroup>
                  </Col>
                  </Row>

                  </Col>
                
                
                  <Col className="d-flex justify-content-end flex-wrap" sm="12">
          
          
          </Col>
                </Row>
              </Form>
            )}
          </Formik>
       

          <ToastContainer />
        </CardBody>
       
     
    );
  }
//}
export default AddNewForm;
