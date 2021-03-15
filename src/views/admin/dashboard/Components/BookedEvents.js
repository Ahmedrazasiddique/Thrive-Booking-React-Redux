import React from "react"
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
  ListGroupItem
} from "reactstrap"
import { ChevronDown } from "react-feather"
import Chart from "react-apexcharts"
import "../../../../assets/scss/pages/card-analytics.scss"
class BookedEvents extends React.Component {

  state = {
    options: {
      chart: {
        dropShadow: {
          enabled: false,
          blur: 5,
          left: 1,
          top: 1,
          opacity: 0.2
        },
        toolbar: {
          show: false
        }
      },
      colors: [this.props.primary, this.props.warning, this.props.danger],
      fill: {
        type: "gradient",
        gradient: {
          gradientToColors: [
            this.props.primaryLight,
            this.props.warningLight,
            this.props.dangerLight
          ]
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: { show: false },
      stroke: {
        width: 5
      },
      labels: ["Free Consultation", "Group Consultation"]
    },
    series: [690, 258]
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
    return (<> <Card>
      <CardHeader>
        <CardTitle>Booked Events</CardTitle>
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
      <CardBody className="pt-0">
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="pie"
          height={290}          />
      </CardBody>
      <ListGroup flush>
        <ListGroupItem className="d-flex justify-content-between">
          <div className="item-info">
            <div
              className="bg-primary"
              style={{
                height: "10px",
                width: "10px",
                borderRadius: "50%",
                display: "inline-block",
                margin: "0 5px"
              }}
            />
            <span className="text-bold-600">Free Consultation </span>
          </div>
          <div className="product-result">
            <span>690</span>
          </div>
        </ListGroupItem>
        <ListGroupItem className="d-flex justify-content-between">
          <div className="item-info">
            <div
              className="bg-warning"
              style={{
                height: "10px",
                width: "10px",
                borderRadius: "50%",
                display: "inline-block",
                margin: "0 5px"
              }}
            />
            <span className="text-bold-600">Group Consultation</span>
          </div>
          <div className="product-result">
            <span>258</span>
          </div>
        </ListGroupItem>
       
      </ListGroup>
    </Card></>)
}
}


export default BookedEvents