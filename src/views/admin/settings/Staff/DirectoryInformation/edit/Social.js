import React from "react";
import { Form, FormGroup, Label, Input, Row, Col, Button } from "reactstrap";
import {
  Link,
  Twitter,
  Facebook,
  Instagram,
  GitHub,
  Codepen,
  Slack,
} from "react-feather";
import { connect } from "react-redux";
import {
  updateDirectoryInformation,
  saveDirectoryInformation,
  getSingleUserByIDDirectoryInformation
} from "../../../../../../actions/directoryInformationAction";
import Loader from "../../../../../../../src/components/Loader/Loader";
import {
  getAdminBusinessId,
} from "../../../../../../utils/authHelper";
import { ToastContainer, toast } from "react-toastify";

class UserSocialTab extends React.Component {

  componentDidMount() {
   
    const { getSingleUserByIDDirectoryInformation } = this.props;
    if(this.props.UserID&&this.props.UserID>0){
    getSingleUserByIDDirectoryInformation(this.props.UserID);
    this.setState({ isShowLoader: true });
    }
  }

  state = {
    isShowLoader:false,
    userInfo:{},
  };
  handledob = (date) => {
    this.setState({
      dob: date,
    });
  };

 
  componentDidUpdate(previousProp) {
    if (previousProp !== this.props) {
      if (this.props.IsDataSubmitedSuccessfullyDirectoryInformation) {
        
 toast.success("Directory Information Updated Successfully");
       this.setState({ isShowLoader: false });
    //   window.location.replace('http://example.com/#');
      }
      if (this.props.DirectoryInformationSuccess) {
        this.setState({ isShowLoader: false });
        this.setState({ userInfo: this.props.DInfoData.data
         });
        this.setState({
          countryValue: this.props.DInfoData.data.country,
        });
        this.setState({
          languageValue: this.props.DInfoData.data.language,
        });
        //this.setState({ employeeImageUrl: this.props.DInfoData.data.profile_image });
       }
    }
  }
  
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
}


  handleSubmit = (event) => {

    event.preventDefault();
    this.setState({ isShowLoader: true });
    this.state.userInfo.country_id= this.state.userInfo.country.value
    delete this.state.userInfo.country
    delete this.state.userInfo.profile_image
    this.state.userInfo.business_id=getAdminBusinessId()
    this.state.userInfo.username="fortestingusername" // waiting for mansoor bhai
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



  render() {
    return (
      <Form className="mt-2" onSubmit={this.handleSubmit}>
         <Loader isShowLoader={this.state.isShowLoader}></Loader>
        <h5 className="mb-1">
          <Link size={15} />
          <span className="align-middle ml-50">Social Links</span>
        </h5>
        <Row>
          <Col md="6" sm="12">
            <Label for="twitter">Twitter</Label>
            <FormGroup className="position-relative has-icon-left">
              <Input name="twitter_page_url"  onChange={this.handleInputChange}
                value={this.state.userInfo.twitter_page_url||''} placeholder="https://www.twitter.com/" />
              <div className="form-control-position">
                <Twitter size={15} />
              </div>
            </FormGroup>
            <Label for="facebook">Facebook</Label>
            <FormGroup className="position-relative has-icon-left">
              <Input name="facebook_page_url"  onChange={this.handleInputChange}
                value={this.state.userInfo.facebook_page_url||''} placeholder="https://www.facebook.com/" />
              <div className="form-control-position">
                <Facebook size={15} />
              </div>
            </FormGroup>
            <Label for="instagram">Instagram</Label>
            <FormGroup className="position-relative has-icon-left">
              <Input name="instagram_page_url"  onChange={this.handleInputChange}
                value={this.state.userInfo.instagram_page_url||''} placeholder="https://www.instagram.com/" />
              <div className="form-control-position">
                <Instagram size={15} />
              </div>
            </FormGroup>
          </Col>
          <Col md="6" sm="12">
            <Label for="github">Github</Label>
            <FormGroup className="position-relative has-icon-left">
              <Input name="github_page_url"  onChange={this.handleInputChange}
                value={this.state.userInfo.github_page_url||''} placeholder="https://www.github.com/" />

              <div className="form-control-position">
                <GitHub size={15} />
              </div>
            </FormGroup>
            <Label for="codepen">Codepen</Label>
            <FormGroup className="position-relative has-icon-left">
              <Input name="codepin_page_url"  onChange={this.handleInputChange}
                value={this.state.userInfo.codepin_page_url||''} placeholder="https://www.codepen.com/" />
              <div className="form-control-position">
                <Codepen size={15} />
              </div>
            </FormGroup>
            <Label for="slack">Slack</Label>
            <FormGroup className="position-relative has-icon-left">
              <Input name="slack_page_url"  onChange={this.handleInputChange}
                value={this.state.userInfo.slack_page_url||''} placeholder="https://www.slack.com/" />
              <div className="form-control-position">
                <Slack size={15} />
              </div>
            </FormGroup>
          </Col>
          <Col className="d-flex justify-content-end flex-wrap" sm="12">
            <Button.Ripple className="mr-1" color="primary">
              Save Changes
            </Button.Ripple>
           
          </Col>
          <ToastContainer />
        </Row>
      </Form>
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

export default connect(mapStateToProps, actionMethods)(UserSocialTab);