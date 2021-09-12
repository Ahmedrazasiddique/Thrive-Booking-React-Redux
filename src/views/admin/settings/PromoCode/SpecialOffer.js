import React, { useState, useEffect } from "react";
import { CardBody, FormGroup, Button, Row, Col, Input, Form } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import Toggle from "react-toggle";
import { connect } from "react-redux";
import {
  getMySpecialOffer,
  updateMySpecialOffer,
} from "../../../../actions/specialOfferAction";
import Loader from "../../../../../src/components/Loader/Loader";
import ColorPickerCustom from "../../../../../src/components/CustomComponents/ColorPickerCustom";
import { getAdminBusinessId } from "../../../../utils/authHelper";
const SpecialOffer = (props) => {
  const [isShowLoader, setIsShowLoader] = useState(false);
  const [specialOfferChk, setspecialOfferChk] = useState(true);
  const [isColorComponentToLoad, setisColorComponentToLoad] = useState(false);

  const [editID, setEditID] = useState(0);
  const [inputs, setInputs] = useState({});
  const [islimit30, setIslimit30] = useState(false);

  const handleInputChange = (e) => {
    if (
      e.target.name === "special_announcement" &&
      parseInt(e.target.value.length) > 30
    ) {
      setIslimit30(true);
    } else {
      setIslimit30(false);
    }

    let value = { [e.target.name]: e.target.value };
    value = {
      ...inputs,
      ...value,
    };
    setInputs({ [e.target.name]: e.target.value });
    console.log(inputs);
  };

  useEffect(() => {
    if (!props.SpecialOfferSuccess) props.getMySpecialOffer(1);
  });

  useEffect(() => {
    if (props.IsDataSubmitedSuccessfullySpecialPromos) {
      toast.success("Special Promos Update Successfully");
    }

    if (props.IsError) {
      toast.error("something went wrong");
    }
    // toast.error("something went wrong");

    if (props.SpecialOfferSuccess) {
      setInputs(props.SpecialOfferData);
      setEditID(props.SpecialOfferData.id);
      setspecialOfferChk(props.SpecialOfferData.status === "E" ? true : false);
      setIsShowLoader(false);
      setisColorComponentToLoad(true);
    } else {
      setIsShowLoader(true);
    }
  }, [props.SpecialOfferData]);

  const specialOfferChange = (event) => {
    if (event.target.id === "specialOfferChk")
      setspecialOfferChk(specialOfferChk ? false : true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsShowLoader(true);
    const formData = new FormData(event.target);
    formData.append("status", specialOfferChk === true ? "E" : "D");
    formData.append("business_id", getAdminBusinessId());
    formData.append("id", editID);

    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    props.updateMySpecialOffer(formData);
  };

  return (
   

    <div class="rd_vacationfilterpart rd_vacationfilterpart3">

<Loader isShowLoader={isShowLoader}></Loader>
      <Form onSubmit={handleSubmit}>
    <div class="rd_profilerd_erpart">
        <div class="rd_vacationflex2">
            <p>Special announcement </p>
              <div class="rd_profilethingco">
                <input type="text"
                 type="text"
                 name="="
                 id="="
                 placeholder="Special announcement"
                 name="special_announcement"
                 value={inputs.special_announcement}
                 onChange={handleInputChange}
                class="rd_adddayofinput" placeholder="Special announcement "/>
 {islimit30 ? (
              <div class="field-error text-danger">Limit exceed (30)</div>
            ) : (
              <></>
            )}
              </div>
        </div>
        <div class="rd_vacationflex2 rd_specialcheckscpro">
              <p>Special announcement </p>
              <div class="rd_activeprdesa">
                <div class="box_content">
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" 
                         checked={specialOfferChk}
                         onChange={specialOfferChange}
                         id="specialOfferChk"
                       />
                        <label class="form-check-label" 
                        for="specialOfferChk" >Special announcement </label>
                    </div>
                </div>
            </div>
      </div>

      </div>

      <div class="rd_profilerd_erpart">
        <div class="rd_vacationflex2">
        <Col sm="4">
            <h5>Color </h5>
          </Col>
          <Col sm="8">
            {isColorComponentToLoad === true ? (
              <ColorPickerCustom
                text="Primary"
                value={inputs.ribbon_color}
                color={inputs.ribbon_color}
                colorFormName="ribbon_color"
              ></ColorPickerCustom>
            ) : (
              <></>
            )}
          </Col>
        </div>
      <div class="rd_vacationflex2">
            <div class="rd_addsvaebtn">
            {!islimit30 ? (
             
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
    SpecialOfferData: state.specialOffer.data,
    SpecialOfferSuccess: state.specialOffer.SpecialOfferSuccess,
    IsDataSubmitedSuccessfullySpecialPromos:
      state.specialOffer.IsDataSubmitedSuccessfullySpecialPromos,
    IsError: state.specialOffer.IsError,
  };
};

const actionMethods = {
  getMySpecialOffer: getMySpecialOffer,
  updateMySpecialOffer: updateMySpecialOffer,
};

export default connect(mapStateToProps, actionMethods)(SpecialOffer);
