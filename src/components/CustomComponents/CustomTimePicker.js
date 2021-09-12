import React from "react";
import {
  Row,
  Col,
 } from "reactstrap";
import Select from "react-select";

import { getDropdownValue ,getDropdownIndex} from "../../utils/dropDownHelper";
import { ThriveLink_SUCCESS } from "../../constants/myThriveLink";

class CustomTimePicker extends React.Component {

 
  componentDidMount(){
    
    var daysValueLocal=getDropdownValue(this.state.days, this.state.ValDD[this.state.nameDD[0]], 'value')
    this.setState({daysValue:daysValueLocal?daysValueLocal.value:this.state.days[0]['value']})
    this.setState({daysLabel:daysValueLocal?daysValueLocal.label:this.state.days[0]['label']})
    var indexOfPreviousDayValue=getDropdownIndex(this.state.days, this.state.ValDD[this.state.nameDD[0]], 'value');
    this.setState({DaysIndex:indexOfPreviousDayValue!=-1?indexOfPreviousDayValue:0})
    
//----------------------------------------------------------------------------------------------
var hoursValueLocal=getDropdownValue(this.state.hours, this.state.ValDD[this.state.nameDD[1]], 'value')
this.setState({hoursValue:hoursValueLocal?hoursValueLocal.value:this.state.hours[0]['value']})
this.setState({hoursLabel:hoursValueLocal?hoursValueLocal.label:this.state.hours[0]['label']})
var indexOfPrevioushourValue=getDropdownIndex(this.state.hours, this.state.ValDD[this.state.nameDD[1]], 'value');
this.setState({hoursIndex:indexOfPrevioushourValue!=-1?indexOfPrevioushourValue:0})

    //---------------------------------------------------------------------------------

    var minutesValueLocal=getDropdownValue(this.state.minutes, this.state.ValDD[this.state.nameDD[2]], 'value')
this.setState({minutesValue:minutesValueLocal?minutesValueLocal.value:this.state.minutes[0]['value']})
this.setState({minutesLabel:minutesValueLocal?minutesValueLocal.label:this.state.minutes[0]['label']})
var indexOfPreviousminuteValue=getDropdownIndex(this.state.minutes, this.state.ValDD[this.state.nameDD[2]], 'value');
this.setState({minutesIndex:indexOfPreviousminuteValue!=-1?indexOfPreviousminuteValue:0})

  }

  componentDidUpdate(prevProps,prevSate){
  }


  state = {
    days:this.props.dataDays,
    hours:this.props.datahours,
    minutes:this.props.minutes,
    ValDD:this.props.ValDD,
    nameDD:this.props.nameDD,
    DaysIndex:0,
    daysLabel:"",
    daysValue:"",
    plusButtonDays:false,
    minusButtonDays:false,

    
minutesIndex:0,
minutesLabel:"",
minutesValue:"",
plusButtonminutes:false,
minusButtonminutes:false,


hoursIndex:0,
    hoursLabel:"",
    hoursValue:"",
    plusButtonhours:false,
    minusButtonhours:false,
  }




  onChangeDays = (e) => {
  }

  plusDays(flag)
  {
    
    if(flag=='DaysPlus')
    {
      if((this.state.DaysIndex+1)>this.state.days.length-1)
      {
        
      this.setState({plusButtonDays:true});
      }else
      {

        
      this.setState({plusButtonDays:false});
        this.setState({DaysIndex:(this.state.DaysIndex+1)});
    
      }
      this.setState({daysLabel:this.state.days[this.state.DaysIndex]['label']});
      this.setState({daysValue:this.state.days[this.state.DaysIndex]['value']});
    }
  }

  minusDays(flag)
  {
    if(flag=='DaysMinus')
    {
      this.setState({plusButtonDays:false});
      if((this.state.DaysIndex-1)<0||(this.state.DaysIndex-1)==0)
      {
        this.setState({DaysIndex:(0)});

      }
      else
      {
        this.setState({DaysIndex:(this.state.DaysIndex-1)});
      }

      this.setState({daysLabel:this.state.days[this.state.DaysIndex]['label']});
      this.setState({daysValue:this.state.days[this.state.DaysIndex]['value']});
      
    }
    
  }




  plushours(flag)
  {
    
    if(flag=='hoursPlus')
    {
      if((this.state.hoursIndex+1)>this.state.hours.length-1)
      {
        
      this.setState({plusButtonhours:true});
      }else
      {

        
      this.setState({plusButtonhours:false});
        this.setState({hoursIndex:(this.state.hoursIndex+1)});
    
      }
      this.setState({hoursLabel:this.state.hours[this.state.hoursIndex]['label']});
      this.setState({hoursValue:this.state.hours[this.state.hoursIndex]['value']});
    }
  }

