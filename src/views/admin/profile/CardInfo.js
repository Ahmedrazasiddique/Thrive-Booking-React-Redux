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
      
      
      
      <div class="rd_vacationfilterpart rd_vacationfilterpart3">
       
         
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
              <div class="rd_profilerd_erpart">
                <div class="rd_vacationflex2">
                    <p>Card No</p>
                      <div class="rd_profilethingco">
                      <InputMask
          className="form-control"
         value={cardNo}
         mask={mask}
          onChange={onChange}
          placeholder="Enter Credit Card Number"
        />
    
                      </div>
                </div>
              <div class="rd_vacationflex3">
                <p class="rd_dipnone">card info</p>
                <div class="rd_profilethingcofl">
                  <p>Expiry (MM/YYYY)</p>
                  <input type="text" name="" id="" class="rd_adddayofinput rd_adddayofinputNEXT" placeholder="MM"/>
                  <span>/</span>
                  <input type="text" name="" id="" class="rd_adddayofinput rd_adddayofinputNEXT" placeholder="YYYY"/>
                  <input type="text" name="" id="" class="rd_adddayofinput" placeholder="CCV"/>
                </div>

              
              </div>
              </div>
              <Col className="d-flex justify-content-end flex-wrap" sm="12">
            <button type="button" className="newButtonClass">
              Save Changes
            </button>
            <button type="button" className="newButtonClass">Reset</button>
          </Col>

       
           
                
               
              </Form>
            )}
          </Formik>

          <ToastContainer />
          </div>
       
     
     
    
    );
  }
//}
export default CardInfo;
