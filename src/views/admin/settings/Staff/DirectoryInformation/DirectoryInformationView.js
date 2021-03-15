import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Media,
  Row,
  Col,
  Button,
  Table,
} from "reactstrap";
import { Edit, Trash, Lock, Check } from "react-feather";
import { Link } from "react-router-dom";
import Checkbox from "../../../../../../src/components/Checkbox/CheckboxesVuexy";
import "../../../../../../src/assets/scss/pages/users.scss";
import { connect } from "react-redux";
import {
  getSingleUserByIDDirectoryInformation,
} from "../../../../../actions/directoryInformationAction";
import { baseURLImages } from "../../../../../Helper";
import Loader from "../../../../../../src/components/Loader/Loader";

class DirectoryInformationView extends React.Component {

  constructor(props)
  {
    super(props);
    
  }
  state={
    rowData:{}
  }
  componentDidMount() {
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

  render() {
    return (
   
      <React.Fragment>
          <Loader isShowLoader={this.state.isShowLoader}></Loader>
           {this.props.route.match.params.id&&this.props.DirectoryInformationSuccess?
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
              </CardHeader>
              <CardBody>
                <Row className="mx-0" col="12">
                  <Col className="pl-0" sm="12">
                    <Media className="d-sm-flex d-block">
                      <Media className="mt-md-1 mt-0" left>
                        <Media
                          className="rounded mr-2"
                          object
                          src={baseURLImages+this.state.rowData.profile_image}
                          alt="Generic placeholder image"
                          height="112"
                          width="112"
                        />
                      </Media>
                      <Media body>
                        <Row>
                          <Col sm="9" md="6" lg="5">
                            <div className="users-page-view-table">
                              <div className="d-flex user-info">
                                <div className="user-info-title font-weight-bold">
                                  Username
                                </div>
                                <div>{(this.state.rowData.first_name+' '+this.state.rowData.last_name)||''}</div>
                              </div>
                              <div className="d-flex user-info">
                                <div className="user-info-title font-weight-bold">
                                  Name
                                </div>
                                <div>{this.state.rowData.first_name}</div>
                              </div>
                              <div className="d-flex user-info">
                                <div className="user-info-title font-weight-bold">
                                  Email
                                </div>
                                <div className="text-truncate">
                                  <span>{this.state.rowData.email}</span>
                                </div>
                              </div>
                            </div>
                          </Col>
                          <Col md="12" lg="5">
                            <div className="users-page-view-table">
                              <div className="d-flex user-info">
                                <div className="user-info-title font-weight-bold">
                                  Status
                                </div>
                                <div>{this.state.rowData.status=='E'?'Active':'InActive'}</div>
                              </div>
                              <div className="d-flex user-info">
                                <div className="user-info-title font-weight-bold">
                                  Role
                                </div>
                                <div>admin</div>
                              </div>
                              <div className="d-flex user-info">
                                <div className="user-info-title font-weight-bold">
                                  Company
                                </div>
                                <div>
                                  <span>North Star Aviation Pvt Ltd</span>
                                </div>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </Media>
                    </Media>
                  </Col>
                  <Col className="mt-1 pl-0" sm="12">
                    <Button.Ripple className="mr-1" color="primary" outline>
                      <Link to={"/admin/settings/staff/directory-information/edit/"+this.props.route.match.params.id}>
                        <Edit size={15} />
                        <span className="align-middle ml-50">Edit</span>
                      </Link>
                    </Button.Ripple>
                    <Button.Ripple color="danger" outline>
                      <Trash size={15} />
                      <span className="align-middle ml-50">Delete</span>
                    </Button.Ripple>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col sm="12" md="6">
            <Card>
              <CardHeader>
                <CardTitle>Information</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="users-page-view-table">
                  <div className="d-flex user-info">
                    <div className="user-info-title font-weight-bold">
                      Birth Date
                    </div>
                    <div> {this.state.rowData.date_of_birth}</div>
                  </div>
                  <div className="d-flex user-info">
                    <div className="user-info-title font-weight-bold">
                      Mobile
                    </div>
                    <div>{this.state.rowData.phone}</div>
                  </div>
                  <div className="d-flex user-info">
                    <div className="user-info-title font-weight-bold">
                      Website
                    </div>
                    <div className="text-truncate">
                      <span>{this.state.rowData.website}</span>
                    </div>
                  </div>
                  <div className="d-flex user-info">
                    <div className="user-info-title font-weight-bold">
                      Languages
                    </div>
                    <div className="text-truncate">
                      <span>English, French</span>
                    </div>
                  </div>
                  <div className="d-flex user-info">
                    <div className="user-info-title font-weight-bold">
                      Gender
                    </div>
                    <div className="text-truncate">
                      <span>Female</span>
                    </div>
                  </div>
                  <div className="d-flex user-info">
                    <div className="user-info-title font-weight-bold">
                      Contact
                    </div>
                    <div className="text-truncate">
                      <span>email, message, phone</span>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col sm="12" md="6">
            <Card>
              <CardHeader>
                <CardTitle>Social Links</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="users-page-view-table">
                  <div className="d-flex user-info">
                    <div className="user-info-title font-weight-bold">
                      Twitter
                    </div>
                    <div className="text-truncate">
                      <span>{this.state.rowData.twitter_page_url}</span>
                    </div>
                  </div>
                  <div className="d-flex user-info">
                    <div className="user-info-title font-weight-bold">
                      Facebook
                    </div>
                    <div className="text-truncate">
                      <span>{this.state.rowData.facebook_page_url}</span>
                    </div>
                  </div>
                  <div className="d-flex user-info">
                    <div className="user-info-title font-weight-bold">
                      Instagram
                    </div>
                    <div className="text-truncate">
                      <span>{this.state.rowData.instagram_page_url}</span>
                    </div>
                  </div>
                  <div className="d-flex user-info">
                    <div className="user-info-title font-weight-bold">
                      Github
                    </div>
                    <div className="text-truncate">
                      <span>{this.state.rowData.github_page_url}</span>
                    </div>
                  </div>
                  <div className="d-flex user-info">
                    <div className="user-info-title font-weight-bold">
                      CodePen
                    </div>
                    <div className="text-truncate">
                      <span>{this.state.rowData.codepin_page_url}</span>
                    </div>
                  </div>
                  <div className="d-flex user-info">
                    <div className="user-info-title font-weight-bold">
                      Slack
                    </div>
                    <div className="text-truncate">
                      <span>{this.state.rowData.slack_page_url}</span>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col sm="12">
            <Card>
              <CardHeader className="border-bottom pb-1 mx-2 px-0">
                <CardTitle>
                  <Lock size={18} />
                  <span className="align-middle ml-50">Event Permissions</span>
                </CardTitle>
              </CardHeader>
              <CardBody>
                {" "}
                <Table className="permissions-table" borderless responsive>
                  <thead>
                    <tr>
                      <th>Module</th>
                      <th>Read</th>
                      <th>Write</th>
                      <th>Create</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Users</td>
                      <td>
                        <Checkbox
                          disabled
                          color="primary"
                          icon={<Check className="vx-icon" size={16} />}
                          label=""
                          defaultChecked={true}
                        />
                      </td>
                      <td>
                        <Checkbox
                          disabled
                          color="primary"
                          icon={<Check className="vx-icon" size={16} />}
                          label=""
                          defaultChecked={false}
                        />
                      </td>
                      <td>
                        <Checkbox
                          disabled
                          color="primary"
                          icon={<Check className="vx-icon" size={16} />}
                          label=""
                          defaultChecked={false}
                        />
                      </td>
                      <td>
                        {" "}
                        <Checkbox
                          disabled
                          color="primary"
                          icon={<Check className="vx-icon" size={16} />}
                          label=""
                          defaultChecked={true}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Articles</td>
                      <td>
                        <Checkbox
                          disabled
                          color="primary"
                          icon={<Check className="vx-icon" size={16} />}
                          label=""
                          defaultChecked={false}
                        />
                      </td>
                      <td>
                        <Checkbox
                          disabled
                          color="primary"
                          icon={<Check className="vx-icon" size={16} />}
                          label=""
                          defaultChecked={true}
                        />
                      </td>
                      <td>
                        <Checkbox
                          disabled
                          color="primary"
                          icon={<Check className="vx-icon" size={16} />}
                          label=""
                          defaultChecked={false}
                        />
                      </td>
                      <td>
                        {" "}
                        <Checkbox
                          disabled
                          color="primary"
                          icon={<Check className="vx-icon" size={16} />}
                          label=""
                          defaultChecked={true}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Staff</td>
                      <td>
                        <Checkbox
                          disabled
                          color="primary"
                          icon={<Check className="vx-icon" size={16} />}
                          label=""
                          defaultChecked={true}
                        />
                      </td>
                      <td>
                        <Checkbox
                          disabled
                          color="primary"
                          icon={<Check className="vx-icon" size={16} />}
                          label=""
                          defaultChecked={true}
                        />
                      </td>
                      <td>
                        <Checkbox
                          disabled
                          color="primary"
                          icon={<Check className="vx-icon" size={16} />}
                          label=""
                          defaultChecked={false}
                        />
                      </td>
                      <td>
                        {" "}
                        <Checkbox
                          disabled
                          color="primary"
                          icon={<Check className="vx-icon" size={16} />}
                          label=""
                          defaultChecked={false}
                        />
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      :<></>}
        </React.Fragment>
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

export default connect(mapStateToProps, actionMethods)(DirectoryInformationView);
