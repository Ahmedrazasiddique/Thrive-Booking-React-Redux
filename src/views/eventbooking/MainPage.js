import React , { Component } from 'react';
import { connect } from "react-redux";
import LeftNav from "./LeftPortion/LeftNav"
import EventBookingStep1 from "./RightPortion/EventBookingStep1"
import EventBookingStep2 from "./RightPortion/EventBookingStep2"
import EventBookingStep3 from "./RightPortion/EventBookingStep3"
import EventBookingFinal from "./RightPortion/EventBookingFinal"
import EventBookingStepPaid from "./RightPortion/EventBookingStepPaid"
import "../../assets/bookingeventassets/paidcss/bootstrap.css";
import "../../assets/bookingeventassets/paidcss/freecss.css";
import "../../assets/bookingeventassets/paidcss/sidebar2.css";
//import "../../assets/bookingeventassets/paidcss/logosidebar.css";
//import "../../assets/bookingeventassets/paidcss/sidebar2.css";
import logo from '../../assets/bookingeventassets/assets/logo.svg';
import logoSvg from '../../assets/bookingeventassets/assets/1.svg';
import Loader from "../../../src/components/Loader/Loader";
import { ToastContainer, toast } from "react-toastify";

import {
  getEventByID,
  savePaidEvent,
  saveFreeEvent
} from "../../actions/bookingAction";

