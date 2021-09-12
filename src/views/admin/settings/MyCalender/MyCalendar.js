import React from "react";
import { connect } from "react-redux";
import CalendarView from './Components/CalendarView'
import ListView from './Components/ListView'
import Filters from './Components/Filters'
import {
    getCalendarView
} from "../../../../actions/myCalendarActions";

class MyCalendar extends React.Component {
  constructor(props) {
    super(props);

   
  }
  state={
    isCalendarView:true,
    filter:{
      is_calendar_view:"E",
      filter:{selected_month:"",selected_year:"",staff:""},
      filter2:{selected_date:""}
  },
}
searchFilter=(sFilter)=>{

  if(this.state.isCalendarView){
  let value = {
    ...this.state.filter.filter,
    ...sFilter,
  };
  /*
  this.setState({
    filter: {
      is_calendar_view:"E",
      filter:{
      // object that we want to update
      ...this.state.filter.filter, // keep all other key-value pairs
      ...value, // update the value of specific key
  }},});
*/

  this.props.getCalendarView({
    is_calendar_view:"E",
    filter:{
    // object that we want to update
    ...this.state.filter.filter, // keep all other key-value pairs
    ...value, // update the value of specific key
  }});

  }
  else
  {

    let value = {
      ...this.state.filter.filter2,
      ...sFilter,
    };
    /*
    this.setState({
      filter: {
        is_calendar_view:"D",
        filter:{
        // object that we want to update
        ...this.state.filter.filter2, // keep all other key-value pairs
        ...value, // update the value of specific key
    }},});
  */
  
    this.props.getCalendarView({
      is_calendar_view:"D",
      filter:{
      // object that we want to update
      ...this.state.filter.filter2, // keep all other key-value pairs
      ...value, // update the value of specific key
    }});

  }

  console.log(JSON.stringify(this.state.filter, null, 2))
  }

  toggle=(isShow)=>{
    if(this.state.isCalendarView)
    {
        this.setState({isCalendarView:isShow})
    }else
    {
        
        this.setState({isCalendarView:isShow})
    }
  }
 


      render()
      {
return (
    <div className="eventdetailsaddbox rd_noshadow">
          <div className="boxheader rd_floatingheaderthig">
            <div className="rd_inputselectheader">
                <div className="rd_selectheaderrdt2">
                    <h3><strong>My Calendar</strong></h3>
                  </div>
            </div>
          </div> 
          
    <div className="rd_flexthingherecalendar">
          <Filters searchFilter={this.searchFilter} isCalendarView={this.state.isCalendarView}></Filters>
        
        
          <div className="rd_vacationfilterpart rd_calendartabthing2">
              
          <div className="box_content">
          <div className="box_content_section">
              <div className="rd_contentheadcalendpa">
                <div style={{display:'none'}} className="rd_slecttimezothincal">
                  <select name="" id="" className="form-select rd_worldiconinputsle">
                    <option value="Philippine Time (3:55)">
                      Philippine Time (3:55)
                    </option>
                  </select>
                </div>

                <div className="rd_boxorganordercale">

                  <button className={`rd_listorderbtn ${
            this.state.isCalendarView == false ? "active" : ""
          }`}
          onClick={()=>this.toggle(false)}></button>

                  <button className={`rd_gridorderbtn ${
            this.state.isCalendarView == true ? "active" : ""
          }`}
          
          onClick={()=>this.toggle(true)}></button>
                </div>
              </div>
            </div>
            
        {this.state.isCalendarView?
<CalendarView></CalendarView>
:
<ListView/>
      }
</div>
        </div>
       
    </div>
</div>
);
      }
  
}

const mapStateToProps = (state) => {
  return {
    IsPopUpShow:state.mycalendar.IsPopUpShow,
  };
};
const actionMethods = {
  getCalendarView: getCalendarView,
};

export default connect(mapStateToProps, actionMethods)(MyCalendar);