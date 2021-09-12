import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import { ChevronDown } from "react-feather";
import Chart from "react-apexcharts";
import "../../../../assets/scss/pages/card-analytics.scss";
import "./DashboardCss/dashboardAdmin.scss";

class BookedEvents extends React.Component {
  state = {
    cl:["#45c48a",
     "#ffb863",
    "#255a77",
     "#9c8cfc",
     "#FFC085",
    "#f29292"],
    options: {
      chart: {
        dropShadow: {
          enabled: false,
          blur: 5,
          left: 1,
          top: 1,
          opacity: 0.2,
        },
        toolbar: {
          show: false,
        },
      },
      colors: ["#45c48a",
      "#ffb863",
     "#255a77",
      "#9c8cfc",
      "#FFC085",
     "#f29292"],
      /*fill: {
        type: "gradient",
        gradient: {
          gradientToColors: [
            this.props.primaryLight,
            this.props.warningLight,
            this.props.dangerLight,
          ],
        },
      }*/
      dataLabels: {
        enabled: false,
      },
      legend: { show: false },
      stroke: {
        width: 5,
      },
      labels: this.props.data.data.labels,
    },
    series: this.props.data.data.series,
  };

  componentDidMount() {}

  componentDidUpdate(previousProps) {}

  render() {
    return (
      <>
      <div class="rd_crmspecdi">
                    <h5><strong>Booked Events</strong></h5>
                    <div class="rd_flexthing">
                    

<Chart
              options={this.state.options}
              series={this.state.series}
              type="pie"
              height={290}
            />
                        <div class="rd_flexthingitemhalf">
                            <div class="rd_contentchart1thign">
                            {this.props.data.data.labels.map((person, index) => (
                            <p>
                                <span style={{backgroundColor:this.state.cl[index]}} className="rd_bluedot">

                                </span>
                                {person}
                            </p>
                     ))}    

                            </div>
                        </div>
                    </div>
                </div>
      
      </>
    );
  }
}

export default BookedEvents;
