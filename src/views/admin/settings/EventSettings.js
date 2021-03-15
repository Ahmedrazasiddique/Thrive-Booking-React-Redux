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
  Form,
  UncontrolledTooltip,
} from "reactstrap";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../../src/assets/scss/plugins/extensions/dropzone.scss";
import Toggle from "react-toggle";
import "../../../../src/assets/scss/plugins/forms/flatpickr/flatpickr.scss";
import "flatpickr/dist/themes/light.css";
import "../../../../src/assets/scss/style.scss";
import CustomTimePicker from "../../../../src/components/CustomComponents/CustomTimePicker";
import { connect } from "react-redux";
import {
  getEventData,
  updateEventData,
} from "../../../actions/eventSettingsActions";
import Loader from "../../../../src/components/Loader/Loader";
import { getAdminBusinessId } from "../../../utils/authHelper";
import { getDropdownValue } from "../../../utils/dropDownHelper";
import { HelpCircle, Calendar, Settings } from "react-feather";

class EventSettings extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let dataDays = [];
    for (let i = 1; i < 31; i++) {
      dataDays.push({ value: i, label: i + " Days" });
    }
    let datahours = [];
    for (let i = 1; i < 25; i++) {
      datahours.push({ value: i, label: i + " Hours" });
    }
    let minutes = [];
    for (let i = 1; i < 61; i++) {
      minutes.push({ value: i, label: i + " Minutes" });
    }

    this.setState({ dataDays: dataDays });
    this.setState({ datahours: datahours });
    this.setState({ minutes: minutes });

    this.setState({ isShowLoader: true });
    const { getEventData } = this.props;
    getEventData(1);
  }

  componentDidUpdate(prevProps, prevSate) {
    if (this.props !== prevProps) {
      if (this.props.EventSuccess) {
        this.setState({ EventData: this.props.EventData });
        this.setState({ isShowLoader: false });
        this.setState({ EventSuccessLocal: true });
        this.setState({
          guestUserCheckOut:
            this.state.EventData.guest_user_checkout_status === "E"
              ? true
              : false,
        });
      }
      if (this.props.IsDataSubmitedSuccessfully) {
        this.setState({ isShowLoader: false });
        toast.success("Event Settings Updated Successfully");
      }

      if (this.props.IsError) {
        this.setState({ isShowLoader: false });
        toast.error("something went wrong");
      }
      // this.setState({})
    }
  }

  state = {
    EventData: {},
    guestUserCheckOut: false,
    EventSuccessLocal: false,
    timeFormateOptions: [
      { value: "24", label: "24" },
      { value: "12", label: "12" },
    ],
    calenderDefaultViewOptions: [
      { value: "monthly", label: "Monthly" },
      { value: "weekly", label: "Weekly" },
    ],
    calenderfirstDayOptions: [
      { value: 1, label: "Monthly" },
      { value: 2, label: "Tuesday" },
      { value: 3, label: "Wenesday" },
      { value: 4, label: "Thursday" },
      { value: 5, label: "Friday" },
      { value: 6, label: "Saturday" },
      { value: 7, label: "Sunday" },
    ],
    cancellationBuferTimeOptions: [
      { value: "01:00:00", label: "1 Hour" },
      { value: "02:00:00", label: "2 Hour" },
      { value: "03:00:00", label: "3 Hour" },
      { value: "04:00:00", label: "4 Hour" },
      { value: "05:00:00", label: "5 Hour" },
      { value: "06:00:00", label: "6 Hour" },
      { value: "07:00:00", label: "7 Hour" },
      { value: "08:00:00", label: "8 Hour" },
      { value: "09:00:00", label: "9 Hour" },
      { value: "10:00:00", label: "10 Hour" },
      { value: "11:00:00", label: "11 Hour" },
      { value: "12:00:00", label: "12 Hour" },
      { value: "24:00:00", label: "24 Hour" },
      { value: "48:00:00", label: "48 Hour" },
      { value: "72:00:00", label: "72 Hour" },
      { value: "96:00:00", label: "96 Hour" },
      { value: "00:00:00", label: "Custom" },
    ],
    datePickerFormateOptions: [
      { value: "mm-dd-yyy", label: "mm-dd-yyy" },

      { value: "mm/dd/yyy", label: "mm/dd/yyy" },

      { value: "yyyy/mm/dd", label: "yyyy/mm/dd" },
    ],
  };

  handleSwitchChange = (e) => {
    this.setState({
      guestUserCheckOut: this.state.guestUserCheckOut ? false : true,
    });
    //  let value = { [e.target.name]: e.target.value } ;
    //  value = {
    //      ...EventData,
    //      ...value,
    //   };
    //setEventData( {[e.target.name]: e.target.value} )
    // console.log(inputs);
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ isShowLoader: true });
    //setIsShowLoader(true);
    const formData = new FormData(event.target);
    formData.append("business_id", getAdminBusinessId());
    formData.append("id", this.state.EventData.id);
    var formObject = {};
    formObject.business_id = 1;
    formObject.id = 1;
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
      formObject[key] = value;
    }
    formObject.guest_user_checkout_status = this.state.guestUserCheckOut
      ? "E"
      : "D";
    this.props.updateEventData(formObject);
  };

  render() {
    return (
      <Card>
        <Loader isShowLoader={this.state.isShowLoader}></Loader>
        <CardHeader>
          <CardTitle>Event Settings</CardTitle>
        </CardHeader>
        <CardBody>
          {this.state.EventSuccessLocal ? (
            <Form onSubmit={this.handleSubmit}>
              <Row>
                <Col sm="6">
                  <div className="permissions border px-2">
                    <div className="title pt-2 pb-0">
                      <Settings size={19} />
                      <span className="text-bold-500 font-medium-2 ml-50">
                        Appointment Setting
                      </span>
                      <hr />
                    </div>
                    <FormGroup row>
                      <Col sm="3">
                        <h5>
                          Default Interval{" "}
                          <HelpCircle id="defaultIntervalTp" size={12} /> Time
                        </h5>
                        <UncontrolledTooltip
                          placement="top"
                          target="defaultIntervalTp"
                        >
                          Test Tooltip !
                        </UncontrolledTooltip>
                      </Col>
                      <Col sm="9">
                        <CustomTimePicker
                          nameDD={[
                            "",
                            "default_interval_time_hours",
                            "default_interval_time_minutes",
                          ]}
                          ValDD={this.state.EventData}
                          isDaysToShow={false}
                          disabled={false}
                          dataDays={this.state.dataDays}
                          datahours={this.state.datahours}
                          minutes={this.state.minutes}
                        ></CustomTimePicker>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col sm="3">
                        <h5>
                          Cancellation <HelpCircle id="cbt" size={12} /> Buffer
                          Time
                        </h5>
                        <UncontrolledTooltip placement="top" target="cbt">
                          Test Tooltip !
                        </UncontrolledTooltip>
                      </Col>
                      <Col sm="9">
                        <CustomTimePicker
                          isDaysToShow={true}
                          nameDD={[
                            "cancellation_buffer_time_days",
                            "cancellation_buffer_time_hours",
                            "cancellation_buffer_time_minutes",
                          ]}
                          ValDD={this.state.EventData}
                          disabled={false}
                          dataDays={this.state.dataDays}
                          datahours={this.state.datahours}
                          minutes={this.state.minutes}
                        ></CustomTimePicker>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col sm="3">
                        <h5>Reschedule Buffer Time</h5>
                      </Col>
                      <Col sm="9">
                        <CustomTimePicker
                          isDaysToShow={true}
                          nameDD={[
                            "reschedule_buffer_time_days",
                            "reschedule_buffer_time_hours",
                            "reschedule_buffer_time_minutes",
                          ]}
                          ValDD={this.state.EventData}
                          disabled={false}
                          dataDays={this.state.dataDays}
                          datahours={this.state.datahours}
                          minutes={this.state.minutes}
                        ></CustomTimePicker>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col sm="3">
                        <h5>Min Adv. Booking Time</h5>
                      </Col>
                      <Col sm="9">
                        <CustomTimePicker
                          isDaysToShow={true}
                          disabled={false}
                          nameDD={[
                            "min_adv_booking_time_days",
                            "min_adv_booking_time_hours",
                            "min_adv_booking_time_minutes",
                          ]}
                          ValDD={this.state.EventData}
                          dataDays={this.state.dataDays}
                          datahours={this.state.datahours}
                          minutes={this.state.minutes}
                        ></CustomTimePicker>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col sm="3">
                        <h5>Max Adv. Booking Time</h5>
                      </Col>
                      <Col sm="9">
                        <CustomTimePicker
                          isDaysToShow={true}
                          disabled={false}
                          nameDD={[
                            "max_adv_booking_time_days",
                            "max_adv_booking_time_hours",
                            "max_adv_booking_time_minutes",
                          ]}
                          ValDD={this.state.EventData}
                          dataDays={this.state.dataDays}
                          datahours={this.state.datahours}
                          minutes={this.state.minutes}
                        ></CustomTimePicker>
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Col sm="3">
                        <h5>
                          Guest User <HelpCircle id="guco" size={12} /> Checkout
                        </h5>
                        <UncontrolledTooltip placement="top" target="guco">
                          Test Tooltip !
                        </UncontrolledTooltip>
                      </Col>
                      <Col sm="9">
                        <label className="react-toggle-wrapper">
                          <Toggle
                            checked={this.state.guestUserCheckOut}
                            onChange={this.handleSwitchChange}
                            defaultChecked={
                              this.state.EventData
                                .guest_user_checkout_status === "E"
                                ? true
                                : false
                            }
                          />
                        </label>
                      </Col>
                    </FormGroup>
                  </div>
                </Col>

                <Col sm="6">
                  <div className="permissions border px-2">
                    <div className="title pt-2 pb-0">
                      <Calendar size={19} />
                      <span className="text-bold-500 font-medium-2 ml-50">
                        Calendar Setting
                      </span>
                      <hr />
                    </div>

                    <FormGroup row>
                      <Col sm="3">
                        <h5>
                          Time Format <HelpCircle id="tm" size={12} />
                        </h5>
                        <UncontrolledTooltip placement="top" target="tm">
                          Test Tooltip !
                        </UncontrolledTooltip>
                      </Col>
                      <Col sm="4">
                        <Select
                          classNamePrefix="select"
                          defaultValue={{
                            value: this.state.EventData.time_format,
                            label: this.state.EventData.time_format,
                          }}
                          options={this.state.timeFormateOptions}
                          name={"time_format"}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col sm="3">
                        <h5>
                          Date Picker <HelpCircle id="dpf" size={12} /> Format{" "}
                        </h5>
                        <UncontrolledTooltip placement="top" target="dpf">
                          Test Tooltip !
                        </UncontrolledTooltip>
                      </Col>
                      <Col sm="4">
                        <Select
                          classNamePrefix="select"
                          defaultValue={{
                            value: this.state.EventData.date_picker_format,
                            label: this.state.EventData.date_picker_format,
                          }}
                          options={this.state.datePickerFormateOptions}
                          name={"date_picker_format"}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col sm="3">
                        <h5>Calendar Default View </h5>
                      </Col>
                      <Col sm="4">
                        <Select
                          classNamePrefix="select"
                          defaultValue={{
                            value: this.state.EventData.calendar_default_view,
                            label: this.state.EventData.calendar_default_view,
                          }}
                          options={this.state.calenderDefaultViewOptions}
                          name={"calendar_default_view"}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col sm="3">
                        <h5>
                          Calendar First Day <HelpCircle id="cfd" size={12} />{" "}
                        </h5>
                        <UncontrolledTooltip placement="top" target="cfd">
                          Test Tooltip !
                        </UncontrolledTooltip>
                      </Col>
                      <Col sm="4">
                        <Select
                          classNamePrefix="select"
                          defaultValue={getDropdownValue(
                            this.state.calenderfirstDayOptions,
                            this.state.EventData.calendar_first_day,
                            "value"
                          )}
                          options={this.state.calenderfirstDayOptions}
                          name={"calendar_first_day"}
                        />
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
          ) : (
            <></>
          )}

          <ToastContainer />
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    EventData: state.eventSettings.data,
    EventSuccess: state.eventSettings.EventSuccess,
    IsDataSubmitedSuccessfully: state.eventSettings.IsDataSubmitedSuccessfully,
    IsError: state.eventSettings.IsError,
  };
};

const actionMethods = {
  getEventData: getEventData,
  updateEventData: updateEventData,
};

export default connect(mapStateToProps, actionMethods)(EventSettings);
