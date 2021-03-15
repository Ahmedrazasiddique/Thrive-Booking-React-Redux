import React, { useState, useEffect } from "react";
import {
  CardBody,
  FormGroup,
  Button,
  Row,
  Col,
  Input,
  InputGroup,
  UncontrolledTooltip,
  Form,
} from "reactstrap";
import Select from "react-select";
import { toast,ToastContainer } from "react-toastify";
import { HelpCircle } from "react-feather";
import Flatpickr from "react-flatpickr";
import { connect } from "react-redux";
import { updateMyPromoCode } from "../../../../actions/promoCodeActions";
import Loader from "../../../../../src/components/Loader/Loader";
import { getDropdownValue } from "../../../../utils/dropDownHelper";
import { getAdminBusinessId } from "../../../../utils/authHelper";
const AddNewPromoCode = (props) => {
  const initialState = {
    coupon_code: "",
    coupon_type: "P",
    coupon_limit: 0,
    coupon_used: 0,
    coupon_value: 0,
    coupon_expiry: "",
  };

  const [PromoRecord, setPromoRecord] = useState("");
  const [isShowLoader, setIsShowLoader] = useState(false);
  const [isIDIncluded, setIsIDIncluded] = useState(false);
  const [isStateChange, setIsStateChange] = useState(false);

  console.log("new data", props.PromoRecord);
  console.log("PromoRecord", PromoRecord);
  const handleClickReset = () => {
    setIsStateChange(true)
    setPromoRecord(initialState);
  };

  useEffect(() => {
   
    setPromoRecord(props.PromoRecord);
  }, [props.PromoRecord]);

  useEffect(() => {
    
      if (props.IsDataSubmitedSuccessfullyPromoCode) {
        toast.success("Update Successfully");
        setIsStateChange(false)
      }
      setIsShowLoader(false);
      
  },[props.IsDataSubmitedSuccessfullyPromoCode]);

  useEffect(() => {
    
    if (props.IsError) {
      toast.error(props.ErrorMessage);
      setIsStateChange(false)
    }
    setIsShowLoader(false);
  
},[props.IsError]);

  const handleChange = (e) => {
    setIsStateChange(true)
    if (e.label) {
    
      setPromoRecord((PromoRecord) => ({
        ...PromoRecord,
        ["coupon_type"]: e.value,
      }));
    } else {
      const { name, value } = e.target;
      setPromoRecord((PromoRecord) => ({
        ...PromoRecord,
        [name]: value,
      }));
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    setIsShowLoader(true)
    const formData = new FormData(event.target);
    if (PromoRecord.id) {
      // values.id=PromoRecord.id;
      formData.append("id", PromoRecord.id);
    }

    formData.append("business_id", getAdminBusinessId());

    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    props.updateMyPromoCode(formData);
  };
  const couponType = [
    { value: "P", label: "Percentage" },
    { value: "F", label: "Flat" },
  ];

  const onExpiryDateChange = (event) => {};

  return (
    <CardBody>
      <Loader isShowLoader={isShowLoader}></Loader>
      <Form onSubmit={handleSubmit}>
        <FormGroup row>
          <Col sm="4">
            <h5>Coupon Code </h5>
          </Col>
          <Col sm="8">
            <Input
              value={PromoRecord.coupon_code}
              className="form-control"
              type="text"
              name="coupon_code"
              id="couponCode"
              placeholder="Coupon code"
              onChange={handleChange}
              required
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
              options={couponType}
              name="coupon_type"
              value={getDropdownValue(
                couponType,
                PromoRecord.coupon_type,
                "value"
              )}  
              onChange={handleChange}
              required
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col sm="4">
            <h5>
              Value <HelpCircle id="valueCricle" size={12} />{" "}
            </h5>
            <UncontrolledTooltip placement="top" target="valueCricle">
              Test Tooltip !
            </UncontrolledTooltip>
          </Col>
          <Col sm="8">
            <Input
              value={PromoRecord.coupon_value}
              className="form-control"
              type="text"
              name="coupon_value"
              id="couponValue"
              placeholder="Coupon value"
              onChange={handleChange}
              required
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col sm="4">
            <h5>
              Limit <HelpCircle id="limitCricle" size={12} />{" "}
            </h5>
            <UncontrolledTooltip placement="top" target="limitCricle">
              Test Tooltip !
            </UncontrolledTooltip>
          </Col>
          <Col sm="8">
            <Input
              value={PromoRecord.coupon_limit}
              className="form-control"
              type="text"
              name="coupon_limit"
              id="coupon_limit"
              placeholder="Coupon limit"
              onChange={handleChange}
              required
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col sm="4">
            <h5>
              Expiry Date <HelpCircle id="expriyDateCricle" size={12} />{" "}
            </h5>
            <UncontrolledTooltip placement="top" target="expriyDateCricle">
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
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    id="expriyDateCricle"
                  >
                    <rect
                      x="3"
                      y="4"
                      width="18"
                      height="18"
                      rx="2"
                      ry="2"
                    ></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>{" "}
                </span>
              </div>
            </InputGroup>
          </Col>
        </FormGroup>

        <Row>
          <Col className="d-flex justify-content-end flex-wrap" sm="12">
         {isStateChange? <Button.Ripple className="mr-1" color="primary">
              Save Changes
            </Button.Ripple>
:<></>}

            <Button.Ripple
              onClick={handleClickReset}
              type="button"
              color="flat-warning"
            >
              Reset
            </Button.Ripple>
          </Col>
        </Row>
      </Form>

      <ToastContainer />
    </CardBody>
  );
};

const mapStateToProps = (state) => {
  return {
    //  PromoCodeData: state.promoCode.entity,
    IsDataSubmitedSuccessfullyPromoCode: state.promoCode.IsDataSubmitedSuccessfullyPromoCode,
    IsPromosAddedSuccess: state.discount.IsPromosAddedSuccess,
    IsError: state.promoCode.IsError,
    ErrorMessage:state.promoCode.data?state.promoCode.data.message:""
  };
};

const actionMethods = {
  updateMyPromoCode: updateMyPromoCode,
};

export default connect(mapStateToProps, actionMethods)(AddNewPromoCode);