class MainPage extends Component {
  state = {
    dataLoadedTest:true,
    isConfirmCalendar:false,
    isFreeEvent:false,
    singleEventDetails: {},
    isShowLoader:false,
    isPaidEventPage :false,
    singleEventTestData:{
      "success": true,
      "code": 0,
      "locale": "en",
      "message": "OK",
      "data": {
      "id": 1,
      "event_name": "Hair Cut ABC",
      "no_of_attendies": "5",
      "event_url": "some-url-2",
      "venue_id": 1,
      "event_format_id": 2,
      "is_event_paid": "E",
      "venue_location": "Islamabad",
      "venue_location_status": "E",
      "venue_location_notes": "some notes",
      "invitee_call_status": "",
      "host_phone_no": null,
      "venue_other_notes": null,
      "venue_other_display_status": null,
      "event_image": "/uploads/events/event-1616628306.jpg",
      "event_description": "some description here",
      "event_color": "#ccc",
      "max_no_of_booking": "4",
      "recurring_booking_status": "E",
      "allow_rescheduling_status": "E",
      "attendee_cancellation_status": "E",
      "cancellation_policy": "some text for cancellation",
      "max_no_booking_status": "D",
      "instruction_to_attendee": null,
      "ita_booking_page_status": "D",
      "ita_confirmation_page_status": "D",
      "ita_reminder_email_status": "D",
      "coupon_codes_status": "E",
      "recurrent_booking_discounts_status": "D",
      "payments": [
      {
      "id": 1,
      "event_id": 1,
      "prepayment_type": "deposit",
      "prepayment_type_flat_percent": "flat",
      "prepayment_type_price": "20"
      },
      {
      "id": 2,
      "event_id": 1,
      "prepayment_type": "partial_payment",
      "prepayment_type_flat_percent": "percent",
      "prepayment_type_price": "10"
      }
      ],
      "add_ons": [
      {
      "id": 1,
      "event_id": 1,
      "item_name": "Addon One",
      "price": "10",
      "qty": "20"
      },
      {
      "id": 2,
      "event_id": 1,
      "item_name": "Addon two",
      "price": "5",
      "qty": "2"
      }
      ],
      "pricing": [
      {
      "id": 1,
      "event_id": 1,
      "item_name": "Pricing One",
      "price": "10",
      "qty": "20"
      },
      {
      "id": 2,
      "event_id": 1,
      "item_name": "Pricing Two",
      "price": "30",
      "qty": "20"
      }
      ],
      "event_duration_in_minutes": "30",
      "invitee_set_duration_status": "D",
      "min_scheduling_notice_minutes": "15",
      "max_scheduling_notice_minutes": "10",
      "buffer_before_event_minutes": "30",
      "buffer_after_event_minutes": "30",
      "max_event_per_day": "10",
      "max_event_per_week": "50",
      "event_internal_notes": "some notes here",
      "staff_assignment_type": "2",
      "staff_assignment_method": "round-robin",
      "allow_attendee_select_staff": true,
      "schedules": [],
      "event_public_visiblity_status": null,
      "confirmation_page": null,
      "confirmation_page_url": null,
      "customer_feedback_status": null,
      "invitee_settings_type": null,
      "invitee_guests_status": null,
      "invitee_autofill_status": null,
      "email_reminder_status": null,
      "sms_reminder_status": null,
      "email_followup_status": null,
      "business_id":1,
      "questions": [{
        "id":1,
        "event_id":1,
        "question":"please answer the test question",
        "question_type":"text",
        "show_status":"E",
        "mandatory_status":"E"
      },{
        "id":2,
        "event_id":1,
        "question":"please answer the test question 2",
        "question_type":"text",
        "show_status":"E",
        "mandatory_status":"E"
      }],
      "is_active": "E",
      "staffs":[{
        "id":1,
        "first_name":"test user",
        "last_name":"new",
        "profile_image":"",

      },
      {
        "id":2,
        "first_name":"sana test",
        "last_name":"new",
        "profile_image":"",

      }]
      }
      },
      firstStepData:{},
      secondStepData:{},
      ThirdStepData:{},
      addOnItems:[],
      pricingItems:[],
      showHideOrderSummary:false,
      totalPrice:0,
      isDataPosted:false,
      FreeEventPostedJson:{
        event_id:1,
        booking_date_time:'2021-02-20 09:00:00',
        start_time:'09:00:00',
        end_time:'09:30:00',
        message_from_customer:'some message from customer',
        reminder_phone_no:'03242424',
        business_id:1,
        staff_id:1,
        email:'customer@gmail.com',
        first_name:'Ahmad',
        last_name:'Ali',
        questions:[{
          question_id:1,
          answer:'abc'
        },
        {
        question_id:1,
        answer:'xyz'
      }]
       
      },
      PaidEventPostedJson:{
        card_number:4242424242424242,
        exp_month:11,
        exp_year:2021,
        cvc:123,
        event_id:1,
        booking_date_time:'2021-02-20 09:00:00',
        start_time:'09:00:00',
        end_time:'09:30:00',
        message_from_customer:'some message from customer',
        reminder_phone_no:'03242424',
        business_id:1,
        staff_id:1,
        email:'customer@gmail.com',
        first_name:'Ahmad',
        last_name:'Ali',
        booking_addons:[{
          event_addon_id:1,
          addon_qty:1,
          addon_price:1
        }],
        booking_pricing:[{
          event_pricing_id:1,
          item_qty:1,
          item_price:1
        }],
        questions:[{
          question_id:1,
          answer:'abc'
        },
        {
        question_id:1,
        answer:'xyz'
      }]
       

      }
  }
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    //this.setState({ isShowLoader: true });
  }

  componentDidUpdate(previousProp) {
    if (previousProp !== this.props) {
      if (this.props.GetEventByIDSuccess) {
       
     //  this.setState({singleEventTestData:this.props.SingleEventDetails}) //using test data right now
        this.setState({ isShowLoader: false });
      //  this.setState({ dataLoadedTest: true });
        
      }
      if (this.props.PaidEventSuccess) {
        //  this.setState({singleEventTestData:this.props.SingleEventDetails}) using test data right now
           this.setState({ isShowLoader: false });
           this.setState({isDataPosted:true})
      toast.success("event schedule successfully");
         }

         if (this.props.FreeEventSuccess) {
          //  this.setState({singleEventTestData:this.props.SingleEventDetails}) using test data right now
              this.setState({ isShowLoader: false });
              toast.success("event schedule successfully");
              this.setState({isFreeEvent:true});
           }

        
         if (this.props.FreeEvent_fail) {  this.setState({ isShowLoader: false }); toast.error("something went wrong");}
         if (this.props.PaidEvent_fail) { this.setState({ isShowLoader: false }); this.setState({isDataPosted:false});  toast.error("something went wrong");}
         
    }
  }
  

  bookNow = (eventId, item) => {
    
    this.setState({ isShowLoader: true });
    this.props.getEventByID(eventId);
  }

  
  hideLoader = (eventId, item) => {
    
    this.setState({ isShowLoader: false });

  }

  confirmCalendar = (firstStepobj, item) => {
    
    this.setState({firstStepData:firstStepobj});
    this.setState({ isShowLoader: true });
    this.setState({ isConfirmCalendar: true });
   // this.props.getEventByID(eventId);
  }

  
  scheduleEventFree = (eventId, item) => {

    this.setState({isFreeEvent:true});
  }
  goToPaidEventPage = (eventId, item) => {

    this.setState({isPaidEventPage:true});
  }
  
  /// getting data from child component

  getSecondStepData = (data, item) => {
    
  
    this.setState({secondStepData:data});

    if(this.state.singleEventTestData.data.is_event_paid=="E")
    this.setState({isPaidEventPage:true});
    else
    this.setState({isPaidEventPage:false});

    
    if(this.state.singleEventTestData.data.is_event_paid!="E"){
    let getDummyPostedData=this.state.FreeEventPostedJson;
    getDummyPostedData.business_id=parseInt(this.state.firstStepData.business_id);
    getDummyPostedData.event_id=parseInt(this.state.firstStepData.event_id);
    getDummyPostedData.start_time=this.state.firstStepData.selectedTimeSlot;
    getDummyPostedData.end_time=this.state.firstStepData.selectedTimeSlot;
    getDummyPostedData.booking_date_time=this.state.firstStepData.selected_date+' 09:00:00';
    getDummyPostedData.staff_id=parseInt(this.state.firstStepData.staff_id)

    //fill second step data 
    getDummyPostedData.email=data.email
    getDummyPostedData.first_name= data.name
    getDummyPostedData.last_name=data.name
    getDummyPostedData.message_from_customer=data.optionalQuestion
    getDummyPostedData.reminder_phone_no='+'+data.phoneNoPre+ data.phoneNoPost

    var questions = [];
    if(this.state.singleEventTestData.data.questions.length>0)
    {
      this.state.singleEventTestData.data.questions.forEach(element => {
        var obj ={};
        obj.question_id=element.id;
        obj.answer=data['QuestionID_'+element.id]
        questions.push(obj);
      });
    }
    getDummyPostedData.questions=questions;
    this.setState({ isShowLoader: true });
    this.props.saveFreeEvent(getDummyPostedData)
  }

    
  }
  ////////////////////
  getAddOnAndPricing = (data, type) => {

    if(data)
    {
      this.setState({showHideOrderSummary:true})
    }
    else
    {
      
      this.setState({showHideOrderSummary:false})
    }
    if(type=='addon'){
    this.setState({
      addOnItems: [...this.state.addOnItems, data]
    });

  
    }
    else
    {
      
      this.setState({
        pricingItems: [...this.state.pricingItems, data]
      });
    
    }

  }
  
  removeAddOnAndPricing = (data, type) => {

    
    if(type=='pricing')
    {
      this.setState(state => {
        const filteredItems = this.state.pricingItems.filter(pricingItems => pricingItems.event_pricing_id !== data.event_pricing_id);
        return {
          pricingItems: filteredItems
        };
      });
    }
    else
    {
      this.setState(state => {
        const filteredItems = this.state.addOnItems.filter(addOnItems => addOnItems.event_addon_id !== data.event_addon_id);
        return {
          addOnItems: filteredItems
        };
      });
    }
  }

  ////// update quantity 
  
  updateQuantity = (data, type) => {

    if(type=='pricing'){
 
    this.setState({
      pricingItems: this.state.pricingItems.map(el => (el.event_pricing_id === data.event_pricing_id ? Object.assign({}, el, { item_qty:data.item_qty }) : el))
    });

   
  }
  else
  {
    this.setState({
      addOnItems: this.state.addOnItems.map(el => (el.event_addon_id === data.event_addon_id ? Object.assign({}, el, { addon_qty:data.addon_qty }) : el))
    });
  }
  }

  postFreeEventData= (data, type) => {
    let getDummyPostedData=this.state.PaidEventPostedJson;
    getDummyPostedData.business_id=parseInt(this.state.firstStepData.business_id);
    getDummyPostedData.event_id=parseInt(this.state.firstStepData.event_id);
    getDummyPostedData.start_time=this.state.firstStepData.selectedTimeSlot;
    getDummyPostedData.end_time=this.state.firstStepData.selectedTimeSlot;
    getDummyPostedData.booking_date_time=this.state.firstStepData.selected_date+' 09:00:00';
    getDummyPostedData.staff_id=parseInt(this.state.firstStepData.staff_id)

    //fill second step data 
    getDummyPostedData.email=data.secondStepData.email
    getDummyPostedData.first_name= data.secondStepData.name
    getDummyPostedData.last_name=data.secondStepData.name
    getDummyPostedData.message_from_customer=data.secondStepData.optionalQuestion
    getDummyPostedData.reminder_phone_no='+'+data.secondStepData.phoneNoPre+ data.secondStepData.phoneNoPost

    var questions = [];
    if(this.state.singleEventTestData.data.questions.length>0)
    {
      this.state.singleEventTestData.data.questions.forEach(element => {
        var obj ={};
        obj.question_id=element.id;
        obj.answer=data['QuestionID_'+element.id]
        questions.push(obj);
      });
    }
    getDummyPostedData.questions=questions;
    this.setState({ isShowLoader: true });
    this.props.saveFreeEvent(getDummyPostedData)

  }


  checkCart= (data, type) => {
    
    if(this.state.pricingItems.length>0||this.state.addOnItems.length>0)
    {
      
      let getDummyPostedData=this.state.PaidEventPostedJson;

      //fill first step data 
      getDummyPostedData.business_id=parseInt(this.state.firstStepData.business_id);
      getDummyPostedData.event_id=parseInt(this.state.firstStepData.event_id);
      getDummyPostedData.start_time=this.state.firstStepData.selectedTimeSlot;
      getDummyPostedData.end_time=this.state.firstStepData.selectedTimeSlot;
      getDummyPostedData.booking_date_time=this.state.firstStepData.selected_date+' 09:00:00';
      getDummyPostedData.staff_id=parseInt(this.state.firstStepData.staff_id)

      //fill second step data 
      getDummyPostedData.email=this.state.secondStepData.email
      getDummyPostedData.first_name= this.state.secondStepData.name
      getDummyPostedData.last_name=this.state.secondStepData.name
      getDummyPostedData.message_from_customer=this.state.secondStepData.optionalQuestion
      getDummyPostedData.reminder_phone_no='+'+this.state.secondStepData.phoneNoPre+ this.state.secondStepData.phoneNoPost

      var questions = [];
      if(this.state.singleEventTestData.data.questions.length>0)
      {
        this.state.singleEventTestData.data.questions.forEach(element => {
          var obj ={};
          obj.question_id=element.id;
          obj.answer=this.state.secondStepData['QuestionID_'+element.id]
          questions.push(obj);
        });
      }
      getDummyPostedData.questions=questions;

      // fill third step 
      getDummyPostedData.card_number=parseInt(data.card_number)
      getDummyPostedData.exp_month= parseInt(data.exp_month)
      getDummyPostedData.exp_year=parseInt(data.exp_year)
      getDummyPostedData.cvc=parseInt(data.cvc)

      //add ons 
      if(this.state.addOnItems.length>0)
      {
        getDummyPostedData.booking_addons=this.state.addOnItems
      }
      //pricing
 if(this.state.pricingItems.length>0)
      {
        getDummyPostedData.booking_pricing=this.state.pricingItems
      }

      this.setState({ThirdStepData:data})
      console.log('first Step',this.state.firstStepData)
      console.log('second',this.state.secondStepData)
      console.log('third',data)
      console.log('addons',this.state.addOnItems)
      console.log('pricing',this.state.pricingItems)
     

      console.log('final paid data',getDummyPostedData);
      this.setState({ isShowLoader: true });
      this.props.savePaidEvent(getDummyPostedData)
    //  this.setState({isPaidEventPage:false})
      
    }
    else
    {
      toast.error("please select at least one item");
     
    }
  }

  


  render() {
const {isShowLoader ,isFreeEvent,isPaidEventPage,isDataPosted,dataLoadedTest} =this.state;
    return (
      <>
       <ToastContainer />
      <div className="container-fluid">
      <nav className="navbar navbar-expand-sm justify-content-center top_nav shadow">
          <a className="navbar-brand" href="#">
              <img src={logo} alt="Logo" style={{width:"100%"}}/>
            </a>
        </nav>

       {

        /*
       <nav className="navbar navbar-expand-sm main_noti shadow">
            <ul className="navbar-nav">
            <li className="nav-item noti_side">
              <img src={logoSvg} />
            </li>

                  <li className="nav-item left_noti"> <span> This is a warning alert — check it out! Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, </span></li>


          </ul>

      </nav>

      */

  }

      </div>
      <div className="main_div">
      <div className="left_div">
    <LeftNav OrderSummaryShowHide={this.state.showHideOrderSummary} 
    OrderSummaryAddon={this.state.addOnItems}
    OrderSummaryPricing={this.state.pricingItems}
    totalPrice={this.state.totalPrice}
    ></LeftNav>
    </div>
    
<Loader isShowLoader={isShowLoader}></Loader>

    {!this.props.GetEventByIDSuccess?
   <EventBookingStep1 bookNow = {this.bookNow}></EventBookingStep1>:<></>}
{
  this.props.GetEventByIDSuccess && !this.state.isConfirmCalendar?
  <EventBookingStep2 eventTestData={this.state.singleEventTestData.data} confirmCalendar={this.confirmCalendar} eventData = {this.props.SingleEventDetails}></EventBookingStep2> 
  
  :<></>

}
{  this.state.isConfirmCalendar && !isFreeEvent && !isPaidEventPage?
  <EventBookingStep3 isFreeOrPaidEvent = {this.state.singleEventTestData.data.is_event_paid=="E"?true:false} scheduleEventFree={this.scheduleEventFree} goToPaidEventPage={this.goToPaidEventPage} getSecondStepData= {this.getSecondStepData}eventTestData={this.state.singleEventTestData.data} hideLoader={this.hideLoader}  eventData = {this.props.SingleEventDetails}></EventBookingStep3> 
  
  :<></>
  
  }
  {
    isFreeEvent?
    <EventBookingFinal eventTestData={this.state.singleEventTestData.data}></EventBookingFinal>
    :<></>
  }
    {
    isDataPosted?
    <EventBookingFinal eventTestData={this.state.singleEventTestData.data}></EventBookingFinal>
    :<></>
  }
  {
    isPaidEventPage && !isDataPosted?
    <EventBookingStepPaid checkCart={this.checkCart} updateQuantity={this.updateQuantity} removeAddOnAndPricing={this.removeAddOnAndPricing} getAddOnAndPricing={this.getAddOnAndPricing} eventTestData={this.state.singleEventTestData.data}></EventBookingStepPaid>
    :<></>
  }

 {/*<EventBookingStepPaid checkCart={this.checkCart} updateQuantity={this.updateQuantity} removeAddOnAndPricing={this.removeAddOnAndPricing} getAddOnAndPricing={this.getAddOnAndPricing} eventTestData={this.state.singleEventTestData.data}></EventBookingStepPaid>*/}
    </div>
            
    </>);
 
}

}


const mapStateToProps = (state) => {
  return {
    SingleEventDetails: state.booking.SingleEventDetails,
    GetEventByIDSuccess: state.booking.GetEventByIDSuccess,
    PaidEventSuccess:state.booking.PaidEventSuccess,
    FreeEventSuccess:state.booking.FreeEventSuccess,
    FreeEvent_fail:state.booking.FreeEvent_fail,
    PaidEvent_fail:state.booking.PaidEvent_fail


  };
};

const actionMethods = {
  getEventByID: getEventByID,
  savePaidEvent:savePaidEvent,
  saveFreeEvent:saveFreeEvent
};

export default connect(mapStateToProps, actionMethods)(MainPage);

