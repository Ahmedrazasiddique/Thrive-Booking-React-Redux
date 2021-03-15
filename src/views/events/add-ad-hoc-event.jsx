import React, { Component } from 'react';
import { Row, Col, Button, Alert } from 'reactstrap';
import { connect } from "react-redux";
import { saveAdHocEvent } from '../../actions/eventActions';
import AdHocCalendar from './Components/Common/Ad-Hoc-Calendar';
import InvitesList from './Components/Common/InvitesList';
import IntervalField from './Components/Common/IntervalField';
import TimeIntervalComponent from './Components/Common/TimeInterval';
import FormField from "./Components/Common/FormField";
import { Formik, Form } from "formik";
import * as Yup from "yup";

const validation = Yup.object().shape({
    event_title: Yup.string().required("Event Title is required"),
    start_time: Yup.string().required("Start Time is required"),
    end_time: Yup.string().required("End Time is Required")
});    

let initialValues = {
    event_title: "",
    event_date: new Date(),
    start_time: "",
    end_time: "",
    link_expiration_period: "",
    min_schedule_notice_in_minutes: ""
}    

let defaultInvitee = {
    first_name: "",
    last_name: "",
    email: ""
}

class AddAdHocComponent extends Component {
    
    state = {
        isLoading: false,
        errorMessage: "",
        invites_list: [
            {
                first_name: "",
                last_name: "",
                email: ""
            }
        ]
    }

    addInvitee = () => {
        const { invites_list } = this.state;

        const new_invitees_list = [...invites_list, defaultInvitee];

        this.setState({
            invites_list: new_invitees_list
        })
    
    }

    onChange = (fieldName, fieldValue, index) => {
        const { invites_list } = this.state;

        const new_invitees_list = (invites_list || []).map((list, i) => {
            if(i === index) {
                return {
                    ...list,
                    [fieldName]: fieldValue
                }
            }

            return list
        });

        this.setState({
            invites_list: new_invitees_list
        })
    }
    render() {
        const { isLoading, errorMessage, invites_list } = this.state;
        return (
            <div className="create-event-wrapper">
                <div className="create-event-container">
                    <Row>
                        <Col md="12" lg="12">
                            <div className="event-card">
                                <div className="event-card-head">
                                    <h3 className="event-title">Add New Booking/Event</h3>
                                </div>
                                <div className="event-card-body">

                                    <div className="form-group event-form-group">
                                        <Formik
                                            validationSchema={validation}
                                            initialValues={initialValues}
                                            onSubmit={(data) => {
                                                const bussinessId = localStorage.getItem('businessId')
                                                const { invites_list } = this.state;
                                                const { saveAdHocEvent } = this.props;
                                                saveAdHocEvent({
                                                    data: {
                                                        ...data,
                                                        event_invitations: invites_list,
                                                        business_id: bussinessId,
                                                        provider_id: bussinessId
                                                    },
                                                    onSuccess: (event) => {
                                                        const { route } = this.props;
                                                        const { history } = route || {};
                                                        history.push(`/admin/events/list`);
                                                    },
                                                    onError: (error) => {
                                                        this.setState({
                                                            errorMessage: error,
                                                            isLoading: false
                                                        })
                                                    }
                                                })
                                            }}
                                        >
                                            {(formProps) => {
                                                const {
                                                    values,
                                                    errors,
                                                    touched,
                                                    handleChange,
                                                    setFieldValue,
                                                } = formProps;
                                                return (
                                                    <Form>
                                                        <Row>
                                                            <Col md="6" lg="6">
                                                                <div className="ad-hoc-container">
                                                                    <AdHocCalendar 
                                                                        value = { values.event_date } 
                                                                        onChange= {(value) => {
                                                                                handleChange({
                                                                                    target: { name: "event_date", value }
                                                                                });
                                                                            }
                                                                        }
                                                                    />
                                                                </div>
                                                            </Col>
                                                            <Col md="6" lg="6">
                                                                <Row>
                                                                    <Col md="12" lg="12">
                                                                        <FormField
                                                                            type="text"
                                                                            name="event_title"
                                                                            label="Event Title *"
                                                                            placeholder="Title"
                                                                            showLabel={true}
                                                                            value={values.event_title}
                                                                            errors={errors}
                                                                            touched={touched}
                                                                            
                                                                        />
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col md="12" lg="12">
                                                                        <TimeIntervalComponent 
                                                                            onChange = { (value) => {
                                                                                handleChange({
                                                                                    target: { name: "start_time", value }
                                                                                });
                                                                            }}
                                                                            label = "Start Time" 
                                                                            value = { values.start_time }
                                                                            placeholder = "12:00" 
                                                                            errors={errors}
                                                                            name="start_time"
                                                                            touched={touched}
                                                                        />    
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col md="12" lg="12">
                                                                        <TimeIntervalComponent 
                                                                            onChange = { (value) => {
                                                                                handleChange({
                                                                                    target: { name: "end_time", value }
                                                                                });
                                                                            }}
                                                                            label = "End Time" 
                                                                            value = { values.end_time }
                                                                            placeholder = "12:00" 
                                                                            errors={errors}
                                                                            name="end_time"
                                                                            touched={touched}
                                                                        />    
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col md="6" lg="6">
                                                                        <div className="form-group event-group">
                                                                            <label>Minimum Scheduling Notice</label>
                                                                            <IntervalField 
                                                                                onChange= {
                                                                                    (value) => {
                                                                                        handleChange({
                                                                                            target: { name: "min_schedule_notice_in_minutes", value }
                                                                                        });
                                                                                    }
                                                                                }
                                                                                label = "min"
                                                                                interval = { 10 }
                                                                                defaultValue = { 0 }
                                                                                
                                                                            />
                                                                        </div>
                                                                    </Col>
                                                                    <Col md="6" lg="6">
                                                                        <div className="form-group event-group">
                                                                            <label>Link Validity Period</label>
                                                                            <IntervalField 
                                                                                onChange= {
                                                                                    (value) => {
                                                                                        handleChange({
                                                                                            target: { name: "link_expiration_period", value }
                                                                                        });
                                                                                    }
                                                                                }
                                                                                label = "days"
                                                                                interval = { 1 }
                                                                                defaultValue = { 0 }
                                                                            />
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col md="12" lg="12">
                                                                        {
                                                                            (invites_list || []).map((list, index) => {
                                                                                return (
                                                                                    <InvitesList index = { index } data = { list } onChange = { this.onChange }/>
                                                                                )
                                                                            })
                                                                        }
                                                                    </Col>
                                                                    <Col md="4" lg="4">
                                                                        <Button type="button" className="btn btn-primary" onClick = { this.addInvitee }> 
                                                                            Add Invitte
                                                                        </Button>
                                                                    </Col>
                                                                </Row>    
                                                                <Row>
                                                                    <Col md="12" lg="12">
                                                                        <Button type="submit" className="mt-5 btn btn-app" disabled = { isLoading }>
                                                                            { isLoading ? "Saving..." : "Finish"} 
                                                                        </Button>
                                                                    </Col>
                                                                </Row>
                                                                { errorMessage !== "" && <Alert color="danger" className="mt-4 text-center p-10">
                                                                    { errorMessage }
                                                                </Alert> }
                                                            </Col>
                                                        </Row>
                                                    </Form>
                                                )
                                            }}
                                        </Formik>                
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
    
        )
    }
}


export default connect(null, {
    saveAdHocEvent
})(AddAdHocComponent);