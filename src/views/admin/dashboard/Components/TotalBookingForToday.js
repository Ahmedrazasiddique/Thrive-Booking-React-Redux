import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import { DollarSign } from "react-feather";
import "./DashboardCss/dashboardAdmin.scss";
class TotalBookingForToday extends React.Component {
  state = {};

  componentDidMount() {

    console.log(this.props.data.data)

  }

  componentDidUpdate(previousProps) {}

  render() {
    return (
      <>
         <div class="rd_crmspecdi">
                    <h5><strong>Total Bookings</strong></h5>
                    <h2><strong>{this.props.data.data.event_booked}</strong></h2>
                    <p>Event Booked</p>
                    <h2><strong>$ {this.props.data.data.total_revenue}</strong></h2>
                    <p>Total Revenue</p>
                </div>
      </>
    );
  }
}

export default TotalBookingForToday;
