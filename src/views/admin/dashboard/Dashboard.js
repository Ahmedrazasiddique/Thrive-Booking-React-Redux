import React from "react"
import {
  Col
} from "reactstrap"
import BookedEvents from "./Components/BookedEvents"
import BookingSales from "./Components/BookingSales"
import SalesPerBookingType from "./Components/SalesPerBookingType"
import TotalBookingForToday from "./Components/TotalBookingForToday"
import UpCommingEvents from "./Components/UpCommingEvents"
import "swiper/css/swiper.css"
import "../../../assets/scss/plugins/extensions/swiper.scss"
let $primary = "#7367F0",
  $danger = "#EA5455",
  $warning = "#FF9F43",
  $primary_light = "#9c8cfc",
  $warning_light = "#FFC085",
  $danger_light = "#f29292"


class Dashboard extends React.Component {

state = {
    
  }



componentDidMount()
{

}

componentDidUpdate(previousProps)
{

}

  render() {
    return (<><div className="row">
      
      
      <Col md="4">

      <TotalBookingForToday></TotalBookingForToday>
        
      </Col>
      <Col md="4">
      <BookedEvents
 primary={$primary}
 warning={$warning}
 danger={$danger}
 primaryLight={$primary_light}
 warningLight={$warning_light}
 dangerLight={$danger_light}

></BookedEvents>
      </Col>
      
<UpCommingEvents></UpCommingEvents>
      <Col md="4">

      </Col>
      </div>
      
      <div className="row">
      
      <Col md="8">

      <BookingSales></BookingSales>
      </Col>
    
      <Col md="4">
<SalesPerBookingType></SalesPerBookingType>
        
      </Col>
      </div>
      </>)
}
}


export default Dashboard
