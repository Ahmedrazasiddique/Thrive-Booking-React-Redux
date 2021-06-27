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
import AccountTab from "./Account";
import InfoTab from "./Information";
import SocialTab from "./Social";
//import "../../../../../../../src/assets/scss/pages/users.scss";
import { connect } from "react-redux";
import {
  getSingleUserByIDDirectoryInformation,
} from "../../../../../../actions/directoryInformationAction";
import Loader from "../../../../../../../src/components/Loader/Loader";

class DirectoryInformationEdit extends React.Component {
 
  state={
    rowData:{},
    activeTab: "1",
  }
  componentDidMount() {
    debugger
    console.log()
   // alert(new URLSearchParams(this.props.location.search).get("your_query_param_key"))
    const { getSingleUserByIDDirectoryInformation } = this.props;
    if(this.props.route.match.params.id){
      
    getSingleUserByIDDirectoryInformation(this.props.route.match.params.id);
    this.setState({ isShowLoader: true });
    }
  }

  componentDidUpdate(previousProp) {
    if (previousProp !== this.props) {
      if (this.props.DirectoryInformationSuccess) {
       this.setState({ isShowLoader: false });
       this.setState({ rowData: this.props.DInfoData.data });
      }
    }
  }

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
                    <span className="align-middle ml-50">Account</span>
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
                    <span className="align-middle ml-50">Information</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === "3",
                    })}
                    onClick={() => {
                      this.toggle("3");
                    }}
                  >
                    <Share size={16} />
                    <span className="align-middle ml-50">Social</span>
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                {this.state.activeTab=="1" ? <AccountTab UserID = {this.props.route.match.params.id}/>:<></>  }
                </TabPane>
                <TabPane tabId="2">
               {this.state.activeTab=="2" ?<InfoTab languages={this.props.languages}  countries={this.props.countries}
                UserID = {this.props.route.match.params.id} />:<></>  }
                </TabPane>
                <TabPane tabId="3">
                {this.state.activeTab=="3" ?   <SocialTab UserID = {this.props.route.match.params.id}  />:<></>  }
                </TabPane>
              </TabContent>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    DInfoData: state.directoryinformation.data,
    DirectoryInformationSuccess: state.directoryinformation.DirectoryInformationSuccess,
    countries:state.directoryinformation.countryDD,
    languages:state.directoryinformation.languageDD 
  };
};

const actionMethods = {
  getSingleUserByIDDirectoryInformation: getSingleUserByIDDirectoryInformation
};

export default connect(mapStateToProps, actionMethods)(DirectoryInformationEdit);