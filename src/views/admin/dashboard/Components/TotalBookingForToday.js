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

  componentDidMount() {}

  componentDidUpdate(previousProps) {}

  render() {
    return (
      <>
        <Card className="TopPortion">
          <CardHeader>
            <CardTitle>Total Bookings</CardTitle>
          </CardHeader>
          <CardBody>
            <ListGroup className="list-group-horizontal-sm">
              <ListGroupItem className="col-md-12">
                <div className="stats-card-body d-flex justify-content-center flex-column text-center pb-2 pt-2 card-body">
                  <div className="title-section">
                    <h2 className="text-bold-600 mt-1 mb-25">17</h2>
                    <p className="mb-0">Event Booked</p>
                  </div>
                </div>
                <hr />
                <div className="stats-card-body d-flex justify-content-center flex-column text-center pb-2 pt-2 card-body">
                  <div className="title-section">
                    <h2 className="text-bold-600 mt-1 mb-25">
                      <DollarSign size={26}></DollarSign>200
                    </h2>
                    <p className="mb-0">Total Revenue</p>
                  </div>
                </div>
              </ListGroupItem>
            </ListGroup>
          </CardBody>
        </Card>
      </>
    );
  }
}

export default TotalBookingForToday;
