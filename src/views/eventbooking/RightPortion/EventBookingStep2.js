import React , { Component } from 'react';
import { connect } from "react-redux";

import "../../../assets/bookingeventassets/calender/fonts/icomoon/style.css";
import "../../../assets/bookingeventassets/calender/css/rome.css";
import "../../../assets/bookingeventassets/calender/css/style.css";


import One from '../../../assets/bookingeventassets/assets/1.svg';
import P from '../../../assets/bookingeventassets/assets/p.svg';
import C from '../../../assets/bookingeventassets/assets/c.svg';
import Share from '../../../assets/bookingeventassets/assets/Share.svg';
import Two from '../../../assets/bookingeventassets/assets/2.svg';
import Three from '../../../assets/bookingeventassets/assets/3.jpg';
import Four from '../../../assets/bookingeventassets/assets/4.svg';

import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';


import Loader from "../../../../src/components/Loader/Loader";

import { ToastContainer, toast } from "react-toastify";

import {
    getAvalaibleSlots
  } from "../../../actions/bookingAction";
  

class EventBookingStep2 extends Component {

  constructor(props) {
    super(props)
    
    this.state = {
      selectedDateNew:"",
      isShowLoader:false,
      selectDate: new Date(),
      isTimeSlotsAvalaible:false,
      CalendarDate:new Date(),
    //  eventData:this.props.eventData.data
      eventData:this.props.eventTestData,
      businessId:this.props.eventTestData.business_id,
      staffs:[],
      selectedStaffId:0,
      slots:[],
      getAvalaibleSlotsObj:{selected_date:"2021-06-24",
        staff_id:0,
        business_id:this.props.eventTestData.business_id,
        event_id:this.props.eventTestData.id},
        selectedTimeSlot:"",
    
    };

    this.onDateChange = this.onDateChange.bind(this);
  }

  selectStaff(staffID,staffName)
  {
    let value = { ['staff_id']: staffID };
    value = {
      ...this.state.getAvalaibleSlotsObj,
      ...value,
    };
    this.setState({
      getAvalaibleSlotsObj: {
        // object that we want to update
        ...this.state.getAvalaibleSlotsObj, // keep all other key-value pairs
        ...value, // update the value of specific key
      },
    });
    this.setState({selectedStaffId:staffID})
    
    toast.success(staffName+" is selected");
  }
  componentDidMount(previousProp) {
    this.setState({staffs:this.props.eventTestData.staffs})
    
  }

  componentDidUpdate(previousProp)
  {
    if (previousProp !== this.props) {
      if (this.props.AvalaibleSlotsSuccess) {

        this.setState({isShowLoader:false})
        if(this.props.AvalaibleSlots.length>0){
          this.setState({isTimeSlotsAvalaible:true,
            slots:this.props.AvalaibleSlots})
        }
        else
        {
          this.setState({isTimeSlotsAvalaible:false,
            slots:[]
          })
          toast.error("no avalaible slots are found.");
        }
          console.log("AvalaibleSlotsSuccess",this.props.AvalaibleSlots);
      }
      else
      {
        
        this.setState({isShowLoader:false})
      }
  }
  }

  onDateChange(date) {
    this.setState({
      selectDate: date,
      
    })
    var eventDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

    this.setState({selectedDateNew:eventDate})

    console.log('date :',eventDate)
    
    let value = { ['selected_date']: eventDate };
    value = {
      ...this.state.getAvalaibleSlotsObj,
      ...value,
    };
    this.setState({
      getAvalaibleSlotsObj: {
        // object that we want to update
        ...this.state.getAvalaibleSlotsObj, // keep all other key-value pairs
        ...value, // update the value of specific key
      },
    });
    if(this.state.getAvalaibleSlotsObj.staff_id==0){
      toast.error("please select a staff");
      }else{
        this.setState({isShowLoader:true})
    this.props.getAvalaibleSlots(value);
      }
  }

  selectTimeSlot(timeSlot)
  {
    let value = { ['selectedTimeSlot']: timeSlot };
    value = {
      ...this.state.getAvalaibleSlotsObj,
      ...value,
    };
    this.setState({
      getAvalaibleSlotsObj: {
        // object that we want to update
        ...this.state.getAvalaibleSlotsObj, // keep all other key-value pairs
        ...value, // update the value of specific key
      },
    });

    this.setState({selectedTimeSlot:'confirm,'+timeSlot})
  }

  confirmInner= (e) => {

    if(this.state.getAvalaibleSlotsObj.staff_id==0){
    toast.error("please select a staff");
    }
    else
    {
      this.props.confirmCalendar(this.state.getAvalaibleSlotsObj)
    }
  //  toast.success("Company Info Updated Successfully");
  //  this.props.confirmCalendar(1)
    console.log("Second Step Data",this.state.getAvalaibleSlotsObj)
  }


