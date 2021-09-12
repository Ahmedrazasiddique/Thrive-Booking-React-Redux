import React from "react";
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap";
import { ListGroup, ListGroupItem } from "reactstrap";
import { Edit2, Watch, MapPin, User } from "react-feather";
import "react-perfect-scrollbar/dist/css/styles.css";
import ScrollBar from "react-perfect-scrollbar";
import "./DashboardCss/dashboardAdmin.scss";
class UpCommingEventsNew extends React.Component {
  state = {};

  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  componentDidUpdate(previousProps) {}

  render() {
    return (
      <>
       
       <div class="rd_vacationflex2">
                <div class="rd_crmspecdi">
                    <h5><strong>School Event</strong></h5>
                    <div class="rd_crmspdivcon">
                        <p>
                            <span>Attende Name :</span> Mr. Ayan
                        </p>
                        <p>
                            <span>Event Name :</span> School Name
                        </p>
                        <p>
                            <span>Location Zoom :</span> www.zoomlocation.com
                        </p>
                        <p>
                            <span>Start Time :</span> 12:30 AM
                        </p>
                        <p>
                            <span>End Time :</span> 01:00 PM 
                        </p>

                    </div>
                </div>
            </div>
      </>
    );
  }
}

export default UpCommingEventsNew;
