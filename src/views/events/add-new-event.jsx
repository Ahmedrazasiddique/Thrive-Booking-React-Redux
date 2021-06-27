import React from 'react';
import { connect } from "react-redux";
import { Row, Col, InputGroup, InputGroupAddon, InputGroupText, Input, Button, Alert } from 'reactstrap';
import { getEventTypes, getVenues, saveEventType, saveAdHocEvent, getEventTypeDetails } from '../../actions/eventActions';
import SidebarProgress from './Components/Sidebar/sidebar-progress';
import FormField from "./Components/Common/FormField";
import EventTypeModal from './Components/Modals/EventTypeModal';
import NumberField from './Components/Common/NumberField';
import { Formik, Form } from "formik";
import ToolTip from './Components/Common/ToolTip';
import Loader from '../../components/Loader/Loader';
import * as Yup from "yup";
import { Component } from 'react';
import qs from 'query-string'

const validation = Yup.object().shape({
    event_name: Yup.string().required("Event Name is required."),
    event_format_id: Yup.string().required("Event Type is required."),
    venue_id: Yup.string().required("Venue is required."),
    event_url: Yup.string().required("Event Url is required.")
});    

let initialValues = {
    event_name: "",
    no_of_attendies: 1,
    event_format_id: 1,
    venue_id: "",
    event_url: "",
    venue_location: "",
    venue_location_notes: "",
    venue_location_status: "",
    call_my_invitee_status: "no",
    invitee_call_me_status: "no",
    host_phone_no: "",
    venue_other_notes: "",
    venue_other_display_status: ""
}

