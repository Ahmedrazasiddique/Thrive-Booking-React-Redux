
import React, { useState ,useEffect} from "react";
import {

  Input,
  InputGroup,
  InputGroupAddon,
  CustomInput,
  Row,
  Col,
 } from "reactstrap";

 import Select from "react-select";
 class CustomTimePicker extends React.Component {
  
  
  constructor(props)
  {
    super(props)
  }

  componentDidMount()
  {
   

    console.log('Event Settings Data',this.props.ValDD)
    console.log('Event Settings Data',this.props.nameDD)
 
  }

  componentDidUpdate(prevProps,prevSate)
  {
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
      debugger
      return (
       
<Row> { this.props.isDaysToShow?
       <Col sm="4">
          
              
         <Select
                   
                      
                   classNamePrefix="select"
                   defaultValue={{label:this.state.ValDD[this.state.nameDD[0]] ,value:this.state.ValDD[this.state.nameDD[0]]}}
                   options={this.state.days}
                   name={this.state.nameDD[0]}
                   
                   />
              
           
                 </Col>
                 :<></>
}
                 
       <Col sm="4">
                 <Select
                   
                      
                   classNamePrefix="select"
                   defaultValue={{label:this.state.ValDD[this.state.nameDD[1]] ,value:this.state.ValDD[this.state.nameDD[1]]}}
                   options={this.state.hours}
                  name={this.state.nameDD[1]}
                 />
                 </Col>
                 <Col sm="4">
                 <Select
                   
                      
                   classNamePrefix="select"
                   defaultValue={{label:this.state.ValDD[this.state.nameDD[2]] ,value:this.state.ValDD[this.state.nameDD[2]]}}
                   options={this.state.minutes}
                   name={this.state.nameDD[2]}
                   
                 />
                    </Col>
                    </Row>      
    );
}
 }

export default CustomTimePicker;