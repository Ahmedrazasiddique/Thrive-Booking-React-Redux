import React , { Component } from 'react';
import { connect } from "react-redux";
import One from '../../../assets/bookingeventassets/assets/1.svg';
import P from '../../../assets/bookingeventassets/assets/p.svg';
import C from '../../../assets/bookingeventassets/assets/c.svg';
import Share from '../../../assets/bookingeventassets/assets/Share.svg';
import Two from '../../../assets/bookingeventassets/assets/2.svg';
import { baseURLImages } from "../../../Helper";
import Loader from "../../../../src/components/Loader/Loader";
import {
    getEventsList
  } from "../../../actions/bookingAction";

class EventBookingStep1 extends Component {

    state = {
        eventList: [],
        isShowLoader:true
      }
      constructor(props) {
        super(props);
      }
      componentDidMount() {
        const { getEventsList } = this.props;
        getEventsList(1);
        this.setState({ isShowLoader: true });
      }
    
      componentDidUpdate(previousProp) {
        if (previousProp !== this.props) {
          if (this.props.EventListSuccess) {
            this.setState({eventList:this.props.EventList.data.events})
            console.log(this.state.eventList);
            this.setState({ isShowLoader: false });
          }
        }
      }
  render() {
const {eventList,isShowLoader}= this.state;
console.log(eventList)

    return (
<div class="right_div">

<Loader isShowLoader={isShowLoader}></Loader>
<div class="row">
 <div class="col-12">
     <nav class="navbar navbar-expand-sm main_noti shadow">
  <ul class="navbar-nav">
  <li class="nav-item noti_side">
    <img   src={One}/>
  </li>

        <li class="nav-item left_noti"> <span> This is a warning alert — check it out! Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, </span></li>


</ul>

</nav></div>
    <div class="col-12"><h1>Events</h1></div>
    </div>
    
    <div class="row sub_div">
       
    {eventList.length>0?eventList.map((item, index) => (
     <div class="col-sm-12 col-md-6 col-lg-4 main_add" key={item.id}>
         <div class="row">
             <div class="col-12">
                 <img class="add_pic" src={item.event_image?(baseURLImages+item.event_image):Two}/>
             </div>
            <div class="col-12 events_name">
             <h2>{item.event_title}</h2>
            </div>
            <div class="col-6">
                <div class="row" style={{padding_left: "10px"}}>
                    <div class="col-2 sechulde_s"><img src={P}/></div>
                    <div class="col-10 sechulde_d">March 23, 2021</div>
                </div>
            </div>
            <div class="col-6">
             <div class="row">
                 <div class="col-2 sechulde_s"><img src={C}/></div>
                 <div class="col-10 sechulde_d">March 23, 2021</div>
             </div>
         </div>
         <div class="col-12 add_buttons">
             <div class="row">
                 <div class="col-8" ><button type="button" class="btn btn-primary" onClick={()=>this.props.bookNow(item.id)}>Book Now</button></div>
                 <div class="col-4"><button type="button" class="btn btn-default"><img src={Share}/>Share</button></div>
             </div>
         </div>
            </div>

        </div>
    )):[]}



            </div>

        </div>

        );
    }
  }

        const mapStateToProps = (state) => {
            return {
                EventList: state.booking.EventList,
                EventListSuccess: state.booking.EventListSuccess,
          
            };
          };
          
          const actionMethods = {
            getEventsList: getEventsList,
          };
          
          export default connect(mapStateToProps, actionMethods)(EventBookingStep1);