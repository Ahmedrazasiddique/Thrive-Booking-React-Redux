import React from "react";
import {
  Card,
  CardBody,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";
import { User, Info, Share } from "react-feather";
import "../../../../../frontend/src/assets/scss/pages/users.scss";
import AdminTemplates from "./EmailTemplates/AdminTemplates";
import ClientTemplates from "./EmailTemplates/ClientTemplates";
import StaffTemplates from "./EmailTemplates/StaffTemplates";
import { connect } from "react-redux";
import {
  getEmailTemplateData,
  updateEmailTemplateData,
} from "../../../actions/emailTemplateAction";
import Loader from "../../../../src/components/Loader/Loader";
import { ToastContainer, toast } from "react-toastify";

class EmailTemplate extends React.Component {
  componentDidMount() {
    this.setState({ isShowLoader: true });
    const { getEmailTemplateData } = this.props;
    getEmailTemplateData(1);
  }

  componentDidUpdate(prevProps, prevSate) {
    if (this.props !== prevProps) {
      if (this.props.EmailTemplateSuccess) {
        console.log("Email Template Object", this.props.emailTemplateObject);
        this.setState({
          clientTemplates: this.props.emailTemplateObject.clientTemplates,
        });
        this.setState({
          adminTemplates: this.props.emailTemplateObject.adminTemplates,
        });
        this.setState({
          staffTemplates: this.props.emailTemplateObject.staffTemplates,
        });
        this.setState({ tags: this.props.tags });
        this.setState({ isShowLoader: false });
      }
      if (this.props.IsDataSubmitedSuccessfully) {
        toast.success("Update Successfully");
        this.setState({ isShowLoader: false });
      }
      // this.setState({})
    }
  }

  state = {
    activeTab: "1",
    clientTemplates: [],
    adminTemplates: [],
    staffTemplates: [],
    isShowLoader: false,
  };

  toggle = (tab) => {
    this.setState({
      activeTab: tab,
    });
  };
  render() {
    return (
      <div class="eventdetailsaddbox rd_noshadow">
      <div class="boxheader rd_floatingheaderthig">
        <div class="rd_inputselectheader">
            <div class="rd_selectheaderrdt2 rd_selectheaderrdt2profile">
        <Loader isShowLoader={this.state.isShowLoader}></Loader>
       
                    <button  className={classnames({
                      active: this.state.activeTab === "1"
                    })}
                    onClick={() => {
                      this.toggle("1")
                    }}>Client Templates</button>
                    <button  className={classnames({
                      active: this.state.activeTab === "2"
                    })}
                    onClick={() => {
                      this.toggle("2")
                    }}>Admin Templates</button>
                    <button  className={classnames({
                      active: this.state.activeTab === "3"
                    })}
                    onClick={() => {
                      this.toggle("3")
                    }}>Staff Templates</button>
                  </div>

            </div>
          </div>

              <TabContent activeTab={this.state.activeTab}>
                
                <TabPane tabId="1">
                  
          <div class="rd_vacationfilterpart rd_vacationfilterpart3">
          <div class="rd_remplate_part">
                  {this.state.adminTemplates.map(
                    (clientEmailTemplateData, index) => (
                      
                  
                        <ClientTemplates
                          Tags={this.state.tags}
                          ClientEmailTemplateData={clientEmailTemplateData}
                        />
                     
                      
                    )
                  )}
                   </div>
                   </div>
                </TabPane>
                <TabPane tabId="2">
                <div class="rd_vacationfilterpart rd_vacationfilterpart3">
                <div class="rd_remplate_part">
                  {this.state.clientTemplates.map(
                    (adminEmailTemplateData, index) => (
                      <div>
                        <AdminTemplates
                          Tags={this.state.tags}
                          adminEmailTemplateData={adminEmailTemplateData}
                        />
                      </div>
                    )
                  )}
                  </div>
                  </div>
                </TabPane>
                <TabPane tabId="3">
                <div class="rd_vacationfilterpart rd_vacationfilterpart3">
                <div class="rd_remplate_part">
                  {this.state.staffTemplates.map(
                    (staffEmailTemplateData, index) => (
                      <div>
                        <StaffTemplates
                          Tags={this.state.tags}
                          StaffEmailTemplateData={staffEmailTemplateData}
                        />
                      </div>
                    )
                  )}
                  </div>
                  </div>
                </TabPane>
                <ToastContainer />
              </TabContent>
           </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    EmailTemplateData: state.emailTemplate.data,
    EmailTemplateSuccess: state.emailTemplate.EmailTemplateSuccess,
    IsDataSubmitedSuccessfully: state.emailTemplate.IsDataSubmitedSuccessfully,
    IsError: state.emailTemplate.IsError,
    emailTemplateObject: state.emailTemplate.emailTemplateObject,
    tags: state.emailTemplate.tags,
  };
};

const actionMethods = {
  getEmailTemplateData: getEmailTemplateData,
  updateEmailTemplateData: updateEmailTemplateData,
};

export default connect(mapStateToProps, actionMethods)(EmailTemplate);
