import React from "react"
import {
  Col
} from "reactstrap"
import BookedEvents from "./Components/BookedEvents"
import BookingSales from "./Components/BookingSales"
import SalesPerBookingType from "./Components/SalesPerBookingType"
import TotalBookingForToday from "./Components/TotalBookingForToday"
import UpCommingEventsNew from "./Components/UpCommingEventsNew"
import "swiper/css/swiper.css"
import "../../../assets/scss/plugins/extensions/swiper.scss"
import { connect } from "react-redux";
import {
  getDashboardFirst,
  getDashboardSecond,
  getDashboardThird,
  getDashboardForth,
  getDashboardFifth
} from "../../../actions/adminDashboardActions";
import Loader from "../../../components/Loader/Loader";

let $primary = "#7367F0",
  $danger = "#EA5455",
  $warning = "#FF9F43",
  $primary_light = "#9c8cfc",
  $warning_light = "#FFC085",
  $danger_light = "#f29292"
 

class Dashboard extends React.Component {


  componentDidMount() {

    const { getDashboardFirst,
      getDashboardSecond,
      getDashboardThird,
      getDashboardForth,
      getDashboardFifth} = this.props;
      getDashboardFirst(0);
      getDashboardSecond(0);
      getDashboardThird(0);
      getDashboardForth(0);
      getDashboardFifth(0);

  }

  componentDidUpdate(previousProps) {

    if (previousProps !== this.props) {
     
      if(this.props.FifthSuccess)
      {
         
      }
    }

  }

state = {
    
  }

  render() {
    return (<>
     <Loader isShowLoader={this.props.showLoader}></Loader>
      <div class="eventdetailsaddbox rd_noshadow">
      <div class="rd_vacationfilterpart">
            <div class="rd_vacationflex2">
              {
                this.props.FirstSuccess?
      <TotalBookingForToday data={this.props.AdminDashboardFirst}> </TotalBookingForToday>
              :<></>}
            </div>
            <div class="rd_vacationflex2">
            {
                this.props.SecondSuccess?
            <BookedEvents data={this.props.AdminDashboardSecond}
 primary={$primary}
 warning={$warning}
 danger={$danger}
 primaryLight={$primary_light}
 warningLight={$warning_light}
 dangerLight={$danger_light}

></BookedEvents>
:<></>  
}
            </div>
        </div>

        <div class="rd_vacationfilterpart">
        {
                this.props.ThirdSuccess?
                <>
       <UpCommingEventsNew data={this.props.AdminDashboardThird}></UpCommingEventsNew>
       <UpCommingEventsNew data={this.props.AdminDashboardThird}></UpCommingEventsNew>
            
       <UpCommingEventsNew data={this.props.AdminDashboardThird}></UpCommingEventsNew>
            </>
        :<></>}
            </div>
     
        <div class="rd_vacationfilterpart">
        {
                this.props.ForthSuccess?
         <BookingSales data={this.props.AdminDashboardForth}></BookingSales>
        :<></>}
        </div>


        <div class="rd_vacationcontentpatrt">
        {
                this.props.FifthSuccess?
            <SalesPerBookingType data={this.props.AdminDashboardFifth.data}></SalesPerBookingType>
            :<></>
        }
        </div>
        
      
      </div>
      </>)
}
}


const mapStateToProps = (state) => {
  return {
    AdminDashboardFirst: state.adminDashboard.AdminDashboardFirst,
   
    AdminDashboardSecond: state.adminDashboard.AdminDashboardSecond,
    AdminDashboardThird: state.adminDashboard.AdminDashboardThird,
    AdminDashboardForth: state.adminDashboard.AdminDashboardForth,
    AdminDashboardFifth: state.adminDashboard.AdminDashboardFifth,

    FirstSuccess:state.adminDashboard.FirstSuccess,
    SecondSuccess:state.adminDashboard.SecondSuccess,
    ThirdSuccess:state.adminDashboard.ThirdSuccess,
    ForthSuccess:state.adminDashboard.ForthSuccess,
    FifthSuccess:state.adminDashboard.FifthSuccess,

    IsError: state.adminDashboard.IsError,
    showLoader: state.adminDashboard.showLoader,
  };
};

const actionMethods = {
  getDashboardFirst:getDashboardFirst,
  getDashboardSecond:getDashboardSecond,
  getDashboardThird:getDashboardThird,
  getDashboardForth:getDashboardForth,
  getDashboardFifth:getDashboardFifth
};

export default connect(mapStateToProps, actionMethods)(Dashboard);