  render() {
    const {eventData,staffs,selectedTimeSlot,slots,isShowLoader} = this.state;
    return (
           <div className="right_div">
    <ToastContainer />
    
<Loader isShowLoader={isShowLoader}></Loader>
<div className="row">
          <div className="col-12"><img style={{width: "100%;"}}  src={Three}/></div>
          </div>
          <div className="row sub_div">
           <div className="col-sm-12 col-md-12 col-lg-12 main_add">

               <div className="col-12"> <div className="row">
                   <div className="col-1"><i className="fa fa-arrow-left" aria-hidden="true" style={{color: "#0C4767",
                    font_size: "20px",
                    margin_top: "5px;"}}></i></div>
                   <div className="col-11" style={{margin_left: "-80px;"}}><h1>{eventData.event_name}</h1></div>
               </div></div>

              <div className="col-6">
                  <div className="row">
                   <div className="col-6" style={{margin_bottom: "15px;"}}>
                       <div className="row" style={{padding_left: "10px;"}}>
                           <div className="col-2 sechulde_s"><img src={P}/></div>
                           <div className="col-10 sechulde_d">March 23, 2021</div>
                       </div>
                   </div>
                   <div className="col-6">
                    <div className="row">
                        <div className="col-2 sechulde_s"><img src={C}/></div>
                        <div className="col-10 sechulde_d">March 23, 2021</div>
                    </div>
                </div>
                  </div>
              </div>


              </div>


               </div>

              <div className="row sub_div">
               <div className="col-12 "><h1 style={{font_size: "20px",margin_top: "30px;"}}>Description</h1></div>
              </div>
               <div className="row sub_div">
               <div className="col-12 main_add" style={{padding: "15px;"}}>
                   <p>
                      {eventData.event_description}
                   </p>
               </div>
              </div>
              {
                  
                  eventData.allow_attendee_select_staff && eventData.staffs.length>0?
                  <>
              <div className="row sub_div">
               <div className="col-12 "><h1 style={{font_size: "20px",margin_top: "30px;"}}>Choose Staff</h1></div>
              </div>
               <div className="row sub_div">
                   
              
               <div className="col-12 main_add" style={{padding: "15px;"}}>
                  <div className="col-12">
                      <div className="row main_staff_div">
                        
               {eventData.staffs.length>0?eventData.staffs.map((item, index) => (
                          <div className="col-2 main_staff">
                              <div className="row" >
                                  <div className="col-12" onClick={()=>this.selectStaff(item.id,((item.first_name) + " " +(item.last_name)))} id={item.id} style={{font_size: "14px;"}}>
                                   <img src={Four}/>
                                  </div>
                                  <div className="col-12">
                                   <span >{(item.first_name) + " " +(item.last_name)}</span>
                                  </div>
                              </div>


                          </div>
                         
                  )):[]}
                      </div>
                  </div>
               </div>
            
              </div></>:<></>
             
  }
              <div className="row sub_div">
               <div className="col-12 "><h1 style={{font_size: "20px",margin_top: "30px;"}}>Select Date</h1></div>
              </div>
              <div className="row sub_div">
                <div className="col-sm-6 col-lg-6 col-md-6">
                <Calendar
        onChange={this.onDateChange}
        value={this.state.CalendarDate}
      />

                </div>
                {
                    this.state.isTimeSlotsAvalaible?

                <div className="col-sm-6 col-lg-6 col-md-6">
                   <div className="col-12">
                       <div className="row main_time_div" style={{background_color: "white;"}}>
                         {slots.length>0?slots.map((item, index) => (
                           <div className="col-5 main_time" onClick={()=>this.selectTimeSlot(item)}>{item}</div>
                          
                           )):[]}

                       </div>
                   </div>
                   <div className="col-12 confirm_button_div" style={{background_color: "white;"}}>
                     { selectedTimeSlot!=""?<button type="button" class="btn btn-info btn-block main_button" id="cnfrm_btn" onClick={this.confirmInner}>{selectedTimeSlot}</button>:<></>}
                   </div>
                </div>
                :
                <></>
  }
              </div>
          </div>
    );
  }
}


const mapStateToProps = (state) => {
  
    return {
        AvalaibleSlots: state.booking.AvalaibleSlots,
        AvalaibleSlotsSuccess: state.booking.AvalaibleSlotsSuccess,
  
    };
  };
  
  const actionMethods = {
    getAvalaibleSlots: getAvalaibleSlots,
  };
  
  export default connect(mapStateToProps, actionMethods)(EventBookingStep2);