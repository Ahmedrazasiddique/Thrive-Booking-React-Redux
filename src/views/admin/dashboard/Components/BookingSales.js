import React from "react";
import "./DashboardCss/dashboardAdmin.scss";
class BookingSales extends React.Component {
  state = {};

  componentDidMount() {
     
    console.log("forth",this.props.data)
  }

  componentDidUpdate(previousProps) {}

  render() {
    return (
      <>
         <div class="rd_vacationflex2">
                <div class="rd_crmspecdi rd_crmspecdinobor">
                    <h5><strong>Booking Sales</strong></h5>
                    <h2><strong>{this.props.data.data.event_booked}</strong></h2>
                    <p>Total Event Booked</p>
                    <h2><strong>$ {this.props.data.data.total_revenue}</strong></h2>
                    <p>Total Revenue</p>
                </div>
            </div>
            <div class="rd_vacationflex2">
                <div class="rd_crmspecdi rd_crmspecdinobor">
                    <h5><strong>Total Bookings</strong></h5>
                    <h2><strong>{this.props.data.data.event_cancelled}</strong></h2>
                    <p>Cancelled Events</p>
                    <h2><strong>$ {this.props.data.data.revenue_lost_from_cancellation}</strong></h2>
                    <p>Revenue Loss due to Cancellations</p>
                </div>
            </div>
            <div class="rd_vacationflex2">
                <div class="rd_crmspecdi rd_crmspecdinobor rd_crmspecdinoborf">
                    <h5><strong>Total Bookings</strong></h5>
                    <h2><strong> {this.props.data.data.no_show}</strong></h2>
                    <p>No-Shows</p>
                    <h2><strong>$ {this.props.data.data.revenue_lost_from_no_show}</strong></h2>
                    <p>Revenue Loss from No-Shows</p>
                </div>
            </div>
      </>
    );
  }
}

export default BookingSales;
