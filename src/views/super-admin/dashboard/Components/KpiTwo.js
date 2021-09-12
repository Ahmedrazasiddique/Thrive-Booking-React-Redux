import React from "react";
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap";
import Chart from "react-apexcharts";

class KpiTwo extends React.Component {

  componentDidMount() {

    //const {getDashboardKpis} = this.props;
   // getDashboardKpis(0);
console.log("data",this.props.data);

  }


  state = {
    options: {
      chart: {
        id: "barChart",
      },
      xaxis: {
       // type: "datetime",
        categories: this.props.data?this.props.data.xAxis:[],
      },
      stroke: {
        curve: "smooth",
      },
      dataLabels: {
        enabled: false,
      },
      title: {
        text: "Net Churnn Rate",
        align: "left",
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
    series: this.props.data?this.props.data.series:[],
  };

  render() {
    return (
      
          <Chart
            options={this.state.options}
            series={this.state.series}
            type="bar"
            height={200}
          />
       
    );
  }
}
export default KpiTwo;
