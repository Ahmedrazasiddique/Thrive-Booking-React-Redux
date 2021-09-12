
  import classnames from "classnames";
  import { connect } from "react-redux";
  import {
    getBookingHistory,
  } from "../../../actions/bookingHistoryAction";
  import Loader from "../../../components/Loader/Loader";
  import React, { useEffect, useState } from 'react';
import {
    getPlanData
} from "../../../actions/planManagerActions";
  
  
class PlanManager extends React.Component {

    state = {

        PlanManagerData:{}
    
      };

  componentDidMount() {

    const {getPlanData} = this.props;
    getPlanData(0);
    //getDashboardSubcriberFeeds(0);

  }

  componentDidUpdate(previousProps) {

    if (previousProps !== this.props) {
      if (this.props.PlanManagerSuccess) {
        
        this.setState({PlanManagerData:this.props.planManagerData})

      }
      

    }

  }

    render() {



        return (
        <div class="eventdetailsaddbox rd_noshadow">
            
          <Loader isShowLoader={this.props.showLoader}></Loader>
        <div class="rd_supertoptwocom">
            <div class="boxheader rd_floatingheaderthig">
                <div class="rd_inputselectheader">
                    <div class="rd_selectheaderrdt2 rd_selectheaderrdt2profile">
                        <h3>
                            <strong>
                                Plan Manager
                            </strong>
                        </h3>
                      </div>
    
                </div>
              </div>
        </div>





{this.props.PlanManagerSuccess?
      <div class="rd_plansmanagercont">

        <div class="rd_panmanagerthincon">
            <div class="rd_panmanagerthinconheader">
            individual
            </div>

            <div class="rd_panmanagerthincontablething rd_panmanagerthincontablething1">
                <div class="rd_panmanagerthincontablethingitem">
                    Plan
                </div>
                <div class="rd_panmanagerthincontablethingitem">
                    Monthly
                </div>
                <div class="rd_panmanagerthincontablethingitem">
                    Yearly
                </div>
            </div>
            {this.props.planManagerData?this.props.planManagerData.individual.map((obj, index) => (
            <div class="rd_panmanagerthincontablething rd_panmanagerthincontablething2">
                <div class="rd_panmanagerthincontablethingitem">
               { obj.plan}
                </div>
              
                <div class="rd_panmanagerthincontablethingitem">
                { obj.monthly+'$'}
                </div>
                <div class="rd_panmanagerthincontablethingitem">
                { obj.yearly+'$'}
                </div>
            </div>
            )):[]}
    
            <div class="rd_panmanagerthincontablething rd_panmanagerthincontablething1 rd_centred">
                <div class="rd_panmanagerthincontablethingitem">
                    Teams
                </div>
            </div>

            {this.props.planManagerData?this.props.planManagerData.teams.map((obj, index) => (
            <div class="rd_panmanagerthincontablething rd_panmanagerthincontablething2">
               <div class="rd_panmanagerthincontablethingitem">
               { obj.plan}
                </div>
              
                <div class="rd_panmanagerthincontablethingitem">
                { obj.monthly+'$'}
                </div>
                <div class="rd_panmanagerthincontablethingitem">
                { obj.yearly+'$'}
                </div>
            </div>
             )):[]}
            
           
        </div>
    </div>
    :<></>}

    </div>
    );
  }
}
  

  const mapStateToProps = (state) => {
    return {
      PlanManagerSuccess:state.planManager.PlanManagerSuccess,
      IsError: state.planManager.IsError,
      showLoader: state.planManager.showLoader,
      planManagerData:state.planManager.planManagerData
    };
  };
  
  const actionMethods = {
    getPlanData:getPlanData
  
  };
  
  export default connect(mapStateToProps, actionMethods)(PlanManager);