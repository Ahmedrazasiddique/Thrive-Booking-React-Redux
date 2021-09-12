import React from "react";
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap";
import { ListGroup } from "reactstrap";
import "react-perfect-scrollbar/dist/css/styles.css";
import ScrollBar from "react-perfect-scrollbar";
import "./DashboardCss/dashboard.scss";
class SubscriberActionFeed extends React.Component {
  state = {};

  componentDidMount() {

    console.log("feeds",this.props.subcriberFeeds)
  }

  componentDidUpdate(previousProps) {}

  render() {
    return (
      <>
                            <div class="rd_specialflexthgndahs">
                                <p>Subscriber action feed</p>
                                <button>filter by</button>
                            </div>
                            <div class="rd_notficationcontthing">
                              {this.props.data?this.props.data.map((obj,index)=>(
                                <a href="#" class="rd_notifcitemcont">
                                    {obj}
                                </a>
                              )):[]}
                            </div>
                      
      </>
    );
  }
}

export default SubscriberActionFeed;
