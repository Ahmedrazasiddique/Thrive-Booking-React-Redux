import React ,{useState,useEffect} from "react"
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
    import {  Lock ,HelpCircle,Calendar} from "react-feather"
    import Flatpickr from "react-flatpickr";
    import { connect } from "react-redux";
    import { updateMyPromoCode } from "../../../../actions/promoCodeActions";
    
const AddNewPromoCode = (props) => {
 
    const initialState = {code: "",
    type: "",
    limit: "",
    used: 0,
    value: 0,
    expires: "" };
    const [PromoRecord, setPromoRecord] = useState("");
    console.log("new data",props.PromoRecord)
    console.log("PromoRecord",PromoRecord)
    const handleClickReset = () => {
        setPromoRecord(initialState);
      };

      useEffect(() => {
        setPromoRecord(props.PromoRecord);
      }, [props.PromoRecord]);


    const handleChange = e => {
      
       if(e.label){
        setPromoRecord(PromoRecord => ({
            ...PromoRecord,
            ["type"]: e.value
        }));
       
    
    }else{
        const { name, value } = e.target;
        setPromoRecord(PromoRecord => ({
            ...PromoRecord,
            [name]: value
        }));
    }

    };

    const couponType = [  { value: "%", label: "Percentage" },
    { value: "flat", label: "Flat" },]

const onExpiryDateChange = (event)=>{


}

    return (  
        <CardBody>
          <Formik
            initialValues={{
              coupon_code:3434,
              coupon_type:"P",
              coupon_limit:5,
              coupon_used:0,
              coupon_value:20,
              coupon_expiry:"2020-12-30",
              status:"E",
              business_id:1,
            }}
            onSubmit={(values) => {
              if(PromoRecord.id)
             values.id=PromoRecord.id;
              props.updateMyPromoCode(values);
            }}
          >
            {(formikprops) => (
              <Form>
                   
              
               <FormGroup row>
              <Col sm="4">
                <h5>Coupon Code </h5>
              </Col>
              <Col sm="8">
              <Field
                        value={PromoRecord.coupon_code}
                       className="form-control"
                        type="text"
                        name="coupon_code"
                        id="couponCode"
                        placeholder="Coupon code"
                        onChange={handleChange}
                      />
              </Col>
            </FormGroup>
           
            <FormGroup row>
              <Col sm="4">
                <h5>Coupon Type </h5>
              </Col>
              <Col sm="8">
              <Select
                   
                        classNamePrefix="select"
                        value={couponType[PromoRecord.coupon_type]}
                        options={couponType}
                        name="coupon_type"
                        onChange={handleChange}
                      
                      />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col sm="4">
                <h5>Value <HelpCircle id="valueCricle" size={12} /> </h5>
                <UncontrolledTooltip
                  placement="top"
                  target="valueCricle"
                >
                  Test Tooltip !
                </UncontrolledTooltip>
              </Col>
              <Col sm="8">
              <Field
                  value={PromoRecord.coupon_value}
                       className="form-control"
                        type="text"
                        name="coupon_value"
                        id="couponValue"
                        placeholder="Coupon value"
                        
                        onChange={handleChange}
                      />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col sm="4">
                <h5>Limit <HelpCircle id="limitCricle" size={12} /> </h5>
                <UncontrolledTooltip
                  placement="top"
                  target="limitCricle"
                >
                  Test Tooltip !
                </UncontrolledTooltip>
              </Col>
              <Col sm="8">
              <Field
                  value={PromoRecord.coupon_limit}
                       className="form-control"
                        type="text"
                        name="limit"
                        id="coupon_limit"
                        placeholder="Coupon limit"
                        onChange={handleChange}
                      />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col sm="4">
                <h5>Expiry Date <HelpCircle id="expriyDateCricle" size={12} /> </h5>
                <UncontrolledTooltip
                  placement="top"
                  target="expriyDateCricle"
                >
                  Test Tooltip !
                </UncontrolledTooltip>
              </Col>
              <Col sm="8">
              <InputGroup>
              <Flatpickr
              className="form-control"
              value={PromoRecord.coupon_expiry}
            
              name="coupon_expiry"
            />
                      <div class="input-group-prepend"><span class="input-group-text"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" id="expriyDateCricle"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg> </span></div>
                      </InputGroup>
                     
              </Col>
            </FormGroup>
          
            <Row>
                
                <Col className="d-flex justify-content-end flex-wrap" sm="12">
          <Button.Ripple className="mr-1" color="primary">
            Save Changes
          </Button.Ripple>
          <Button.Ripple 
          onClick={handleClickReset}
          type="button"
          color="flat-warning">Reset</Button.Ripple>
        </Col>
              </Row>
              </Form>
            )}
              </Formik>
            
            
              <ToastContainer />
              </CardBody>
     );
}


const mapStateToProps = (state) => {

  return {
  //  PromoCodeData: state.promoCode.entity,
   PromoCodeSuccess:state.promoCode.PromoCodeSuccess
  };
};

const actionMethods = {
  updateMyPromoCode: updateMyPromoCode,
  
};

export default connect(mapStateToProps, actionMethods)(AddNewPromoCode);