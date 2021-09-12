import React from "react";
import { Col } from "reactstrap";
import KpiOne from "./Components/KpiOne";
import KpiTwo from "./Components/KpiTwo";
import KpiThree from "./Components/KpiThree";
import KpiFour from "./Components/KpiFour";
import KpiFive from "./Components/KpiFive";
import Subscriber from "./Components/Subscriber";
import SubscriberActionFeed from "./Components/SubscriberActionFeed";
import { connect } from "react-redux";
import {
  getDashboardKpis,
  getDashboardSubcriberFeeds,
  getDashboardPieChart
} from "../../../actions/superAdminDashboard";
import Loader from "../../../components/Loader/Loader";

import "swiper/css/swiper.css";
import "../../../assets/scss/plugins/extensions/swiper.scss";
let $primary = "#45c48a",
  $danger = "#ffb863",
  $warning = "#255a77",
  $primary_light = "#9c8cfc",
  $warning_light = "#FFC085",
  $danger_light = "#f29292";

class Dashboard extends React.Component {
  state = {

    Kpis:{},
    PieChart:{},
    FeedData:{}

  };

  componentDidMount() {

    const {getDashboardKpis,getDashboardPieChart,getDashboardSubcriberFeeds} = this.props;
    getDashboardKpis(0);
    getDashboardPieChart(0);
    getDashboardSubcriberFeeds(0);

  }

  componentDidUpdate(previousProps) {

    if (previousProps !== this.props) {
      if (this.props.KpisSuccess) {
        
        this.setState({Kpis:this.props.kpis.data})

      }
      if(this.props.PieChartSuccess)
      {
        
        this.setState({PieChart:this.props.pieChart})
      }
      if(this.props.FeedsSuccess)
      {
        
        this.setState({FeedData:this.props.subcriberFeeds})
      }

    }

  }

  render() {
    return (
      <>
        <div class="eventdetailsaddbox rd_noshadow rd_noboxheader">
          <Loader isShowLoader={this.props.showLoader}></Loader>
            <div class="rd_dashboardthingcont">
                <div class="rd_dashboardthingcontitem1">
                    <div class="rd_chartcontthing">
                        <div class="rd_subscdahssupecont">
                            <h4>Subcribers</h4>

                            <button>Summary</button>
                        </div>
                        {this.props.PieChartSuccess?
                        <Subscriber data={this.props.pieChart.data}
              primary={$primary}
              warning={$warning}
              danger={$danger}
              primaryLight={$primary_light}
              warningLight={$warning_light}
              dangerLight={$danger_light}
            ></Subscriber>
          :<></>}
                        </div>
                        </div>
                        <div class="rd_dashboardthingcontitem2">
                    <div class="rd_flexthingther">

                        <div class="rd_dashboardthingcontitem3">
                            <p>Kpi One</p>
                       {     this.props.KpisSuccess?
                <KpiOne data={this.props.kpis.data.net_mrr}></KpiOne>
                :<></>
                       }
                        </div>
                        <div class="rd_dashboardthingcontitem3">
                           {
                             this.props.FeedsSuccess?
                <SubscriberActionFeed data={this.props.subcriberFeeds.data.data}></SubscriberActionFeed>
                           :<></>}
                        </div>
                        <div class="rd_dashboardthingcontitem3">
                            <p>Kpi Two</p>
                            {     this.props.KpisSuccess? 
                <KpiTwo data={this.props.kpis.data.net_churn_rate}></KpiTwo>
                :<></>
              }
                        </div>
                        <div class="rd_dashboardthingcontitem3">
                            <p>Kpi Three</p>
                            {     this.props.KpisSuccess? 
                <KpiThree data={this.props.kpis.data.net_mrr_growth_rate}></KpiThree>
                :<></>
              }
                        </div>
                        <div class="rd_dashboardthingcontitem3">
                            <p>Kpi Four</p>
                            {     this.props.KpisSuccess? 
                <KpiFour data={this.props.kpis.data.velocity_rate}></KpiFour>
                :<></>
              }
                        </div>
                        <div class="rd_dashboardthingcontitem3">
                            <p>Kpi Five</p>
                            {     this.props.KpisSuccess? 
                <KpiFive data={this.props.kpis.data.gross_churn_rate}></KpiFive>
                :<></>
              }
                        </div>
                    </div>
                </div>
         
        </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    kpis: state.superadmindashboard.kpis,
    subcriberFeeds: state.superadmindashboard.subcriberFeeds,
    pieChart: state.superadmindashboard.pieChart,

    KpisSuccess: state.superadmindashboard.KpisSuccess,
    FeedsSuccess: state.superadmindashboard.FeedsSuccess,
    PieChartSuccess: state.superadmindashboard.PieChartSuccess,
    IsError: state.superadmindashboard.IsError,
    showLoader: state.superadmindashboard.showLoader,
  };
};

const actionMethods = {
  getDashboardKpis:getDashboardKpis,
  getDashboardSubcriberFeeds:getDashboardSubcriberFeeds,
  getDashboardPieChart:getDashboardPieChart

};

export default connect(mapStateToProps, actionMethods)(Dashboard);