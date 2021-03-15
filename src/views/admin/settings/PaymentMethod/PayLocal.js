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
import SweetAlert from 'react-bootstrap-sweetalert';
import {TabContent, TabPane, Nav, NavItem, NavLink} from "reactstrap"
import ErrorSpan from "../../../../../src/components/Extra/ErrorSpan"
import { Check, User, Mail, Smartphone, Lock ,Code,Flag,Hash,Circle} from "react-feather"
import Checkbox from "../../../../../src/components//Checkbox/CheckboxesVuexy"

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

const PayLocal = (props) => {
//class Profile extends React.Component {
//  render() {
    return (
      
    
        <Card>
        <CardHeader>
          <CardTitle>Pay Locally</CardTitle>
        </CardHeader>
        <CardBody>
          
          <div className="d-inline-block mr-1">
            <Checkbox
              color="primary"
              icon={<Check className="vx-icon" size={16} />}
              label="Cash"
            />
          </div>
          <div className="d-inline-block mr-1">
            <Checkbox
              color="success"
              icon={<Check className="vx-icon" size={16} />}
              label="Visa/Mastercard"
            />
          </div>
          <div className="d-inline-block mr-1">
            <Checkbox
              color="danger"
              icon={<Check className="vx-icon" size={16} />}
              label="Amex"
            />
          </div>
          <div className="d-inline-block mr-1">
            <Checkbox
              color="info"
              icon={<Check className="vx-icon" size={16} />}
              label="Cheque"
            />
          </div>
         
        </CardBody>
      </Card>
      
   
       
     
    );
  }
//}
export default PayLocal;
