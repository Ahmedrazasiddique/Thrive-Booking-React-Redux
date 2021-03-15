import React from "react";
import {
  Media,
  Row,
  Col,
  Button,
  Form,
  Input,
  Label,
  FormGroup,
  Table,
} from "reactstrap";
//import userImg from "../../../../assets/img/portrait/small/avatar-s-18.jpg"
import Checkbox from "../../../../../../../src/components/Checkbox/CheckboxesVuexy";
import { Check, Lock } from "react-feather";
import { connect } from "react-redux";
import {
  updateDirectoryInformation,
  saveDirectoryInformation,
  getSingleUserByIDDirectoryInformation
} from "../../../../../../actions/directoryInformationAction";
import Loader from "../../../../../../../src/components/Loader/Loader";
import { baseURLImages } from "../../../../../../Helper";
import {
  getAdminBusinessId,
  getLoggedInUserId,
} from "../../../../../../utils/authHelper";
import { ToastContainer, toast } from "react-toastify";

class UserAccountTab extends React.Component {

  componentDidMount() {
   
    console.log()
   // alert(new URLSearchParams(this.props.location.search).get("your_query_param_key"))
    const { getSingleUserByIDDirectoryInformation } = this.props;
    if(this.props.UserID&&this.props.UserID>0){
    getSingleUserByIDDirectoryInformation(this.props.UserID);
    this.setState({ isShowLoader: true });
    }else
    {

    }
  }

state=
{   isShowLoader:false,
    userInfo:{},
    isEmailValid: true,
    employeeImageUrl: {},//this.props.Data.profile_image,
    isImageChangedEventCalled: false,
    selectedFile: {},
}

componentDidUpdate(previousProp) {
  if (previousProp !== this.props) {
    if (this.props.IsDataSubmitedSuccessfullyDirectoryInformation) {
      
      toast.success("Directory Information Updated Successfully");
     this.setState({ isShowLoader: false });
  //   window.location.replace('http://example.com/#');
    }
    if (this.props.DirectoryInformationSuccess) {
      this.setState({ isShowLoader: false });
      if(this.props.UserID&&this.props.UserID>0){
      this.setState({ userInfo: this.props.DInfoData.data });
      this.setState({ employeeImageUrl: this.props.DInfoData.data.profile_image });
      }
      else
      {
        this.setState({ userInfo: {} });
      }
     
     }
  }
}

handleSwitchChange = (e) => {
  this.setState({
    guestUserCheckOut: this.state.guestUserCheckOut ? false : true,
  });
};
handleInputChange = (e) => {
  let value = { [e.target.name]: e.target.value };
  value = {
    ...this.state.userInfo,
    ...value,
  };
  this.setState({
    userInfo: {
      // object that we want to update
      ...this.state.userInfo, // keep all other key-value pairs
      ...value, // update the value of specific key
    },
  });

  
  if (e.target.name === "email") {
    var email = e.target.value;
    const r = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    r.test(String(email).toLowerCase())
      ? this.setState({ isEmailValid: true })
      : this.setState({ isEmailValid: false });
  }
};

handleSubmit = (event) => {

  event.preventDefault();
  this.setState({ isShowLoader: true });
  if(!this.props.UserID>0){
  this.state.userInfo.country_id= this.state.userInfo.country.value
  delete this.state.userInfo.country
  delete this.state.userInfo.profile_image
  }
  this.state.userInfo.business_id=getAdminBusinessId()
  const formData = new FormData(event.target);
  formData.append("business_id", getAdminBusinessId());
  for (let [key, value] of Object.entries(this.state.userInfo)) {
  
    for (let [key1, value1] of formData.entries()) {
      if (key1 === key) {
        continue
      }
    }
  
    formData.append(key, value);
   
  }
console.log('Data',formData)
  this.props.updateDirectoryInformation(formData);
};

onSelectFile = (e) => {
  this.setState({ isImageChangedEventCalled: true });
  if (!e.target.files || e.target.files.length === 0) {
    this.setState({ selectedFile: undefined });
    return;
  }

  const objectUrl = URL.createObjectURL(e.target.files[0]);
  this.setState({ employeeImageUrl: objectUrl });
  // return () => URL.revokeObjectURL(objectUrl)
};

 
  
 
  render() {
    return (
      <Row>
          
       
        <Col sm="12">
        <Loader isShowLoader={this.state.isShowLoader}></Loader>
        <Form onSubmit={this.handleSubmit}>
              <Row>
              <Col md="6" sm="12">
                <FormGroup>
                  <Label for="username">User Name <span className="RequiredMark">*</span></Label>
                  <Input
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={this.handleInputChange}
                    value={this.state.userInfo.username||''}
                    required
                  />
                </FormGroup>
              </Col>
              <Col md="6" sm="12">
                <FormGroup>
                  <Label for="username">First Name <span className="RequiredMark">*</span></Label>
                  <Input
                    type="text"
                   
                    name="first_name"
                    placeholder="Username"
                    onChange={this.handleInputChange}
                    value={this.state.userInfo.first_name||''}
                    required
                  />
                </FormGroup>
              </Col>
              <Col md="6" sm="12">
                <FormGroup>
                  <Label for="name">Last name <span className="RequiredMark">*</span></Label>
                  <Input
                    type="text"
                   
                    name="last_name"
                    placeholder="Name"
                    onChange={this.handleInputChange}
                    required
                    value={this.state.userInfo.last_name||''}
                  />
                </FormGroup>
              </Col>
              <Col md="6" sm="12">
                <FormGroup>
                  <Label for="status">Status</Label>
                  <Input type="select"
                   value={this.state.userInfo.status||''}
                  onChange={this.handleInputChange} name="status" id="status">
                    <option value="E">Active</option>
                    <option value="D"> InActive</option>
                   
                  </Input>
                </FormGroup>
              </Col>

            
              {/*
              <Col md="6" sm="12">
                <FormGroup>
                  <Label for="role">Role</Label>
                  <Input type="select" name="role" id="role">
                    <option>User</option>
                    <option>Staff</option>
                  </Input>
                </FormGroup>
              </Col>
              */}
              <Col md="6" sm="12">
                <FormGroup>
                  <Label for="email">Email <span className="RequiredMark">*</span></Label>
                  <Input
                    type="text"
                  
                    name="email"
                    placeholder="Email"
                    onChange={this.handleInputChange}
                    required
                    value={this.state.userInfo.email||''}
                  />
                   {!this.state.isEmailValid ? (
                      <div className="field-error text-danger">
                        Invalid Email
                      </div>
                    ) : (
                      <></>
                    )}
                </FormGroup>
              </Col>
             
              <Col sm="6">
                  <FormGroup>
                    <h6 htmlFor="companyLogo">User Image</h6>

                    <Media>
                      <Media className="mr-1" left href="#">
                        <Media
                          className="rounded-circle"
                          object
                          src={
                            !this.state.isImageChangedEventCalled
                              ? baseURLImages + this.state.employeeImageUrl
                              : this.state.employeeImageUrl
                          }
                          alt="User Image"
                          height="64"
                          width="64"
                        />
                      </Media>
                      <Media className="mt-25" body>
                        <div className="d-flex flex-sm-row flex-column justify-content-start px-0">
                          <Button.Ripple
                            tag="label"
                            className="mr-50 cursor-pointer"
                            color="primary"
                            outline
                          >
                            Upload Photo
                            <input
                              type="file"
                              value={""}
                              onChange={this.onSelectFile}
                              name="profile_image"
                              id="uploadImg"
                              hidden
                            />
                          </Button.Ripple>
                        </div>
                        <p className="text-muted mt-50">
                          <small>
                            Allowed JPG, GIF or PNG. Max size of 800kB
                          </small>
                        </p>
                      </Media>
                    </Media>
                  </FormGroup>
                </Col>
                <Col className="d-flex justify-content-end flex-wrap" sm="12">
                  {this.state.isEmailValid  ? (
                    <Button.Ripple className="mr-1" color="primary">
                      Save Changes
                    </Button.Ripple>
                  ) : (
                    <></>
                  )}
                </Col>
              </Row>
            </Form>
            <Row>
            <Col sm="12">
                <div className="permissions border px-2">
                  <div className="title pt-2 pb-0">
                    <Lock size={19} />
                    <span className="text-bold-500 font-medium-2 ml-50">
                      Event Permissions
                    </span>
                    <hr />
                  </div>
                  <Table borderless responsive>
                    <thead>
                      <tr>
                        <th>Module Permission</th>
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
                            color="primary"
                            icon={<Check className="vx-icon" size={16} />}
                            label=""
                            defaultChecked={true}
                          />
                        </td>
                        <td>
                          <Checkbox
                            color="primary"
                            icon={<Check className="vx-icon" size={16} />}
                            label=""
                            defaultChecked={false}
                          />
                        </td>
                        <td>
                          <Checkbox
                            color="primary"
                            icon={<Check className="vx-icon" size={16} />}
                            label=""
                            defaultChecked={false}
                          />
                        </td>
                        <td>
                          {" "}
                          <Checkbox
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
                            color="primary"
                            icon={<Check className="vx-icon" size={16} />}
                            label=""
                            defaultChecked={false}
                          />
                        </td>
                        <td>
                          <Checkbox
                            color="primary"
                            icon={<Check className="vx-icon" size={16} />}
                            label=""
                            defaultChecked={true}
                          />
                        </td>
                        <td>
                          <Checkbox
                            color="primary"
                            icon={<Check className="vx-icon" size={16} />}
                            label=""
                            defaultChecked={false}
                          />
                        </td>
                        <td>
                          {" "}
                          <Checkbox
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
                            color="primary"
                            icon={<Check className="vx-icon" size={16} />}
                            label=""
                            defaultChecked={true}
                          />
                        </td>
                        <td>
                          <Checkbox
                            color="primary"
                            icon={<Check className="vx-icon" size={16} />}
                            label=""
                            defaultChecked={true}
                          />
                        </td>
                        <td>
                          <Checkbox
                            color="primary"
                            icon={<Check className="vx-icon" size={16} />}
                            label=""
                            defaultChecked={false}
                          />
                        </td>
                        <td>
                          {" "}
                          <Checkbox
                            color="primary"
                            icon={<Check className="vx-icon" size={16} />}
                            label=""
                            defaultChecked={false}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Col>
            </Row>
            <ToastContainer />
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    DInfoData: state.directoryinformation.data,
    DirectoryInformationSuccess: state.directoryinformation.DirectoryInformationSuccess,
    IsDataSubmitedSuccessfullyDirectoryInformation: state.directoryinformation.IsDataSubmitedSuccessfullyDirectoryInformation,
  };
};

const actionMethods = {
  updateDirectoryInformation: updateDirectoryInformation,
  saveDirectoryInformation: saveDirectoryInformation,
   getSingleUserByIDDirectoryInformation: getSingleUserByIDDirectoryInformation
};

export default connect(mapStateToProps, actionMethods)(UserAccountTab);