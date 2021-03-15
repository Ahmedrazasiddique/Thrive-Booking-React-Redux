import React from "react"
import {
  Card,
  CardBody,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from "reactstrap"
import classnames from "classnames"
import { User, Info, Share } from "react-feather"
import "../../../../../frontend/src/assets/scss/pages/users.scss"
import AdminTemplates from "./EmailTemplates/AdminTemplates";
import ClientTemplates from "./EmailTemplates/ClientTemplates";
import StaffTemplates from "./EmailTemplates/StaffTemplates";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getEmailTemplateData,updateEmailTemplateData } from "../../../actions/emailTemplateAction";
import Loader  from "../../../../src/components/Loader/Loader"
import { ToastContainer, toast } from "react-toastify";

class EmailTemplate extends React.Component {
  
  
  constructor(props)
  {
    super(props)
  }

  componentDidMount()
  {
   
    this.setState({isShowLoader:true});
    const {getEmailTemplateData}=this.props;
    getEmailTemplateData(1);
  }

  componentDidUpdate(prevProps,prevSate)
  {
    if(this.props!=prevProps)
    {
      if(this.props.EmailTemplateSuccess){
     console.log( "Email Template Object",this.props.emailTemplateObject)
     this.setState({clientTemplates:this.props.emailTemplateObject.clientTemplates});
     this.setState({adminTemplates:this.props.emailTemplateObject.adminTemplates})
     this.setState({staffTemplates:this.props.emailTemplateObject.staffTemplates})
     this.setState({isShowLoader:false});
      }
      if(this.props.IsDataSubmitedSuccessfully){
        toast.success("Update Successfully");
        this.setState({isShowLoader:false});
      }
     // this.setState({})
    }
  }

  state = {
    activeTab: "1",
    clientTemplates : [
      ],
      adminTemplates : [
       ],
        staffTemplates : [
         ],
         isShowLoader:false
  }

  toggle = tab => {
    this.setState({
      activeTab: tab
    })
  }
  render() {
    return (
      <Row>
  <Loader isShowLoader={this.state.isShowLoader }></Loader>
        <Col sm="12">
          <Card>
            <CardBody className="pt-2">
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === "1"
                    })}
                    onClick={() => {
                      this.toggle("1")
                    }}
                  >
                    <User size={16} />
                    <span className="align-middle ml-50">Client Templates</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === "2"
                    })}
                    onClick={() => {
                      this.toggle("2")
                    }}
                  >
                    <Info size={16} />
                    <span className="align-middle ml-50">Admin Templates</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === "3"
                    })}
                    onClick={() => {
                      this.toggle("3")
                    }}
                  >
                    <Share size={16} />
                    <span className="align-middle ml-50">Staff Templates</span>
                  </NavLink>
                </NavItem>
              </Nav>
              
              <TabContent activeTab={this.state.activeTab}>
            
               <TabPane tabId="1">
               { this.state.adminTemplates.map((clientEmailTemplateData, index) => (
                  <div>
               <ClientTemplates ClientEmailTemplateData={clientEmailTemplateData}/>
               </div>
               ))}
                </TabPane>
                <TabPane tabId="2">
                { this.state.clientTemplates.map((adminEmailTemplateData, index) => (
                  <div>
               <AdminTemplates adminEmailTemplateData={adminEmailTemplateData}/>
               </div>
               ))}
               
                
                </TabPane>
                <TabPane tabId="3">
                { this.state.staffTemplates.map((staffEmailTemplateData, index) => (
                  <div>
               <StaffTemplates StaffEmailTemplateData={staffEmailTemplateData}/>
               </div>
               ))}
                </TabPane>
                <ToastContainer />
              </TabContent>
            </CardBody>
          </Card>
        </Col>
      </Row>
    )
  }
}
const mapStateToProps = (state) => {
 
  return {
    EmailTemplateData: state.emailTemplate.data,
    EmailTemplateSuccess:state.emailTemplate.EmailTemplateSuccess,
    IsDataSubmitedSuccessfully:state.emailTemplate.IsDataSubmitedSuccessfully,
    IsError:state.emailTemplate.IsError,
    emailTemplateObject:state.emailTemplate.emailTemplateObject
  };
};

const actionMethods = {
  getEmailTemplateData: getEmailTemplateData,
  updateEmailTemplateData:updateEmailTemplateData
};

export default connect(mapStateToProps, actionMethods)(EmailTemplate);

