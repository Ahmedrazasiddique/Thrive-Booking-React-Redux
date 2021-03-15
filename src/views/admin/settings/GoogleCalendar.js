import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  FormGroup,
  Button,
  Row,
  Col,
  Input,
  Form,
} from "reactstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../../src/assets/scss/plugins/extensions/dropzone.scss";
import Toggle from "react-toggle";
import "../../../../src/assets/scss/plugins/forms/flatpickr/flatpickr.scss";
import "flatpickr/dist/themes/light.css";
import "../../../../src/assets/scss/style.scss";
import Loader from "../../../../src/components/Loader/Loader";
import { Calendar, Settings } from "react-feather";

class GoogleCalendar extends React.Component {
  componentDidMount() {}

  componentDidUpdate(prevProps, prevSate) {}

  state = {};

  handleSwitchChange = (e) => {
    // this.setState({guestUserCheckOut:this.state.guestUserCheckOut?false:true});
    //  let value = { [e.target.name]: e.target.value } ;
    //  value = {
    //      ...EventData,
    //      ...value,
    //   };
    //setEventData( {[e.target.name]: e.target.value} )
    // console.log(inputs);
  };

  handleSubmit = (event) => {
    /*
    event.preventDefault();
    this.setState({isShowLoader:true});
    //setIsShowLoader(true);
    const formData = new FormData(event.target);
    formData.append('business_id', 1);
    formData.append('id', this.state.EventData.id);
    var formObject = {};
    formObject.business_id=1;
    formObject.id=1;

    for (let [key, value] of formData.entries()) {
        console.log(key, value);
        formObject[key]=value
    }
    formObject.guest_user_checkout_status=this.state.guestUserCheckOut?"E":"D"

  this.props.updateEventData(formObject)
  */
  };

  render() {
    return (
      <Card>
        <Loader isShowLoader={this.state.isShowLoader}></Loader>
        <CardHeader>
          <CardTitle>Google Calendar Settings</CardTitle>
        </CardHeader>
        <CardBody>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col sm="8">
                <div className="permissions border px-2">
                  <div className="title pt-2 pb-0">
                    <Settings size={19} />
                    <span className="text-bold-500 font-medium-2 ml-50">
                      Calendar Settings
                    </span>
                    <hr />
                  </div>
                  <FormGroup row>
                    <Col sm="4"></Col>
                    <Col sm="8"></Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col sm="4">
                      <h5>Time Inteval </h5>
                    </Col>
                    <Col sm="8">
                      <Input
                        className="form-control"
                        type="text"
                        name="time_interval"
                        id="timeInterval"
                        placeholder="Time Interval"
                        //  value={SeoData.google_analytics_code}
                        //  onChange={handleInputChange}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col sm="4">
                      <h5>Google Calender Client ID</h5>
                    </Col>
                    <Col sm="8">
                      <Input
                        className="form-control"
                        type="text"
                        name="time_interval"
                        id="timeInterval"
                        placeholder="Google Calender Client ID"
                        //  value={SeoData.google_analytics_code}
                        //  onChange={handleInputChange}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col sm="4">
                      <h5>Google Calender Client Secret</h5>
                    </Col>
                    <Col sm="8">
                      <Input
                        className="form-control"
                        type="text"
                        name="time_interval"
                        id="timeInterval"
                        placeholder="Google Calender Client Secret"
                        //  value={SeoData.google_analytics_code}
                        //  onChange={handleInputChange}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col sm="4">
                      <h5>Google Calender Frontend URL</h5>
                    </Col>
                    <Col sm="8">
                      <Input
                        className="form-control"
                        type="text"
                        name="time_interval"
                        id="timeInterval"
                        placeholder="Google Calender Client Secret"
                        //  value={SeoData.google_analytics_code}
                        //  onChange={handleInputChange}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col sm="4">
                      <h5>Google Calender Admin URL</h5>
                    </Col>
                    <Col sm="8">
                      <Input
                        className="form-control"
                        type="text"
                        name="time_interval"
                        id="timeInterval"
                        placeholder="Google Calender Client Secret"
                        //  value={SeoData.google_analytics_code}
                        //  onChange={handleInputChange}
                      />
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col sm="4">
                      <h5>Add Appointments To Google Calender</h5>
                    </Col>
                    <Col sm="8">
                      <label className="react-toggle-wrapper">
                        <Toggle
                          //  checked={this.state.guestUserCheckOut}
                          onChange={this.handleSwitchChange}

                          //  defaultChecked={this.state.EventData.guest_user_checkout_status=="E"?true:false}
                        />
                      </label>
                    </Col>
                  </FormGroup>
                </div>
              </Col>

              <Col sm="4">
                <div className="permissions border px-2">
                  <div className="title pt-2 pb-0">
                    <Calendar size={19} />
                    <span className="text-bold-500 font-medium-2 ml-50">
                      Calendar Configuration
                    </span>
                    <hr />
                  </div>
                  <FormGroup row>
                    <Col sm="8">
                      <h5>Add Appointments To Google Calender</h5>
                    </Col>
                    <Col sm="4">
                      <label className="react-toggle-wrapper">
                        <Toggle
                          //  checked={this.state.guestUserCheckOut}
                          onChange={this.handleSwitchChange}

                          //  defaultChecked={this.state.EventData.guest_user_checkout_status=="E"?true:false}
                        />
                      </label>
                    </Col>
                  </FormGroup>{" "}
                  <FormGroup row>
                    <Col sm="8">
                      <h5>Two Way Sync</h5>
                    </Col>
                    <Col sm="4">
                      <label className="react-toggle-wrapper">
                        <Toggle
                          //  checked={this.state.guestUserCheckOut}
                          onChange={this.handleSwitchChange}

                          //  defaultChecked={this.state.EventData.guest_user_checkout_status=="E"?true:false}
                        />
                      </label>
                    </Col>
                  </FormGroup>
                </div>
              </Col>
            </Row>
            <Row>
              <Col className="d-flex justify-content-end flex-wrap" sm="12">
                <Button.Ripple className="mr-1" color="primary">
                  Save Changes
                </Button.Ripple>
              </Col>
            </Row>
          </Form>

          <ToastContainer />
        </CardBody>
      </Card>
    );
  }
}

export default GoogleCalendar;
