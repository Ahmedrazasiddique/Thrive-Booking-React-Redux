import React from "react"
import { Card, CardHeader, CardTitle, CardBody, Progress,Col } from "reactstrap"
import { ArrowUp, ArrowDown } from "react-feather"

class TotalBookingForToday extends React.Component {

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
    return (<><Card>
      <CardHeader>
        <CardTitle>Total Bookings</CardTitle>
      </CardHeader>
      <CardBody>
      
         
      <row class="row">

<Col Md="4"><div class="stats-card-body d-flex justify-content-center flex-column text-center pb-2 pt-2 card-body">
  <div class="icon-section">
    <div class="avatar avatar-stats p-50 m-0 bg-rgba-danger">
      <div class="avatar-content">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="danger">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg></div></div></div><div class="title-section"><h2 class="text-bold-600 mt-1 mb-25">26.7k</h2>
          <p class="mb-0">Favourited</p>
          </div>
          </div>
          </Col>
          </row>
      </CardBody>
    </Card></>)
}
}


export default TotalBookingForToday
