import React from "react"
import {Card,
  CardHeader,
  CardTitle,
  CardBody,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  ListGroup,
  ListGroupItem } from "reactstrap"
import { ArrowUp, ArrowDown,ChevronDown } from "react-feather"
import Chart from "react-apexcharts"



class SalesPerBookingType extends React.Component {

  state = {
    options: {
      colors: this.props.themeColors,
      plotOptions: {
        bar: {
          horizontal: false,
          endingShape: "rounded",
          columnWidth: "55%"
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      legend: {
        offsetY: -10
      },
      xaxis: {
        categories: [
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct"
        ]
      },
      yaxis: {
        title: {
          text: "$ (thousands)"
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return "$ " + val + " thousands"
          }
        }
      }
    },
    series: [
      {
        name: "Hair Cut",
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
      },
      {
        name: "Hair Style",
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
      },
     
    ]
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
    return (<><Card>
      <CardHeader>
        <CardTitle>Sales Per Booking</CardTitle>
        <UncontrolledDropdown>
          <DropdownToggle tag="small" className="text-bold-500 cursor-pointer">
            Day <ChevronDown size={10} />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem>Weekly</DropdownItem>
            <DropdownItem>Monthly</DropdownItem>
           
          </DropdownMenu>
        </UncontrolledDropdown>
      </CardHeader>
      <CardBody>
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="bar"
          height={350}
        />
      </CardBody>
    </Card></>)
}
}


export default SalesPerBookingType
