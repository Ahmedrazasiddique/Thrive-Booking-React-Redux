import React from "react";
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap";
import { ListGroup, ListGroupItem } from "reactstrap";
import { Edit2, Watch, MapPin, User } from "react-feather";
import "react-perfect-scrollbar/dist/css/styles.css";
import ScrollBar from "react-perfect-scrollbar";
import "./DashboardCss/dashboardAdmin.scss";
class UpCommingEvents extends React.Component {
  state = {};

  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  componentDidUpdate(previousProps) {}

  render() {
    return (
      <>
        <Card className="TopPortion">
          <CardHeader>
            <CardTitle>Your Upcomings Events</CardTitle>
          </CardHeader>

          <ScrollBar>
            <CardBody className="example">
              <ListGroup>
                <ListGroupItem>
                  <div className="d-flex justify-content-between w-100">
                    <h5 className="mb-1">Event Title</h5>
                    <small>Event Date</small>
                  </div>
                  <p className="mb-1">
                    <span>
                      <User size={12}></User> Attendee Name
                    </span>
                    <br />
                    <span>
                      <Watch size={12}></Watch> Event Name
                    </span>
                    <br />
                    <span>
                      <MapPin size={12}></MapPin> Location Zoom
                    </span>
                    <br />
                    <span>
                      <MapPin size={12}></MapPin> Start Time
                    </span>
                    <br />
                    <span>
                      <MapPin size={12}></MapPin> End Time
                    </span>
                    <br />
                  </p>
                  <div className="d-flex justify-content-between w-100">
                    <h5 className="mb-1"></h5>{" "}
                    <small>
                      <Edit2 size={12}></Edit2>
                    </small>
                  </div>
                </ListGroupItem>
                <ListGroupItem>
                  <div className="d-flex justify-content-between w-100">
                    <h5 className="mb-1">Event Title</h5>
                    <small>Event Date</small>
                  </div>
                  <p className="mb-1">
                    <span>
                      <User size={12}></User> Attendee Name
                    </span>
                    <br />
                    <span>
                      <Watch size={12}></Watch> Event Name
                    </span>
                    <br />
                    <span>
                      <MapPin size={12}></MapPin> Location Zoom
                    </span>
                    <br />
                    <span>
                      <MapPin size={12}></MapPin> Start Time
                    </span>
                    <br />
                    <span>
                      <MapPin size={12}></MapPin> End Time
                    </span>
                    <br />
                  </p>
                  <div className="d-flex justify-content-between w-100">
                    <h5 className="mb-1"></h5>{" "}
                    <small>
                      <Edit2 size={12}></Edit2>
                    </small>
                  </div>
                </ListGroupItem>
                <ListGroupItem>
                  <div className="d-flex justify-content-between w-100">
                    <h5 className="mb-1">Event Title</h5>
                    <small>Event Date</small>
                  </div>
                  <p className="mb-1">
                    <span>
                      <User size={12}></User> Attendee Name
                    </span>
                    <br />
                    <span>
                      <Watch size={12}></Watch> Event Name
                    </span>
                    <br />
                    <span>
                      <MapPin size={12}></MapPin> Location Zoom
                    </span>
                    <br />
                    <span>
                      <MapPin size={12}></MapPin> Start Time
                    </span>
                    <br />
                    <span>
                      <MapPin size={12}></MapPin> End Time
                    </span>
                    <br />
                  </p>
                  <div className="d-flex justify-content-between w-100">
                    <h5 className="mb-1"></h5>{" "}
                    <small>
                      <Edit2 size={12}></Edit2>
                    </small>
                  </div>
                </ListGroupItem>
              </ListGroup>
            </CardBody>
          </ScrollBar>
        </Card>
      </>
    );
  }
}

export default UpCommingEvents;
