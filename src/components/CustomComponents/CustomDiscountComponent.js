import React, { Fragment,useState,useEffect } from "react";
import { FormGroup,Col,InputGroup } from "reactstrap";
  import { Formik, Form, Field,ErrorMessage } from "formik";
  import {  Lock ,HelpCircle,Calendar,Mail,Send,Server,Trash} from "react-feather"
  import Toggle from "react-toggle"
  import Select from "react-select";

const CustomDiscountComponent = (props) => {

  const [DiscountData, setDiscountData] = useState({});
  useEffect(() => {
    setDiscountData(props.Data)
  });
    return (
      <>
        <FormGroup row>
        <Col sm="4">
          <h5>{props.DiscountHeading} <HelpCircle size={12} /></h5>
        </Col>
        <Col sm="8">
        <label className="react-toggle-wrapper">
      <Toggle
        checked={props.CheckBoxValue}
        onChange={props.handleSwitchChange}
        name={props.CheckBoxName}
        value="yes"
        defaultChecked={props.CheckBoxValue}
      />

    </label>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Col sm="4">
          <h5>Discount Label </h5>
        </Col>
        <Col sm="8">
        <Field
                 className="form-control"
                  type="text"
                  name={props.DiscountLabelName}
                  id={props.DiscountLabelID}
                  placeholder={props.DiscountLabelPlaceHolder}
                 value={DiscountData.label}
                />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Col sm="4">
          <h5>Discount Type </h5>
        </Col>
        <Col sm="8">

        <InputGroup>
                      <Select


                   classNamePrefix="select"
                   defaultValue={props.DiscountTypeDD[0]}
                   options={props.discount_type}

                 />
                   <Field
                 className="form-control"
                  type="text"
                  name={props.DiscountTypeTextBoxName}
                  id={props.DiscountTypeTextBoxID}
                  value={DiscountData.rates}
                />
                    </InputGroup>
        </Col>

      </FormGroup>


      </>
           );
}
    export default CustomDiscountComponent;
