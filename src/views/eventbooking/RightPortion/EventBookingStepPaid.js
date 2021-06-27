import React , { Component } from 'react';
import { connect } from "react-redux";
import Clock from '../../../assets/bookingeventassets/assets/clock.svg';
import Three from '../../../assets/bookingeventassets/assets/3.jpg';

import P from '../../../assets/bookingeventassets/assets/p.svg';
import C from '../../../assets/bookingeventassets/assets/c.svg';
import Share from '../../../assets/bookingeventassets/assets/Share.svg';
import Two from '../../../assets/bookingeventassets/assets/2.svg';
import Items from './Components/Items'
import PaymentSection from './Components/PaymentSection'

class EventBookingStepPaid extends Component {

  constructor(props) {
    super(props);
    this.state = {
      eventTestData:this.props.eventTestData,
      booking_addons:[],
      booking_pricing:[]
    };
  }
  addPricingData = (data, item) => {

    this.props.getAddOnAndPricing(data,'pricing')
    let booking_pricingLocal = this.state.booking_pricing;
    booking_pricingLocal.push(data);
    this.setState({booking_pricing:booking_pricingLocal});
    
  }
  removePricingData = (data, item) => {

    
    this.props.removeAddOnAndPricing(data,'pricing');
  }

  addAddOnData = (data, item) => {
   
    
    this.props.getAddOnAndPricing(data,'addon')
    let booking_addonsLocal = this.state.booking_addons;
    booking_addonsLocal.push(data);
    this.setState({booking_addons:booking_addonsLocal});
    
  }

  removeAddOnData = (data, item) => {

    this.props.removeAddOnAndPricing(data,'addon');
    
  }

  updateQuantity=(data, item) => {
  
    if(item=='pricing')
    {
      
    this.props.updateQuantity(data,'pricing')
    }
    else
    {

      this.props.updateQuantity(data,'addon')
    }
  }

  render() {
const {eventTestData} =this.state
    return (

      <div className="right_div">
<div className="row">
          <div className="col-12"><img style={{width: "100%;"}}  src={Three}/></div>
          </div>
      <div className="row sub_div">
      <div className="col-sm-12 col-md-6 col-lg-6 main_add" style={{background: "#fafafa;"}}>
          <div className="col-12" style={{border_bottom: "1px solid #d9d9d9;"}}><h1 id="sub_head">Event</h1>
          </div>
          <div className="col-12" style={{background: "white",border_bottom: "1px solid #d9d9d9",padding_top: "10px;"}}>
              <div className="row">
                 <div className="col-12"> <h1 id="sub_head">{eventTestData.event_name}</h1> </div>
                 <div className="col-12">
                  <div className="row" style={{margin_bottom: "3px;"}}>
                      <div className="col-1"><img src={Clock}/></div>
                      <div className="col-11" style={{font_size: "14px",color:"#0C4767",padding_top: "4px;"}}>1 hr and 30 mins</div>
                     </div>
              </div>

              {eventTestData.pricing.length>0?eventTestData.pricing.map((item, index) => (
             <Items updateQuantity={this.updateQuantity} removePricingData={this.removePricingData} addPricingData={this.addPricingData} eventItem = {item} itemType={"pricing"}></Items>
             

             )):[]}
              </div>
          </div>
          <div className="col-12" style={{background: "white",border_bottom: "1px solid #d9d9d9",padding_top: "10px;"}}>
                            <div className="row">
                               <div className="col-12"> <h1 id="sub_head">Add ON:</h1> </div>
                               
    {eventTestData.add_ons.length>0?eventTestData.add_ons.map((item, index) => (
<>
                               <Items updateQuantity={this.updateQuantity} removeAddOnData={this.removeAddOnData} addAddOnData={this.addAddOnData} eventItem = {item} itemType={"addon"}></Items>
                               <br/>
  </>
                               )):[]}
                               </div>
                               </div>
                               <div className="row">
                               <div className="col-lg-12" style={{background: "white",border_bottom: "1px solid #d9d9d9",padding_top: "20px",padding_left: "19px;"}}>
<br/>
</div>
</div>
          </div>






<PaymentSection checkCart={this.props.checkCart}></PaymentSection>
          </div>
          </div>


    )
  }

}

export default EventBookingStepPaid