  minushours(flag)
  {
    if(flag=='hoursMinus')
    {
      this.setState({plusButtonhours:false});
      if((this.state.hoursIndex-1)<0||(this.state.hoursIndex-1)==0)
      {
        this.setState({hoursIndex:(0)});

      }
      else
      {
        this.setState({hoursIndex:(this.state.hoursIndex-1)});
      }

      this.setState({hoursLabel:this.state.hours[this.state.hoursIndex]['label']});
      this.setState({hoursValue:this.state.hours[this.state.hoursIndex]['value']});
      
    }
    
  }

  
  plusminutes(flag)
  {
    
    if(flag=='minutesPlus')
    {
      if((this.state.minutesIndex+1)>this.state.minutes.length-1)
      {
        
      this.setState({plusButtonminutes:true});
      }else
      {

        
      this.setState({plusButtonminutes:false});
        this.setState({minutesIndex:(this.state.minutesIndex+1)});
    
      }
      this.setState({minutesLabel:this.state.minutes[this.state.minutesIndex]['label']});
      this.setState({minutesValue:this.state.minutes[this.state.minutesIndex]['value']});
    }
  }

  minusminutes(flag)
  {
    if(flag=='minutesMinus')
    {
      this.setState({plusButtonminutes:false});
      if((this.state.minutesIndex-1)<0||(this.state.minutesIndex-1)==0)
      {
        this.setState({minutesIndex:(0)});

      }
      else
      {
        this.setState({minutesIndex:(this.state.minutesIndex-1)});
      }

      this.setState({minutesLabel:this.state.minutes[this.state.minutesIndex]['label']});
      this.setState({minutesValue:this.state.minutes[this.state.minutesIndex]['value']});
      
    }
    
  }
  render() {

    return (
      <Row> {
        this.props.isDaysToShow?

        <div class="rd_inpunumtegitem">
        <div class="input-group numinputbooking">
            <div class="input-group-prepend rd_dropdownbtnmins">
                <button disabled={this.state.minusButtonDays} type="button" class="input-group-text" onClick={()=>this.minusDays('DaysMinus')}></button>
            </div>
            <input type="text" disabled={true} class="form-control noshadfoc" id="inlineFormInputGroupUsername"
            value={this.state.daysLabel} placeholder="10 hrs"/>
          <input type="hidden" 
            value={this.state.daysValue} 
            name={this.state.nameDD[0]}
/>

            <div class="input-group-prepend rd_dropdownbtnplus">
                <button disabled={this.state.plusButtonDays} type="button" class="input-group-text" onClick={()=>this.plusDays('DaysPlus')}></button>
            </div>
        </div>
    </div>
       /*
       <Col sm="4">
          <Select
            classNamePrefix="select"
            defaultValue={getDropdownValue(this.state.days, this.state.ValDD[this.state.nameDD[0]], 'value')}
            options={this.state.days}
            name={this.state.nameDD[0]}
          />
        </Col>
       */
        :<></>
        }
      
      
    <div class="rd_inpunumtegitem">
        <div class="input-group numinputbooking">
            <div class="input-group-prepend rd_dropdownbtnmins">
                <button disabled={this.state.minusButtonhours} type="button" class="input-group-text" onClick={()=>this.minushours('hoursMinus')}></button>
            </div>
            <input type="text" disabled={true} class="form-control noshadfoc" id="inlineFormInputGroupUsername"
            value={this.state.hoursLabel} placeholder="10 hrs"/>
          <input type="hidden" 
            value={this.state.hoursValue} 
            name={this.state.nameDD[1]}
/>

            <div class="input-group-prepend rd_dropdownbtnplus">
                <button disabled={this.state.plusButtonhours} type="button" class="input-group-text" onClick={()=>this.plushours('hoursPlus')}></button>
            </div>
        </div>
    </div>

    <div class="rd_inpunumtegitem">
        <div class="input-group numinputbooking">
            <div class="input-group-prepend rd_dropdownbtnmins">
                <button disabled={this.state.minusButtonminutes} type="button" class="input-group-text" onClick={()=>this.minusminutes('minutesMinus')}></button>
            </div>
            <input type="text" disabled={true} class="form-control noshadfoc" id="inlineFormInputGroupUsername"
            value={this.state.minutesLabel} placeholder="10 hrs"/>
          <input type="hidden" 
            value={this.state.minutesValue} 
            name={this.state.nameDD[2]}
/>

            <div class="input-group-prepend rd_dropdownbtnplus">
                <button disabled={this.state.plusButtonminutes} type="button" class="input-group-text" onClick={()=>this.plusminutes('minutesPlus')}></button>
            </div>
        </div>
    </div>
       
      </Row>
    );
  }

}

export default CustomTimePicker;
