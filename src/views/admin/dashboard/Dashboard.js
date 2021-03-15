import React from "react"
import {
  Card,
  CardBody,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from "reactstrap"
import classnames from "classnames"
import { User, Info, Share } from "react-feather"
import BookedEvents from "./Components/BookedEvents"
import BookingSales from "./Components/BookingSales"
import NotificationFeed from "./Components/NotificationFeed"
import SalesPerBookingType from "./Components/SalesPerBookingType"
import TotalBookingForToday from "./Components/TotalBookingForToday"
import UpCommingEvents from "./Components/UpCommingEvents"
import "swiper/css/swiper.css"
import "../../../assets/scss/plugins/extensions/swiper.scss"
let $primary = "#7367F0",
  $success = "#28C76F",
  $danger = "#EA5455",
  $warning = "#FF9F43",
  $info = "#00cfe8",
  $primary_light = "#9c8cfc",
  $warning_light = "#FFC085",
  $danger_light = "#f29292",
  $info_light = "#1edec5",
  $stroke_color = "#b9c3cd",
  $label_color = "#e7eef7",
  $purple = "#df87f2",
  $white = "#fff"

class Dashboard extends React.Component {

state = {
    
  }

constructor(props)
{
    super(props);
}

componentDidMount()
{

}

componentDidUpdate(previousProps)
{

}

  render() {
    return (<><div class="row">
      
      <Col md="3">

<NotificationFeed></NotificationFeed>
      </Col>
      <Col md="6">

        
<BookingSales></BookingSales>
      </Col>
      <Col md="3">
        <TotalBookingForToday></TotalBookingForToday>
      </Col>
      </div>
      
      <div class="row">
      
      <Col md="4">
<UpCommingEvents></UpCommingEvents>

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
      <Col md="4">
<SalesPerBookingType></SalesPerBookingType>
        
      </Col>
      </div>
      </>)
}
}


export default Dashboard
