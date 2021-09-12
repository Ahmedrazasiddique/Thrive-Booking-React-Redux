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
} from "reactstrap";
import { ChevronDown } from "react-feather";
import Chart from "react-apexcharts";
import "./DashboardCss/dashboardAdmin.scss";

class SalesPerBookingType extends React.Component {
  state = {
    options: {
      chart: {
        id: "barChart",
      },
      xaxis: {
       // type: "datetime",
        categories: this.props.xAxis?this.props.xAxis:[],
      },
      stroke: {
        curve: "smooth",
      },
      dataLabels: {
        enabled: false,
      },
    
      colors: "#ffb863",
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5,
        },
      },
      legend: {
        offsetY: -10,
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    },
    series: this.props.series?this.props.series:[],
  };

  componentDidMount() {
    console.log("last portion data",this.props.data)
  }

  componentDidUpdate(previousProps) {}

  render() {
    return (
      <>
       <div class="rd_crmspecdispecial">
                <div class="rd_flexthing">
                    <div class="rd_flexthingitem2">
                        <div class="rd_contentchart1thign">
                            <h3><strong>Sales Per Booking</strong></h3>
                            <p>
                                <span class="rd_purpledot">

                                </span>
                                Hair Cut
                            </p>
                            <p>
                                <span class="rd_ocbluedot">

                                </span>
                                Hair Style
                            </p>
                        </div>
                    </div>
                    <div class="rd_flexthingitem3">
                    <Chart
              options={this.state.options}
              series={this.state.series}
              type="bar"
              height={350}
            />
                    </div>
                </div>
            </div>
         
      </>
    );
  }
}

export default SalesPerBookingType;