class AddNewEvent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            errorMessage: "",
            eventTypes: [
                {
                    "label": "One-on-One",
                    "value": 1
                },
                {
                    "label": "Group",
                    "value": 2
                }
            ],
            isOpen: false,
            venues: [],
            pageLoading: false, 
            isEdit: false,
            eventId: ""
        }
    }
    componentDidMount() {
        const { state, route, getEventTypeDetails } = this.props;

        const { match } = route || {};

        const { params } = match || {};
        const { id } = params || {};
        
        // get event details

        if(id) {
            this.setState({
                pageLoading: true
            });

            const _this = this;

            getEventTypeDetails({
                data: {
                    id
                },
                onSuccess: function(details) {
                    initialValues = {
                        ...initialValues,
                        ...details
                    }


                    console.log({
                        initialValues
                    });

                   _this.setState({
                       pageLoading: false,
                       isEdit: true,
                       eventId: id
                   })
                },
                onError: function(error) {
                    console.error(error);
                }
            }) 
        }

        // veneues 

        Promise.all([
            // this.getEvents(),
            this.getVenues(),
          ])
        .then((value) => {
            let data = [];
            value.map((e, i) => {
                data.push(e);
            });
    
            this.setState({
                // eventTypes: data[0],
                venues: data[0]
            });
        })
        .catch((error) => {
            console.log(error);
        });
    }


    getVenues = () => {
        return new Promise((resolve) => {
            const { getVenues: getLocalVenues } = this.props;
            getLocalVenues({
              onSuccess: (data) => {
                resolve(data);
              },
            });
        });
    }


    transformValue = (options, key) => {
        let values = [];
        if ((options || []).length > 0) {
            values = (options || []).map((option) => {

            
                let { name, id } = option || {};

                if(key === "eventTypes") {
                    const { event_type } = option || {};
                    name = event_type;
                }


                if(key === "venues") {
                    const { venue } = option || {};
                    name = venue;
                }


                return {
                    ...option,
                    label: name,
                    value: id
                }
            })
        }

        return values;

    }

    // getEvents = () => {
    //     return new Promise((resolve) => {
    //         const { getEventTypes: getLocalEvents } = this.props;
    //         getLocalEvents({
    //           onSuccess: (data) => {
    //             resolve(data);
    //           },
    //         });
    //     });
    // }

    toggleModal = () => {
        const { isOpen } = this.state;
        this.setState({
            isOpen: !isOpen
        })
    }


    render() {

        
        const { route } = this.props;
        const { location } = route || {};
        const { search } = location || {};

        const locationParse = qs.parse(search);

        const { type } = locationParse || {};

        const { eventTypes, venues, errorMessage, isLoading, pageLoading, isOpen } = this.state;
        console.log({
            pageLoading
        })
        return (
            <div className="create-event-wrapper">
                <div className="create-event-container">
                    <Row>
                        <Col md="9" lg="9">
                            <div className="event-card">
                                <div className="event-card-head">
                                    <h3 className="event-title">Event Type</h3>
                                </div>
                            { pageLoading ? <Loader isShowLoader={true}/> :    
                            <Formik
                                    validationSchema={validation}
                                    initialValues={initialValues}
                                    enableReinitialize
                                    onSubmit={(data) => {
                                        const { saveEventType } = this.props;
                                        const bussinessId = localStorage.getItem('businessId');

                                        const { eventId, isEdit } = this.state || {};
                                        
                                        const { event_name, venue_location, venue_location_notes, venue_location_status,  no_of_attendies, event_format_id, venue_id, event_url, invitee_call_status, host_phone_no } = data || {};

                                        if(parseInt(venue_id) === 1) {
                                            // const { venue_location, venue_location_notes, venue_location_status} = values || {};
                                
                                            if(venue_location === "") {
                                                alert("Venue locatation is required.");
                                                return;
                                            }
                                
                                            if(venue_location_notes === "") {
                                                alert("Venue locatation notes is required.");
                                                return;
                                            }
                                
                                            if(venue_location_status === "") {
                                                alert("Venue locatation status is required.");
                                                return;
                                            }
                                        }
                                
                                        if(parseInt(venue_id) === 2) {
                                            // const { invitee_call_status, host_phone_no } = values || {};
                                
                                            if(invitee_call_status === "") {
                                                alert("Invitee call status is required.");
                                                return;
                                            }
                                
                                            if(invitee_call_status === "invitee" && host_phone_no === "") {
                                                alert("Host phone number is required.");
                                                return;
                                            }
                                        }
                                        
                                        let defaultValue = {
                                            event_name,
                                            no_of_attendies,
                                            event_format_id,
                                            venue_id,
                                            event_url,
                                            business_id: bussinessId
                                        } 



                                        if( venue_id === 1 || venue_id === "1") {
                                            defaultValue = {
                                                ...defaultValue,
                                                venue_location,
                                                venue_location_notes,
                                                venue_location_status
                                            }
                                        }

                                        if(venue_id === "2" || venue_id === 2) {
                                            defaultValue = {
                                                ...defaultValue,
                                                invitee_call_status,
                                                host_phone_no
                                            }
                                        }

                                        this.setState({
                                            isLoading: true
                                        })
                                       

                                        saveEventType({
                                            data: defaultValue,
                                            eventId,
                                            onSuccess: (eventId) => { 
                                                const { route } = this.props;
                                                const { history } = route || {};
                                                history.push(`/admin/events/create/${eventId}/step-2?type=${type}`);
                                            },
                                            onError: (message) => {
                                                this.setState({
                                                    errorMessage: message,
                                                    isLoading: false
                                                })
                                                console.log('error handler');
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
                                                <div className="event-card-body">
                                                <Row>
                                                        <Col md="6" lg="6">
                                                            <FormField
                                                                type="text"
                                                                name="event_name"
                                                                label="Event Name *"
                                                                placeholder="Name"
                                                                showLabel={true}
                                                                value={values.event_name}
                                                                errors={errors}
                                                                touched={touched}
                                                                onChange = {({ target }) => {
                                                                    

                                                                    const { value } = target;
                                                                    const url = value.replace(/\s/g, '-');

                                                                    handleChange({
                                                                        target: { name: "event_name", value }
                                                                    });

                                                                    handleChange({
                                                                        target: { name: "event_url", value: url.toLowerCase()}
                                                                    })
                                                                }}
                                                            />
                                                        </Col>
                                                        <Col md="6" lg="6">
                                                            <FormField
                                                                showLabel
                                                                placeholder="Select Event Type"
                                                                type="select"
                                                                name="event_format_id"
                                                                label="Select Event Format *"
                                                                errors={errors}
                                                                touched={touched}
                                                                value={ values.event_format_id }
                                                                options={ eventTypes }
                                                            />
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                       { values.event_format_id === "2" &&  <Col md="4" lg="4">
                                                            <div className="form-group">
                                                                <label>
                                                                    No. of Attendees *
                                                                    <ToolTip/>
                                                                </label>
                                                                <NumberField 
                                                                    defaultValue = { values.no_of_attendies }
                                                                    onChange = {(value) => {
                                                                        handleChange({
                                                                            target: { name: "no_of_attendies", value }
                                                                        });
                                                                    }}
                                                                />
                                                            </div>    
                                                        </Col> }
                                                        <Col md="8" lg="8">
                                                            <div className="form-group form-field-group">
                                                                <label>
                                                                    Event Url *
                                                                    <ToolTip/>
                                                                </label>
                                                                <InputGroup>
                                                                    <InputGroupAddon addonType="prepend">
                                                                    <InputGroupText>https://thriveBooking.com/company_name</InputGroupText>
                                                                    </InputGroupAddon>
                                                                    <Input placeholder="Event Name" name="event_url" onChange = { ({ target }) => {
                                                                        const { value, name } = target || {};
                                                                        handleChange({
                                                                            target: { name, value }
                                                                        });
                                                                    }}  value={ values.event_url}/>
                                                                </InputGroup>
                                                                {errors['event_url'] && touched['event_url'] && (
                                                                    <div className="form-field text-danger"> { errors['event_url'] } </div>
                                                                ) }
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col md="6" lg="6">
                                                            <FormField
                                                                showLabel
                                                                placeholder="Select Venue"
                                                                type="select"
                                                                name="venue_id"
                                                                label="Select Venue *"
                                                                errors={errors}
                                                                touched={touched}
                                                                value={ values.venue_id }
                                                                options={this.transformValue(venues, 'venues')}
                                                                onChange = { ({ target }) => {
                                                                    const { isOpen } = this.state;
                                                                    const { name, value }  = target || {};
                                                                    handleChange({
                                                                        target: { name, value }
                                                                    });

                                                                    this.setState({
                                                                        isOpen: true
                                                                    })

                                                                }}
                                                            />
                                                        </Col>
                                                        <Col md="4" lg="4">
                                                            <EventTypeModal isOpen = { isOpen } touched = { touched } formValues={ values } errors = { errors } defaultValue={ values.venue_id } onChange = { (name, value) => {
                                                                handleChange({
                                                                    target: { name, value }
                                                                })
                                                            } } venues = { this.transformValue(venues, 'venues') } onToggle = { this.toggleModal }/>
                                                        </Col>
                                                    </Row>
                                                </div>
                                                <div className="event-card-footer">
                                                    <Row>
                                                        <Col md="6" lg="6">
                                                            <Button className="btn btn-outline">
                                                                Save as Draft
                                                            </Button>
                                                        </Col>
                                                        <Col md="6" lg="6">
                                                            <Button type="submit" className="btn btn-app" disabled = { isLoading }>
                                                               { isLoading ? "Saving..." : "Next Step"} 
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                    { errorMessage !== "" && <Alert color="danger" className="mt-4 text-center p-10">
                                                        { errorMessage }
                                                    </Alert> }
                                                </div>
                                                
                                            </Form>
                                        )
                                    } }
                                </Formik>  }        
                            </div>

                        </Col>
                        <Col md="3" lg="3">
                            <SidebarProgress props = { this.props }/>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }

  
    
}

export default connect(null, {
    getEventTypes,
    getVenues,
    getEventTypeDetails,
    saveEventType, 
    saveAdHocEvent
})(AddNewEvent);
