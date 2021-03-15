import React from "react";
import {
  Row,
  Col,
 } from "reactstrap";
import Select from "react-select";

import { getDropdownValue } from "../../utils/dropDownHelper";

class CustomTimePicker extends React.Component {

 
  componentDidMount(){
    //console.log('Event Settings Data',this.props.ValDD)
    //console.log('Event Settings Data',this.props.nameDD)
  }

  componentDidUpdate(prevProps,prevSate){
  }


  state = {
    days:this.props.dataDays,
    hours:this.props.datahours,
    minutes:this.props.minutes,
    ValDD:this.props.ValDD,
    nameDD:this.props.nameDD
  }



  OnChange = e => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };


  render() {

    return (
      <Row> {
        this.props.isDaysToShow?
        <Col sm="4">
          <Select
            classNamePrefix="select"
            defaultValue={getDropdownValue(this.state.days, this.state.ValDD[this.state.nameDD[0]], 'value')}
            options={this.state.days}
            name={this.state.nameDD[0]}
          />
        </Col>
        :<></>
        }
        <Col sm="4">
          <Select
            classNamePrefix="select"
            defaultValue={getDropdownValue(this.state.hours, this.state.ValDD[this.state.nameDD[1]], 'value')}
            options={this.state.hours}
            name={this.state.nameDD[1]}
          />
        </Col>
        <Col sm="4">
          <Select
            classNamePrefix="select"
            defaultValue={getDropdownValue(this.state.minutes, this.state.ValDD[this.state.nameDD[2]], 'value')}
            options={this.state.minutes}
            name={this.state.nameDD[2]}
          />
        </Col>
      </Row>
    );
  }

}

export default CustomTimePicker;
