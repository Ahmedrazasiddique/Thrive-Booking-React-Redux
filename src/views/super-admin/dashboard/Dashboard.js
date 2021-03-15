import React from "react";
import { Col } from "reactstrap";
import KpiOne from "./Components/KpiOne";
import KpiTwo from "./Components/KpiTwo";
import KpiThree from "./Components/KpiThree";
import KpiFour from "./Components/KpiFour";
import KpiFive from "./Components/KpiFive";
import Subscriber from "./Components/Subscriber";
import SubscriberActionFeed from "./Components/SubscriberActionFeed";

import "swiper/css/swiper.css";
import "../../../assets/scss/plugins/extensions/swiper.scss";
let $primary = "#7367F0",
  $danger = "#EA5455",
  $warning = "#FF9F43",
  $primary_light = "#9c8cfc",
  $warning_light = "#FFC085",
  $danger_light = "#f29292";

class Dashboard extends React.Component {
  state = {};

  componentDidMount() {}

  componentDidUpdate(previousProps) {}

  render() {
    return (
      <>
        <div class="row">
          <Col md="4">
            <Subscriber
              primary={$primary}
              warning={$warning}
              danger={$danger}
              primaryLight={$primary_light}
              warningLight={$warning_light}
              dangerLight={$danger_light}
            ></Subscriber>
          </Col>
          <Col md="8">
            <div class="row">
              <Col md="6">
                <KpiOne></KpiOne>
              </Col>
              <Col md="6">
                <SubscriberActionFeed></SubscriberActionFeed>
              </Col>
            </div>
            <div class="row">
              <Col md="6">
                <KpiTwo></KpiTwo>
              </Col>
              <Col md="6">
                <KpiThree></KpiThree>
              </Col>
            </div>
            <div class="row">
              <Col md="6">
                <KpiFour></KpiFour>
              </Col>
              <Col md="6">
                <KpiFive></KpiFive>
              </Col>
            </div>
          </Col>
        </div>
      </>
    );
  }
}

export default Dashboard;
