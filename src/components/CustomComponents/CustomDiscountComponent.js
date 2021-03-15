import React from "react";
import { FormGroup, Col, InputGroup, Input } from "reactstrap";
import { HelpCircle } from "react-feather";
import Toggle from "react-toggle";
import Select from "react-select";
import { getDropdownValue } from "../../../src/utils/dropDownHelper";
class CustomDiscountComponent extends React.Component {
  state = {
    DiscountData: {},
    discountTypeDD: [
      { value: "P", label: "%" },
      { value: "F", label: "$" },
    ],
    isDataLoaded: false,
  };
  handleSwitchChange = (e) => {};
  componentDidMount() {
    const { Data } = this.props;
    this.setState({ DiscountData: Data });
    this.setState({ isDataLoaded: true });
  }
  handleInputChange = (e) => {
    let value = { [e.target.id]: e.target.value };
    value = {
      ...this.state.DiscountData,
      ...value,
    };
    // setDiscountData( value )

    this.setState({ DiscountData: value });
  };
  componentDidUpdate(previousProp) {
    if (previousProp !== this.props) {
    }
  }

  render() {
    debugger;
    const { DiscountData, discountTypeDD } = this.state;
    return (
      <>
        {this.state.isDataLoaded ? (
          <>
            <FormGroup row>
              <Col sm="4">
                <h5>
                  {this.props.DiscountHeading} <HelpCircle size={12} />
                </h5>
              </Col>
              <Col sm="8">
                <label className="react-toggle-wrapper">
                  <Toggle
                    onChange={this.props.handleSwitchChange}
                    id={this.props.CheckBoxName}
                    defaultChecked={DiscountData.status === "E" ? true : false}
                  />
                </label>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col sm="4">
                <h5>Discount Label </h5>
              </Col>
              <Col sm="8">
                <input
                  type="hidden"
                  name={this.props.IDName}
                  value={DiscountData.id}
                ></input>

                <input
                  type="hidden"
                  name={this.props.discount_type_name}
                  value={this.props.discount_type_name_value}
                ></input>
                <Input
                  className="form-control"
                  type="text"
                  name={this.props.DiscountLabelName}
                  id={"label"}
                  placeholder={this.props.DiscountLabelPlaceHolder}
                  value={DiscountData.label}
                  onChange={this.handleInputChange}
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
                    name={this.props.DiscountTypeDDName}
                    classNamePrefix="select"
                    defaultValue={getDropdownValue(
                      discountTypeDD,
                      DiscountData.discount_type,
                      "value"
                    )}
                    options={discountTypeDD}
                  />
                  <Input
                    className="form-control"
                    type="text"
                    name={this.props.DiscountTypeTextBoxName}
                    id={"rates"}
                    value={DiscountData.rates}
                    onChange={this.handleInputChange}
                  />
                </InputGroup>
              </Col>
            </FormGroup>
          </>
        ) : (
          <></>
        )}
      </>
    );
  }
}
export default CustomDiscountComponent;
