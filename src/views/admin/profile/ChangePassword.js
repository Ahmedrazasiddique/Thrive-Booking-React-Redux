import React, { useState, useEffect } from "react";
import {
  CardBody,
  FormGroup,
  Button,
  Row,
  Col,
} from "reactstrap";
import * as Yup from "yup"
import { Formik, Form, Field,ErrorMessage } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../../src/assets/scss/plugins/extensions/dropzone.scss"
import ErrorSpan from "../../../components/Extra/ErrorSpan"
import { connect } from "react-redux";
import { updateMyChangePassword } from "../../../actions/myChangePassword";
import Loader  from "../../../../src/components/Loader/Loader"

const ChangePasswordSchema = Yup.object().shape({
  password: Yup.string()
   // .email("Invalid email address")
    .required("Required"),
    new_password: Yup.string()
    //.email("Invalid email address")
    .required("Required"),

    confirm_password: Yup.string()
    
    .oneOf([Yup.ref('new_password'), null], 'Passwords must match')

  
})



const ProfileChangePassword = (props) => {

  const[isShowLoader , setIsShowLoader] =useState(false);
  useEffect(() => {

    if(props.IsDataSubmitedSuccessfullyChangePassword)
    {
      setIsShowLoader(false);
      toast.success("Password Updated Successfully");
    }
  
    if(props.IsError)
    { 
      setIsShowLoader(false);
      toast.error("something went wrong");
    }}
    ,[props.IsDataSubmitedSuccessfullyChangePassword,props.IsError]);
  
  
//class Profile extends React.Component {
//  render() {
    return (
      
    
        
      
        <CardBody>
          <Loader isShowLoader={isShowLoader}></Loader>
          <Formik
            initialValues={{
              password: "",
              new_password: "",
              confirm_password: "",
             
            }}
            validationSchema={ChangePasswordSchema}
            onSubmit={(values) => {
              setIsShowLoader(true);
             props.updateMyChangePassword(values);
            }}
          >
            {(formikprops, errors, touched) => (
              <Form>
                <div class="rd_vacationfilterpart rd_vacationfilterpart3">
              <div class="rd_profilerd_erpart">
              <div class="rd_vacationflex2">
                    <p>Old Password *</p>
                      <div class="rd_profilethingco">
                    
                      <Field
                        className="form-control rd_adddayofinput"
                        type="password"
                        name="password"
                        placeholder="Old Password"
                        formikprops={formikprops}
                        required
                      />
                    
                    </div>
                    </div>
                  
                    <div class="rd_vacationflex2">
                      <p>New Password *</p>
                      <div class="rd_profilethingco">
                      <Field
                        className="form-control rd_adddayofinput"
                        type="password"
                        name="new_password"
                        placeholder="New Password"
                        formikprops={formikprops}
                        required
                      />
                      </div>
                    </div>

                    <div class="rd_vacationflex2">
                <p>Confirm Password *</p>
                <div class="rd_profilethingco">
                      <Field
                        className="form-control rd_adddayofinput"
                        type="password"
                        name="confirm_password"
                        placeholder="Confirm Password"
                        formikprops={formikprops}
                        required
                      />
                     <ErrorMessage name="confirm_password">
                    {(msg /** this is the same as the above */) => (
                      <div className="field-error text-danger">{msg}</div>
                    )}
                  </ErrorMessage>
                  </div>
                    </div>
</div>

                  <Col className="d-flex justify-content-end flex-wrap" sm="12">
            <Button.Ripple className="mr-1" color="primary">
              Change Password
            </Button.Ripple>
           
          </Col>
                </div>
              
              </Form>
            )}
          </Formik>
       

          <ToastContainer />
        </CardBody>
       
     
    );
  }
//}

const mapStateToProps = (state) => {

  return {
  
    MyChangePasswordSuccess:state.myChangePassword.MyChangePasswordSuccess,
    IsDataSubmitedSuccessfullyChangePassword:state.myChangePassword.IsDataSubmitedSuccessfullyChangePassword,
    IsError:state.myChangePassword.IsError,
    
  };
};

const actionMethods = {
  updateMyChangePassword: updateMyChangePassword,
  
};

export default connect(mapStateToProps, actionMethods)(ProfileChangePassword);