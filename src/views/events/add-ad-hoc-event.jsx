import React, { Component } from 'react';
import { Row, Col, Button, Alert } from 'reactstrap';
import { connect } from "react-redux";
import { saveAdHocEvent, getAdHocEventDetails } from '../../actions/eventActions';
import AdHocCalendar from './Components/Common/Ad-Hoc-Calendar';
import * as moment from 'moment';
import Loader from '../../components/Loader/Loader';
import ToolTip from './Components/Common/ToolTip';
import IntervalField from './Components/Common/IntervalField';
import TimeIntervalComponent from './Components/Common/TimeInterval';
import FormField from "./Components/Common/FormField";
import { Formik, Form } from "formik";
import * as Yup from "yup";

const validation = Yup.object().shape({
    event_title: Yup.string().required("Event Title is required"),
    start_time: Yup.string().required("Start Time is required"),
    end_time: Yup.string().required("End Time is Required"),
    first_name: Yup.string().required("First Name is Required"),
    last_name: Yup.string().required("Last Name is Required"),
    email: Yup.string().required("Email is Required"),
});    

let initialValues = {
    event_title: "",
    event_date: new Date(),
    start_time: "",
    end_time: "",
    link_expiration_period: 0,
    min_schedule_notice_in_minutes: 0,
    first_name: "",
    last_name: "",
    email: ""
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
        successMessage: "",
        pageLoading: false,
        eventId: "",
        invites_list: [
            {
                first_name: "",
                last_name: "",
                email: ""
            }
        ]
    }

    componentDidMount() {
        const { route, getAdHocEventDetails } = this.props;

        const { match } = route || {};

        const { params } = match || {};
        const { id } = params || {};

        if(id) {
            this.setState({
                pageLoading: true
            });

            const _this = this;

            getAdHocEventDetails({
                data: {
                    id
                },
                onSuccess: function(event) {
                    const { event_date, event_invitations } = event || {};
                    const { first_name, last_name, email } = event_invitations[0] || {};
                     initialValues = {
                        ...initialValues,
                        ...event,
                        event_date: new Date(event_date),
                        first_name,
                        last_name,
                        email
                        // start_time: moment(start_time).format('h:mm')
                    }


                   _this.setState({
                       pageLoading: false,
                    //    isEdit: true,
                       eventId: id
                   })
                },
                onError: function(error) {
                    console.log({
                        error
                    });
                }
            })
        }
    }

    addInvitee = () => {
        const { invites_list } = this.state;

        const new_invitees_list = [...invites_list, defaultInvitee];

        this.setState({
            invites_list: new_invitees_list
        })
    
    }
    render() {
        const { isLoading, errorMessage, successMessage, pageLoading } = this.state;
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
                                    { pageLoading ? <Loader isShowLoader={true}/> :  
                                        <Formik
                                            validationSchema={validation}
                                            initialValues={initialValues}
                                            onSubmit={(data) => {

                                                const { min_schedule_notice_in_minutes, event_date:date, link_expiration_period } = data || {};

                                                const { eventId } = this.state || {};

                                              

                                                if(parseInt(min_schedule_notice_in_minutes) === 0) {
                                                    alert("Minimum schedule notice should be greater than 0 miutes.");
                                                    return;
                                                }

                                                if(parseInt(link_expiration_period) === 0) {
                                                    alert("Link expiration perios should be greater than 0 days.");
                                                    return;
                                                }
                                                const bussinessId = localStorage.getItem('businessId')
                                                const { saveAdHocEvent } = this.props;

                                                const { first_name, last_name, email} = data || {};

                                                // const allowedFields = ['first_name', 'last_name', 'email'];

                                                // const filterData = (Object.keys(data) || []).filter((e) => allowedFields.indexOf(e) === -1);
                                                
                                                // alert(date);

                                                this.setState({
                                                    isLoading: true
                                                })
                                                saveAdHocEvent({
                                                    data: {
                                                        ...data,
                                                        event_date: moment(date).format('YYYY/MM/DD'),
                                                        event_invitations:[{ 
                                                            first_name,
                                                            last_name,
                                                            email
                                                        }],
                                                        
                                                        business_id: bussinessId,
                                                        provider_id: bussinessId
                                                    },
                                                    eventId,
                                                    onSuccess: (event) => {
                                                        const { route } = this.props;
                                                        const { history } = route || {};
                                                        this.setState({
                                                            successMessage: event,
                                                            isLoading: false
                                                        })
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
                                                                            label = "Start Time *" 
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
                                                                            label = "End Time *" 
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
                                                                            <label>
                                                                                Minimum Scheduling Notice *
                                                                                <ToolTip/>
                                                                            </label>
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
                                                                                defaultValue = { parseInt(values.link_expiration_period) }
                                                                                
                                                                            />
                                                                        </div>
                                                                    </Col>
                                                                    <Col md="6" lg="6">
                                                                        <div className="form-group event-group">
                                                                            <label>
                                                                                Link Validity Period *
                                                                                <ToolTip
                                                                                    position="left"
                                                                                />
                                                                            </label>
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
                                                                                defaultValue = { parseInt(values.link_expiration_period) }
                                                                            />
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col md="12" lg="12">
                                                                        <div className="invite-wrapper">
                                                                            <h3>Invitees</h3>
                                                                            <div className="padding-zero">
                                                                                <Row>
                                                                                    <Col md="6" lg="6">
                                                                                        <FormField
                                                                                            type="text"
                                                                                            name="first_name"
                                                                                            label="First Name *"
                                                                                            placeholder="First Name"
                                                                                            showLabel={true}
                                                                                            value={values.first_name}
                                                                                            errors={errors}
                                                                                            touched={touched}
                                                                                            
                                                                                        />

                                                                                    </Col>
                                                                                    <Col md="6" lg="6">
                                                                                        <FormField
                                                                                            type="text"
                                                                                            name="last_name"
                                                                                            label="Last Name *"
                                                                                            placeholder="Last Name"
                                                                                            showLabel={true}
                                                                                            value={values.last_name}
                                                                                            errors={errors}
                                                                                            touched={touched}
                                                                                            
                                                                                        />
                                                                                        
                                                                                    </Col>
                                                                                </Row>
                                                                                <Row>
                                                                                    <Col md="12" lg="12">
                                                                                        <FormField
                                                                                            type="email"
                                                                                            name="email"
                                                                                            label="Email *"
                                                                                            placeholder="Email"
                                                                                            showLabel={true}
                                                                                            value={values.email}
                                                                                            errors={errors}
                                                                                            touched={touched}
                                                                                            
                                                                                        />
                                                                                        
                                                                                    </Col>
                                                                                </Row>
                                                                            </div>
                                                                        </div>

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

                                                                { successMessage !== "" && <Alert color="success" className="mt-4 text-center p-10">
                                                                    { successMessage }
                                                                </Alert> }
                                                            </Col>
                                                        </Row>
                                                    </Form>
                                                )
                                            }}
                                        </Formik>                
                                    }
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
    saveAdHocEvent, 
    getAdHocEventDetails
})(AddAdHocComponent);