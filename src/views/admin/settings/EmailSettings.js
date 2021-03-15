import React, { useState, useEffect } from "react";
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
import { ToastContainer, toast } from "react-toastify";
import { HelpCircle, Mail, Send, Server, Trash } from "react-feather";
import Toggle from "react-toggle";
import { connect } from "react-redux";
import {
  getEmailSettingsData,
  updateEmailSettingsData,
} from "../../../actions/emailSettingsAction";
import Loader from "../../../../src/components/Loader/Loader";
import { getAdminBusinessId } from "../../../utils/authHelper";

const EmailSettings = (props) => {
  const [EmailSettingsData, setEmailSettingsData] = useState({});
  const [reminderComponent, setReminderComponent] = useState(0);
  const [isShowLoader, setIsShowLoader] = useState(true);

  const [adminEmailNotificationChk, setAdminEmailNotificationChk] = useState(
    true
  );
  const [clientEmailNotificationChk, setClientEmailNotificationChk] = useState(
    true
  );
  const [staffEmailNotificationChk, setStaffEmailNotificationChk] = useState(
    true
  );
  const [smtpNotificationChk, setSmtpNotificationChk] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);

  const handleInputChange = (e) => {
    if (e.target.name === "administrator_email") {
      var email = e.target.value;
      const r = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      r.test(String(email).toLowerCase())
        ? setIsEmailValid(true)
        : setIsEmailValid(false);
    }
    let value = { [e.target.name]: e.target.value };
    value = {
      ...EmailSettingsData,
      ...value,
    };
    setEmailSettingsData({ [e.target.name]: e.target.value });
    // console.log(inputs);
  };

  const handleInputReminder = (index) => (e) => {
    console.log("index: " + index);
    console.log("property name: " + e.target.id);
    let newArr = [...reminderComponent]; // copying the old datas array
    newArr[index][e.target.id] = e.target.value; // replace e.target.value with whatever you want to change it to
    setReminderComponent(newArr); // ??
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    var payload = {};
    setIsShowLoader(true);
    const formData = new FormData(event.target);
    formData.append(
      "smtp_auth_status",
      smtpNotificationChk === true ? "E" : "D"
    );
    formData.append(
      "admin_email_notification_status",
      adminEmailNotificationChk === true ? "E" : "D"
    );
    formData.append(
      "client_email_notification_status",
      clientEmailNotificationChk === true ? "E" : "D"
    );
    formData.append(
      "staff_email_notification_status",
      staffEmailNotificationChk === true ? "E" : "D"
    );
    let reminders = reminderComponent.forEach(function (v) {
      delete v.id;
      delete v.created_at;
      delete v.updated_at;
    });
    // formData.append('reminders', JSON.stringify(reminderComponent));
    formData.append("business_id", getAdminBusinessId()); // need to get from local storage
    formData.append("id", props.EmailSettingsData.id);
    for (let [key, value] of formData.entries()) {
      payload[key] = value;
      console.log(key, value);
    }
    payload.reminders = reminderComponent;
    props.updateEmailSettingsData(payload);
  };

  useEffect(() => {
    if (!props.EmailSettingSuccess && !props.IsDataSubmitedSuccessfully) {
      props.getEmailSettingsData(1);
      setIsShowLoader(true);
    }
  }, [props.EmailSettingSuccess, props.IsDataSubmitedSuccessfully]);

  useEffect(() => {
    if (props.EmailSettingSuccess) {
      setEmailSettingsData(props.EmailSettingsData);
      setReminderComponent(props.EmailSettingsData.email_reminders);
      setAdminEmailNotificationChk(
        props.EmailSettingsData.admin_email_notification_status === "E"
          ? true
          : false
      );
      setClientEmailNotificationChk(
        props.EmailSettingsData.client_email_notification_status === "E"
          ? true
          : false
      );
      setStaffEmailNotificationChk(
        props.EmailSettingsData.staff_email_notification_status === "E"
          ? true
          : false
      );
      setSmtpNotificationChk(
        props.EmailSettingsData.smtp_auth_status === "E" ? true : false
      );

      setIsShowLoader(false);
    } else {
    }
  }, [props.EmailSettingsData]);

  const DeleteReminder = (event) => {
    const id = parseInt(event.target.getAttribute("name"));
    setReminderComponent(reminderComponent.filter((item) => item.id !== id));
    //  setReminderComponent(state=>[...state,{reminderNo:count+1,reminderDD:1}])
  };

  const AddReminder = (event) => {
    let count = reminderComponent.length;
    setReminderComponent((state) => [
      ...state,
      {
        email_config_id: count + 1,
        reminder_type: "M",
        reminder_value: "20",
      },
    ]);
  };

  useEffect(() => {
    if (props.IsDataSubmitedSuccessfully) {
      setIsShowLoader(false);
      toast.success("Email Settings Updated Successfully");
    }

    if (props.IsError) {
      setIsShowLoader(false);
      toast.error("something went wrong");
    }
  }, [props.IsDataSubmitedSuccessfully]);

  const handleSwitchChange = (event) => {
    if (props.EmailSettingSuccess) {
      if (event.target.id === "adminEmailNotificationChk")
        setAdminEmailNotificationChk(adminEmailNotificationChk ? false : true);
      else if (event.target.id === "clientEmailNotificationChk")
        setClientEmailNotificationChk(
          clientEmailNotificationChk ? false : true
        );
      else if (event.target.id === "staffEmailNotificationChk")
        setStaffEmailNotificationChk(staffEmailNotificationChk ? false : true);
      else if (event.target.id === "smtpNotificationChk")
        setSmtpNotificationChk(smtpNotificationChk ? false : true);
    }
  };

  const adminEmailOptions = [
    { value: "0", label: "Email 1" },
    { value: "1", label: "Email 2" },
  ];
  const smtpPortOptions = [
    { value: "0", label: "443" },
    { value: "1", label: "21" },
  ];
  const encryptedTypeOptions = [
    { value: "Plain", label: "Plain" },
    { value: "TLS", label: "TLS" },
    { value: "SSL", label: "SSL" },
  ];
  const smtpAuthenticationOptions = [
    { value: "0", label: "Authentication Type 1" },
    { value: "1", label: "Authentication Type 2" },
  ];
  const emailReminderOptions = [
    { value: "D", label: "day's before" },
    { value: "H", label: "hour's before" },
    { value: "M", label: "minute/s before" },
  ];

  return (
    <Card>
      <Loader isShowLoader={isShowLoader}></Loader>
      <CardHeader>
        <CardTitle>Email Settings</CardTitle>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col sm="4">
              <div className="permissions border px-2">
                <div className="title pt-2 pb-0">
                  <Server size={19} />
                  <span className="text-bold-500 font-medium-2 ml-50">
                    SMTP Settings
                  </span>
                  <hr />
                </div>
                <FormGroup row>
                  <Col sm="4">
                    <h5>SMTP Hostname </h5>
                  </Col>
                  <Col sm="8">
                    <Input
                      className="form-control"
                      type="text"
                      name="smtp_host_name"
                      id="smtpHostName"
                      placeholder="Smtp host name"
                      value={EmailSettingsData.smtp_host_name}
                      onChange={handleInputChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col sm="4">
                    <h5>SMTP Username </h5>
                  </Col>
                  <Col sm="8">
                    <Input
                      className="form-control"
                      type="text"
                      name="smtp_username"
                      id="smtpUserName"
                      placeholder="Smtp user name"
                      value={EmailSettingsData.smtp_username}
                      onChange={handleInputChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col sm="4">
                    <h5>SMTP Password </h5>
                  </Col>
                  <Col sm="8">
                    <Input
                      className="form-control"
                      type="password"
                      name="smtp_password"
                      id="smtpPasswardName"
                      placeholder="Smtp password name"
                      onChange={handleInputChange}
                      value={EmailSettingsData.smtp_password}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col sm="4">
                    <h5>SMTP Port </h5>
                  </Col>
                  <Col sm="8">
                    <Input
                      className="form-control"
                      type="number"
                      name="smtp_port"
                      id="smtpPort"
                      placeholder="Smtp port"
                      value={EmailSettingsData.smtp_port}
                      onChange={handleInputChange}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col sm="4">
                    <h5>Encrypted Type </h5>
                  </Col>
                  <Col sm="8">
                    <Input
                      type="select"
                      onChange={handleInputChange}
                      value={EmailSettingsData.encryption_type}
                      name="encryption_type"
                      id="encryption_type"
                    >
                      <option>Plain</option>
                      <option>TLS</option>
                      <option>SSL</option>
                    </Input>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col sm="4">
                    <h5>
                      Smtp Authentication <HelpCircle size={12} />
                    </h5>
                  </Col>
                  <Col sm="3">
                    <label className="react-toggle-wrapper">
                      <Toggle
                        checked={smtpNotificationChk}
                        onChange={handleSwitchChange}
                        id="smtpNotificationChk"
                        value="yes"
                        defaultChecked={smtpNotificationChk}
                      />
                    </label>
                  </Col>
                </FormGroup>
              </div>
            </Col>

            <Col sm="4">
              <div className="permissions border px-2">
                <div className="title pt-2 pb-0">
                  <Send size={19} />
                  <span className="text-bold-500 font-medium-2 ml-50">
                    Sender Settings
                  </span>
                  <hr />
                </div>
                <FormGroup row>
                  <Col sm="4">
                    <h5>Administrator Email </h5>
                  </Col>
                  <Col sm="8">
                    <Input
                      className="form-control"
                      type="text"
                      name="administrator_email"
                      id="adminEmail"
                      placeholder="Admin email"
                      onChange={handleInputChange}
                      value={EmailSettingsData.administrator_email}
                    />
                    {!isEmailValid ? (
                      <div class="field-error text-danger">Invalid Email</div>
                    ) : (
                      <></>
                    )}
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col sm="4">
                    <h5>
                      Admin Email <HelpCircle size={12} /> Notification
                    </h5>
                  </Col>
                  <Col sm="3">
                    <label className="react-toggle-wrapper">
                      <Toggle
                        checked={adminEmailNotificationChk}
                        onChange={handleSwitchChange}
                        id="adminEmailNotificationChk"
                        value="yes"
                        defaultChecked={adminEmailNotificationChk}
                      />
                    </label>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col sm="4">
                    <h5>
                      Client Email <HelpCircle size={12} /> Notification
                    </h5>
                  </Col>
                  <Col sm="3">
                    <label className="react-toggle-wrapper">
                      <Toggle
                        checked={clientEmailNotificationChk}
                        onChange={handleSwitchChange}
                        id="clientEmailNotificationChk"
                        value="yes"
                        defaultChecked={clientEmailNotificationChk}
                      />
                    </label>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col sm="4">
                    <h5>
                      Staff Email <HelpCircle size={12} /> Notification
                    </h5>
                  </Col>
                  <Col sm="3">
                    <label className="react-toggle-wrapper">
                      <Toggle
                        checked={staffEmailNotificationChk}
                        onChange={handleSwitchChange}
                        id="staffEmailNotificationChk"
                        value="yes"
                        defaultChecked={staffEmailNotificationChk}
                      />
                    </label>
                  </Col>
                </FormGroup>
              </div>
            </Col>

            <Col sm="4">
              <div className="permissions border px-2">
                <div className="title pt-2 pb-0">
                  <Mail size={19} />
                  <span className="text-bold-500 font-medium-2 ml-50">
                    Email Reminders
                  </span>
                  <hr />
                </div>

                {reminderComponent
                  ? reminderComponent.map((value, index) => (
                      <FormGroup row>
                        <Col sm="3">
                          {index === 0 ? <h5>Set Reminder </h5> : <></>}
                        </Col>

                        <Col sm="2">
                          <Input
                            className="form-control"
                            type="text"
                            placeholder="Email reminder"
                            value={value.reminder_value}
                            id={"reminder_value"}
                            onChange={handleInputReminder(index)}
                          />
                        </Col>
                        <Col sm="6">
                          <Input
                            type="select"
                            id={"reminder_type"}
                            onChange={handleInputReminder(index)}
                            value={value.reminder_type}
                          >
                            <option value="D">day's before</option>
                            <option value="H">hour's before</option>
                            <option value="M">minute/s before</option>
                          </Input>
                        </Col>

                        <Col sm="1">
                          {index != 0 ? (
                            <Trash
                              id="deleteReminder"
                              name={value.id}
                              onClick={DeleteReminder}
                              size={19}
                            />
                          ) : (
                            <></>
                          )}
                        </Col>
                      </FormGroup>
                    ))
                  : []}
                <FormGroup row>
                  <Col sm="3"></Col>
                  <Col sm="8">
                    <Button.Ripple
                      onClick={AddReminder}
                      className="mr-1"
                      color="primary"
                    >
                      + Add Reminder
                    </Button.Ripple>
                  </Col>
                </FormGroup>
              </div>
            </Col>
          </Row>

          <Row>
            <Col className="d-flex justify-content-end flex-wrap" sm="12">
              {isEmailValid ? (
                <Button.Ripple className="mr-1" color="primary">
                  Save Changes
                </Button.Ripple>
              ) : (
                <></>
              )}
            </Col>
          </Row>
        </Form>

        <ToastContainer />
      </CardBody>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    EmailSettingsData: state.emailSettings.data,
    EmailSettingSuccess: state.emailSettings.EmailSettingsSuccess,
    IsDataSubmitedSuccessfully: state.emailSettings.IsDataSubmitedSuccessfully,
    IsError: state.emailSettings.IsError,
  };
};

const actionMethods = {
  getEmailSettingsData: getEmailSettingsData,
  updateEmailSettingsData: updateEmailSettingsData,
};

export default connect(mapStateToProps, actionMethods)(EmailSettings);
