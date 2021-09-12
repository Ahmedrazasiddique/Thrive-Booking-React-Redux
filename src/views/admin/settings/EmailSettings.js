import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  FormGroup,
  Table,
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
  const [reminderCount, setReminderCount] = useState(3);

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
      <div className="eventdetailsaddbox rd_noshadow">
          <div className="boxheader rd_floatingheaderthig">
            <div className="rd_inputselectheader">
                <div className="rd_selectheaderrdt2">
                    <h3><strong>Email Settings</strong></h3>
                  </div>
            </div>
          </div>
      <Loader isShowLoader={isShowLoader}></Loader>
      
        <Form onSubmit={handleSubmit}>
         
           
          <div className="rd_vacationfilterpart rd_vacationfilterpart2 rd_vacationfilterpartema">
          <h4 className="rd_setsmt"><strong>SMTP Settings</strong></h4>
          <div className="rd_vacationflex2 rd_vacationflexspecial">
                <p>SMTP Hostname</p>
                <div className="rd_adddayof">
                <Input
                      className="rd_adddayofinput"
                      type="text"
                      name="smtp_host_name"
                      id="smtpHostName"
                      placeholder="Smtp host name"
                      value={EmailSettingsData.smtp_host_name}
                      onChange={handleInputChange}
                    />
                   
                </div>
            </div>
            <div className="rd_vacationflex2 rd_vacationflexspecial">
                <p>SMTP Username</p>
                <div className="rd_adddayof">
                <Input
                      className="rd_adddayofinput"
                      type="text"
                      name="smtp_username"
                      id="smtpUserName"
                      placeholder="Smtp user name"
                      value={EmailSettingsData.smtp_username}
                      onChange={handleInputChange}
                    />
                </div>
            </div>
            <div className="rd_vacationflex2 rd_vacationflexspecial">
                <p>SMTP Password</p>
                <div className="rd_adddayof">
                <Input
                      className="rd_adddayofinput"
                      type="password"
                      name="smtp_password"
                      id="smtpPasswardName"
                      placeholder="Smtp password name"
                      onChange={handleInputChange}
                      value={EmailSettingsData.smtp_password}
                    />
                </div>
            </div>
            <div className="rd_vacationflex2 rd_vacationflexspecial">
                <p>SMTP Port</p>
                <div className="rd_adddayof">
                <Input
                      className="rd_adddayofinput"
                      type="number"
                      name="smtp_port"
                      id="smtpPort"
                      placeholder="Smtp port"
                      value={EmailSettingsData.smtp_port}
                      onChange={handleInputChange}
                    />
                </div>
            </div>
            <div className="rd_vacationflex2 rd_vacationflexspecial">
                <p>Encrypted Type</p>
                <div className="rd_adddayof">
                <Input
                    className="rd_adddayofinput"
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
                   
                </div>
            </div>

            <div className="rd_vacationflex2 rd_vacationflexspecial">
              <div className="box_content rd_box_contentspecialemailset">
                <div className="form-check form-switch">
                   <label className="form-check-label" for="smtpNotificationChk">Encrypted Type</label>
                <input className="form-check-input" 
                type="checkbox" 
                checked={smtpNotificationChk}
                onChange={handleSwitchChange}
                id="smtpNotificationChk"
                value="yes"
                defaultChecked={smtpNotificationChk}/>
                   
                
                </div>
              </div>
          </div>
                
              </div>
            
              <div className="rd_vacationfilterpart rd_vacationfilterpart2 rd_vacationfilterpartema">
            <h4 className="rd_setsmt"><strong>Sender Settings</strong></h4>
            <div className="rd_vacationflex1dot3">
                <p>Admin Email</p>
                <div className="rd_adddayof rd_adddayofemail">
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
                      <div className="field-error text-danger">Invalid Email</div>
                    ) : (
                      <></>
                    )}
                </div>
            </div>
          <div className="rd_vacationflex2">
              <div className="box_content rd_box_contentspecialemailset">
              <div className="form-check form-switch">
                
              <label className="form-check-label" for="adminEmailNotificationChk">Admin Email Notification</label>
                <input className="form-check-input" 
                type="checkbox" 
                checked={adminEmailNotificationChk}
                onChange={handleSwitchChange}
                id="adminEmailNotificationChk"
                value="yes"
                defaultChecked={adminEmailNotificationChk}/>
                
                </div>
              </div>
          </div>
          <div className="rd_vacationflex2">
            <div className="box_content rd_box_contentspecialemailset">
            <div className="form-check form-switch">
            <label className="form-check-label" for="clientEmailNotificationChk"> Client Email  Notification</label>
                <input className="form-check-input" 
                type="checkbox" 
                 
                checked={clientEmailNotificationChk}
                        onChange={handleSwitchChange}
                        id="clientEmailNotificationChk"
                        value="yes"
                        defaultChecked={clientEmailNotificationChk}/>
                   
                
                </div>

            </div>
        </div>
        <div className="rd_vacationflex2">
            <div className="box_content rd_box_contentspecialemailset">
            <div className="form-check form-switch">
            <label className="form-check-label" for="staffEmailNotificationChk"> Staff Email  Notification </label>
                <input className="form-check-input" 
                type="checkbox" 
                checked={staffEmailNotificationChk}
                        onChange={handleSwitchChange}
                        id="staffEmailNotificationChk"
                        value="yes"
                        defaultChecked={staffEmailNotificationChk}/>
                  
                
                </div>
              
            </div>
        </div>
        </div>

{/*
        <div className="rd_vacationfilterpart rd_vacationfilterpart2 rd_vacationfilterpartema">
        
        <h4 className="rd_setsmt"><strong>Email Reminders</strong></h4>

                {reminderComponent
                  ? 
                  reminderComponent.map((value, index) => (
                      <FormGroup row>
                       

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
                          : [] }
               
           {reminderComponent.length==3?<></>:   
           <button type="button" onClick={AddReminder} className="rd_blockbtnth">+ Add Reminder</button>
}

           </div>
*/}    

              {isEmailValid ? (
               <div className="rd_alignrightb">
            <button className="rd_blockbtnth">Save Changes</button>
            </div>
              ) : (
                <></>
              )}
            
        </Form>

        <ToastContainer />
        </div>
   
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
