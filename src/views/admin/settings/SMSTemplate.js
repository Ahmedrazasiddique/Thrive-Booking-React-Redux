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
//import "../../../../../frontend/src/assets/scss/pages/users.scss";
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
      <Row>
        <Loader isShowLoader={this.state.isShowLoader}></Loader>
        <Col sm="12">
          <Card>
            <CardBody className="pt-2">
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === "1",
                    })}
                    onClick={() => {
                      this.toggle("1");
                    }}
                  >
                    <User size={16} />
                    <span className="align-middle ml-50">
                      Client Sms Templates
                    </span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === "2",
                    })}
                    onClick={() => {
                      this.toggle("2");
                    }}
                  >
                    <Info size={16} />
                    <span className="align-middle ml-50">
                      Admin Sms Templates
                    </span>
                  </NavLink>
                </NavItem>
              </Nav>

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
            </CardBody>
          </Card>
        </Col>
      </Row>
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
