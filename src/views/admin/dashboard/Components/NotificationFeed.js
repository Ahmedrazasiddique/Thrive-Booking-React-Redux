import React from "react"
import { Card, CardHeader, CardTitle, CardBody, Progress ,Col} from "reactstrap"
import { ArrowUp, ArrowDown } from "react-feather"
import PerfectScrollbar from "react-perfect-scrollbar"
class NotificationFeed extends React.Component {

state = {
    
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
    return (<Card>
        <CardHeader>
          <CardTitle>Notification Feeds</CardTitle>
        </CardHeader>
        <CardBody>
     
       <row class="row"></row>
        </CardBody>
      </Card>)
}
}


export default NotificationFeed
