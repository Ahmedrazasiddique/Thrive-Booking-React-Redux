import React from "react";
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap";
import { ListGroup } from "reactstrap";
import "react-perfect-scrollbar/dist/css/styles.css";
import ScrollBar from "react-perfect-scrollbar";
import "./DashboardCss/dashboard.scss";
class SubscriberActionFeed extends React.Component {
  state = {};

  componentDidMount() {}

  componentDidUpdate(previousProps) {}

  render() {
    return (
      <>
        <Card className="TopPortionSuperAdmin">
          <CardHeader>
            <CardTitle>Subscriber Action Feed</CardTitle>
          </CardHeader>

          <ScrollBar>
            <CardBody>
              <ListGroup></ListGroup>
            </CardBody>
          </ScrollBar>
        </Card>
      </>
    );
  }
}

export default SubscriberActionFeed;
