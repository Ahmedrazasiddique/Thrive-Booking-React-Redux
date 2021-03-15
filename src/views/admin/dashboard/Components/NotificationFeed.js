import React from "react";
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap";

class NotificationFeed extends React.Component {
  state = {};

  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  componentDidUpdate(previousProps) {}

  render() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Notification Feeds</CardTitle>
        </CardHeader>
        <CardBody>
          <row class="row"></row>
        </CardBody>
      </Card>
    );
  }
}

export default NotificationFeed;
