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
    // ;
    const { DiscountData, discountTypeDD } = this.state;
    return (
      <>
        {this.state.isDataLoaded ? (
          <>
             <div className="rd_coupenthingitewm">
              
             <div className="rd_activeprdesa">
                        <div className="box_content">
                            <div className="form-check form-switch">
                                <input className="form-check-input" 
                                  onChange={this.props.handleSwitchChange}
                                  id={this.props.CheckBoxName}
                                  defaultChecked={DiscountData.status === "E" ? true : false}
                                type="checkbox" 
                                id="flexSwitchCheckChecked4"/>
                                <label className="form-check-label" for="flexSwitchCheckChecked4">{this.props.DiscountHeading}</label>
                            </div>
                        </div>
                    </div>

                    <div className="rd_conpbtpartth">
                        <div className="rd_conpbtpartthitem">
                            <p>Discount Label</p>
                            <div className="rd_profilethingco">
                                <input type="text" 
                                className="rd_adddayofinput" 
                                type="text"
                  name={this.props.DiscountLabelName}
                  id={"label"}
                  placeholder={this.props.DiscountLabelPlaceHolder}
                  value={DiscountData.label}
                  onChange={this.handleInputChange}/>
                            </div>
                        </div>
                        <div className="rd_conpbtpartthitem">
                            <p>Discount Label</p>
                            <div className="rd_profilethingco rd_cutomstyleinputthin">
                                <div className="input-group">
                                    <div className="input-group-prepend rd_dropdownbtn">
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
                                      </div>
                                    <input type="text" className="form-control noshadfoc" 
                                      type="text"
                                      name={this.props.DiscountTypeTextBoxName}
                                      id={"rates"}
                                      value={DiscountData.rates}
                                      onChange={this.handleInputChange}
                                    placeholder="05620554"/>
                                  </div>
                              </div>
                        </div>
                    </div>
            
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
             
             
              
             
               
              
           </div>
          </>
        ) : (
          <></>
        )}
      </>
    );
  }
}
export default CustomDiscountComponent;
