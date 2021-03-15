import React, { useState } from "react";
import {
  CardBody,
  FormGroup,
  Button,
  Row,
  Col,
} from "reactstrap";
import { Formik, Form, Field } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../../src/assets/scss/plugins/extensions/dropzone.scss"
import InputMask from "react-input-mask"


const CardInfo = (props) => {
  const [cardNo, setcardNo] = useState("");
  const [mask, setMask] = useState("9999-9999-9999-9999");

  const onChange = event => {
    var value = event.target.value
    
    if (/^3[47]/.test(value)) {
      setMask("9999-999999-99999")
   
    }
    setcardNo(value)
   
  }
//class Profile extends React.Component {
//  render() {
    return (
      
      
        <CardBody>
       
         
          <Formik
            initialValues={{
              fullName: "Sample Name",
              businessName: "Sample",
              email: "sample@sample.com",
              phone: "(012) 345 6789",
              address: "sample address",
              city: "sample city",
              state: "sample state",
              country: "",
              zip: "8000",
            }}
            onSubmit={(values) => {
              setTimeout(() => {
                toast.success(JSON.stringify(values, null, 2));
              }, 500);
            }}
          >
            {(formikprops) => (
              <Form>
            
                <Row>
                  <Col sm="4" className="">
                  <div className="">
                      <h6 className="label-text align-middle mr-1">
                        Card No
                      </h6>
                    </div>
                    <div className="">
                    <FormGroup>
                    
                    <InputMask
          className="form-control"
         value={cardNo}
         mask={mask}
          onChange={onChange}
          placeholder="Enter Credit Card Number"
        />
                    </FormGroup>
               </div>
                  </Col>
                  <Col sm="12">
                    <div className="d-inline-block mb-1 mr-1">
                      <h6 className="label-text align-middle mr-1">
                        Expiry (MM/YYYY)
                      </h6>
                    </div>
                    <div className="d-inline-block mb-1 mr-1">
                      <FormGroup>
                        <Field
                          className="form-control"
                          type="text"
                          name="mm"
                          placeholder="MM"
                          formikprops={formikprops}
                        />
                      </FormGroup>
                    </div>
                    <div className="d-inline-block mr-1">
                      <h3>/</h3>
                    </div>
                    <div className="d-inline-block mr-1">
                      <FormGroup>
                        <Field
                          className="form-control"
                          type="text"
                          name="yyyy"
                          placeholder="YYYY"
                          formikprops={formikprops}
                        />
                      </FormGroup>
                    </div>
                    <div className="d-inline-block mr-1">
                      <FormGroup>
                        <Field
                          className="form-control"
                          type="text"
                          name="ccv"
                          placeholder="CCV"
                          formikprops={formikprops}
                        />
                      </FormGroup>
                    </div>
                  </Col>
                <Col className="d-flex justify-content-end flex-wrap" sm="12">
            <Button.Ripple className="mr-1" color="primary">
              Save Changes
            </Button.Ripple>
            <Button.Ripple color="flat-warning">Reset</Button.Ripple>
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
export default CardInfo;
