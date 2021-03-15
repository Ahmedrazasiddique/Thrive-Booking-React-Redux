
import React ,{useState} from "react"
import {
   
    CardBody,
    FormGroup,
    Button,
    Row,
    Col,
    
    UncontrolledTooltip} from "reactstrap";
    import Select from "react-select";
    import * as Yup from "yup"
    import { Formik, Form, Field,ErrorMessage } from "formik";
    import { ToastContainer, toast } from "react-toastify";
    import {  Lock ,HelpCircle,Calendar} from "react-feather"
    import Toggle from "react-toggle"

const SpecialOffer = () => {


    const [specialOfferChk, setspecialOfferChk] = useState(true);
   
const specialOfferChange = (event)=>{

    if(event.target.name=="specialOfferChk")
    setspecialOfferChk(specialOfferChk?false:true)
}

    return (  
        <CardBody>
          <Formik
            initialValues={{
              timeFormat: "",
              datePickerFormate: "",
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
                     <FormGroup row>
        <Col sm="4">
          <h5>Special Offer <HelpCircle size={12} /></h5>
        </Col>
        <Col sm="8">
        <label className="react-toggle-wrapper">
      <Toggle
        checked={specialOfferChk}
        onChange={specialOfferChange}
        name="specialOfferChk"
        value="yes"
        defaultChecked={specialOfferChk}
      />
    
    </label>
        </Col>
      </FormGroup>
           
          
            <Row>
                
                <Col className="d-flex justify-content-end flex-wrap" sm="12">
          <Button.Ripple className="mr-1" color="primary">
            Save Changes
          </Button.Ripple>
        
        </Col>
              </Row>
              </Form>
            )}
              </Formik>
            
            
              <ToastContainer />
              </CardBody>
     );
}

export default SpecialOffer