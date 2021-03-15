import React from "react";
import { Card, CardHeader, CardTitle, CardBody, FormGroup } from "reactstrap";
import Toggle from "react-toggle";
import ByMonthly from "./Schedule/ByMonthly/ByMonthly";
import ByWeekly from "./Schedule/ByWeekly";

class Schedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doesYourWeeklyScheduleChange: false,
    };
    this.handleSwitchChange = this.handleSwitchChange.bind(this);
  }

  handleSwitchChange() {
    this.setState({
      doesYourWeeklyScheduleChange: this.state.doesYourWeeklyScheduleChange
        ? false
        : true,
    });
  }

  componentDidMount() {}

  render() {
    return (
      <Card>
        <CardHeader>
          <FormGroup row>
            <CardTitle>Does your schedule change weekly</CardTitle>

            <label className="react-toggle-wrapper">
              <Toggle
                checked={this.state.doesYourWeeklyScheduleChange}
                onChange={this.handleSwitchChange}
                name={"doesYourWeeklyScheduleChange"}
                value="yes"
                defaultChecked={false}
              />
            </label>
          </FormGroup>
        </CardHeader>
        <hr />{" "}
        <CardBody>
          {this.state.doesYourWeeklyScheduleChange ? (
            <ByWeekly></ByWeekly>
          ) : (
            <ByMonthly></ByMonthly>
          )}
        </CardBody>
      </Card>
    );
  }
}

export default Schedule;
