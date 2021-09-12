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
import { toast, ToastContainer } from "react-toastify";
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
    setIsStateChange(true);
    setPromoRecord(initialState);
  };

  useEffect(() => {
    setPromoRecord(props.PromoRecord);
  }, [props.PromoRecord]);

  useEffect(() => {
    if (props.IsDataSubmitedSuccessfullyPromoCode) {
      toast.success("Action Success");
      setIsStateChange(false);
      props.ChangeTab();
    }
    setIsShowLoader(false);
  }, [props.IsDataSubmitedSuccessfullyPromoCode]);

  useEffect(() => {
    if (props.IsError) {
      toast.error(props.ErrorMessage);
      setIsStateChange(false);
    }
    setIsShowLoader(false);
  }, [props.IsError]);

  const handleChange = (e) => {
    setIsStateChange(true);
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

    setIsShowLoader(true);
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
    <div class="rd_vacationfilterpart rd_vacationfilterpart3">

<Loader isShowLoader={isShowLoader}></Loader>
      <Form onSubmit={handleSubmit}>
    <div class="rd_profilerd_erpart">
        <div class="rd_vacationflex2">
            <p>Coupon Code</p>
              <div class="rd_profilethingco">
                <input type="text"  value={PromoRecord.coupon_code}
              name="coupon_code"
              id="couponCode"
              placeholder="Coupon code"
              onChange={handleChange}
              required
                class="rd_adddayofinput" 
                placeholder="Coupon Code"/>

              </div>
        </div>
        <div class="rd_vacationflex2">
              <p>Coupon Type</p>
              <div class="rd_profilethingco">
              <Select
              classNamePrefix="select"
              options={couponType}
              name="coupon_payout_type"
              value={getDropdownValue(
                couponType,
                PromoRecord.coupon_payout_type,
                "value"
              )}
              onChange={handleChange}
              required
            />
              </div>
      </div>
      <div class="rd_vacationflex2">
            <p>Value</p>
            <div class="rd_profilethingco">
            
                <input value={PromoRecord.coupon_value}
              className="rd_adddayofinput"
              type="text"
              name="coupon_value"
              id="couponValue"
              placeholder="Coupon value"
              onChange={handleChange}
              required
                />
                
                </div>
           
        </div>

      </div>

      <div class="rd_profilerd_erpart">
        <div class="rd_vacationflex2">
            <p>Limit</p>
              <div class="rd_profilethingco">
                <input type="text" class="rd_adddayofinput"  value={PromoRecord.coupon_limit}
             
              type="text"
              name="coupon_limit"
              id="coupon_limit"
              placeholder="Coupon limit"
              onChange={handleChange}
              required/>

              </div>
        </div>
        <div class="rd_vacationflex2">
              <p>Expiry Date </p>
              <div class="rd_profilethingco">
              <Flatpickr
                className="form-control"
                value={PromoRecord.coupon_expiry}
                name="coupon_expiry"
              />
              </div>
      </div>
      <div class="rd_vacationflex2">
            <div class="rd_addsvaebtn">
            {isStateChange ? (
            
            <button>Add New</button>
            ) : (
              <></>
            )}
            </div>
        </div>

      </div>
</Form>
</div>
  );
};

const mapStateToProps = (state) => {
  return {
    //  PromoCodeData: state.promoCode.entity,
    IsDataSubmitedSuccessfullyPromoCode:
      state.promoCode.IsDataSubmitedSuccessfullyPromoCode,
    IsPromosAddedSuccess: state.discount.IsPromosAddedSuccess,
    IsError: state.promoCode.IsError,
    ErrorMessage: state.promoCode.data ? state.promoCode.data.message : "",
  };
};

const actionMethods = {
  updateMyPromoCode: updateMyPromoCode,
};

export default connect(mapStateToProps, actionMethods)(AddNewPromoCode);
