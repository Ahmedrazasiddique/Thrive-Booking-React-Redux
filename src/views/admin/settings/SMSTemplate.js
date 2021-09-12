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
import { User, Info } from "react-feather";
import "../../../../../frontend/src/assets/scss/pages/users.scss";
import AdminSmsTemplate from "./SmsTemplates/AdminSmsTemplate";
import ClientSmsTemplate from "./SmsTemplates/ClientSmsTemplate";
import { connect } from "react-redux";
import {
  getSmsTemplateData,
  updateSmsTemplateData,
} from "../../../actions/smsTemplateAction";
import Loader from "../../../../src/components/Loader/Loader";
import { ToastContainer, toast } from "react-toastify";

class SMSTemplate extends React.Component {
  componentDidMount() {
    this.setState({ isShowLoader: true });
    const { getSmsTemplateData } = this.props;
    getSmsTemplateData(1);
  }

  componentDidUpdate(prevProps, prevSate) {
    if (this.props !== prevProps) {
      if (this.props.SmsTemplateSuccess) {
        console.log("Sms Template Object", this.props.SmsTemplateObject);
        this.setState({
          clientTemplates: this.props.SmsTemplateObject.clientTemplates,
        });
        this.setState({
          adminTemplates: this.props.SmsTemplateObject.adminTemplates,
        });
        this.setState({
          staffTemplates: this.props.SmsTemplateObject.staffTemplates,
        });
        this.setState({ isShowLoader: false });
        this.setState({ tags: this.props.tags });
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
                    }}> Client Sms Templates</button>
                    <button  className={classnames({
                      active: this.state.activeTab === "2"
                    })}
                    onClick={() => {
                      this.toggle("2")
                    }}> Admin Sms Templates</button>
                   
                  </div>

            </div>
          </div>

              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                  {this.state.clientTemplates.map(
                    (clientSmsTemplateData, index) => (
                      <div>
                        <ClientSmsTemplate
                          Tags={this.state.tags}
                          clientSmsTemplateData={clientSmsTemplateData}
                        />
                      </div>
                    )
                  )}
                </TabPane>
                <TabPane tabId="2">
                  {this.state.adminTemplates.map(
                    (adminSmsTemplateData, index) => (
                      <div>
                        <AdminSmsTemplate
                          Tags={this.state.tags}
                          adminSmsTemplateData={adminSmsTemplateData}
                        />
                      </div>
                    )
                  )}
                </TabPane>
              </TabContent>
              <ToastContainer />
              </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    SmsTemplateData: state.smsTemplate.data,
    SmsTemplateSuccess: state.smsTemplate.SmsTemplateSuccess,
    IsDataSubmitedSuccessfully: state.smsTemplate.IsDataSubmitedSuccessfully,
    IsError: state.smsTemplate.IsError,
    SmsTemplateObject: state.smsTemplate.smsTemplateObject,
    tags: state.smsTemplate.tags,
  };
};

const actionMethods = {
  getSmsTemplateData: getSmsTemplateData,
  updateSmsTemplateData: updateSmsTemplateData,
};

export default connect(mapStateToProps, actionMethods)(SMSTemplate);
