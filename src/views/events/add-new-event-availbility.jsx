import React, { Component } from 'react';
import { Formik, Form } from "formik";
import { connect } from 'react-redux';
import Select from 'react-select';
import Tooltip from './Components/Common/ToolTip';
import { getEventStaffList, getVenues } from '../../actions/eventActions';
import { Row, Col, Button, FormGroup,  TabContent, TabPane, Nav, Input, NavItem, NavLink, } from 'reactstrap';
import SidebarProgress from './Components/Sidebar/sidebar-progress';
import classnames from 'classnames';
import TextEditor from './Components/Common/TextEditorField';
import TimeSelectorField from './Components/Common/TimeSelectorField';
// import EventAssignment from './Components/Common/EventAssignment';
import NumberField from './Components/Common/NumberField';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
import EventAvailbilityComponent from './Components/Common/Event-Availbility-Component';
import moment from 'moment';

let initialValues = {
    event_duration_in_minutes: 5,
    invitee_set_duration_status: "D",
    is_time_block: "D",
    event_internal_notes: "",
    max_event_per_week: 0,
    max_event_per_day: 0,
    buffer_before_event_minutes: 0,
    max_scheduling_notice_minutes: 0,
    min_scheduling_notice_minutes: 0,
    buffer_after_event_minutes: 0,
    staff_assignment_type: "",
    staff_choose: "",
    event_valid: "",
    event_valid_period: "",
    staff_assignment_method: "",
    staffs: []
}


class AddNewEventAvailability extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: '1',
            staff: [],
            selectedStaff: []
        }
    }

    componentDidMount () {
        const { getEventStaffList: getLocalStaff } = this.props || {};
        const businessId = localStorage.getItem('businessId');
        getLocalStaff({
            data: {
                businessId
            },
            onSuccess: (data) => {
                this.setState({
                    staff: data
                })
            },
            onError: (error) => {
                console.log({
                    error
                })
            } 
        })
    }

    toggle = tab => {
        const { activeTab } = this.state;
        if(activeTab !== tab) {
            this.setState({
                activeTab: tab
            })
        };

    }

    transformValue = (options) => {
        let values = [];
        if ((options || []).length > 0) {
            values = (options || []).map((option) => {            
                let { first_name, id, last_name } = option || {};

                const name = first_name+' '+last_name;
                return {
                    ...option,
                    label: name,
                    value: id
                }
            })
        }

        return values;

    }
    render() {
        const { activeTab, staff, selectedStaff } = this.state;
        const businessId = localStorage.getItem('businessId');
        return (
            <div className="create-event-wrapper">
                <div className="create-event-container">
                    <Row>
                        <Col md="9" lg="9">
                            <div className="event-card">
                                <div className="event-card-head">
                                    <h3 className="event-title">Availability</h3>
                                </div>
                                <Formik
                                    // validationSchema={validation}
                                    initialValues={initialValues}
                                    onSubmit={(data) => {
                                        console.log({
                                            data
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
                                                        <Col sm="12" md="12" lg="12">
                                                            <Nav tabs>
                                                                <NavItem>
                                                                    <NavLink
                                                                        className={classnames({ active: activeTab === '1' })}
                                                                        onClick={() => { this.toggle('1'); }}
                                                                    >
                                                                        Event Duration
                                                                    </NavLink>
                                                                </NavItem>
                                                                <NavItem>
                                                                    <NavLink
                                                                        className={classnames({ active: activeTab === '2' })}
                                                                        onClick={() => { this.toggle('2'); }}
                                                                    >
                                                                        Advanced
                                                                    </NavLink>
                                                                </NavItem>
                                                            </Nav> 
                                                            <TabContent activeTab={activeTab}>
                                                                <TabPane tabId="1">
                                                                    <Row>
                                                                        <Col sm="12" md="12" lg="12">
                                                                            <div className="event-field-group">
                                                                                <Row>
                                                                                    <Col md="6" lg="6">
                                                                                        <div className="form-group event-form-group">
                                                                                            <label>**Options are in Minutes</label>
                                                                                            <TimeSelectorField defaultValue={ values.event_duration_in_minutes } onChange = { (value) => {
                                                                                                handleChange({
                                                                                                    target: { name: "event_duration_in_minutes", value }
                                                                                                });
                                                                                            }}/>
                                                                                        </div>
                                                                                    </Col>
                                                                                    <Col md="6" lg="6">
                                                                                        <FormGroup tag="fieldset" className="event-form-group ">
                                                                                            <label>Time block this event</label>
                                                                                            <Row>
                                                                                                <Col md="4" lg="4">
                                                                                                    <div className="event-form-check">
                                                                                                        <input type="radio" id="input-1" name="is_time_block" value="E" onChange = { ({ target }) => {
                                                                                                            const { name, value } = target || {};
                                                                                                            handleChange({
                                                                                                                target: {
                                                                                                                    name,
                                                                                                                    value
                                                                                                                }
                                                                                                            })
                                                                                                        }}></input>
                                                                                                        <label htmlFor="input-1">
                                                                                                            <span></span>
                                                                                                            Yes
                                                                                                        </label>
                                                                                                        
                                                                                                    </div>
                                                                                                </Col>
                                                                                                <Col md="4" lg="4">
                                                                                                    <div className="event-form-check">
                                                                                                        <input type="radio" id="input-2" name="is_time_block" value="D" onChange = { ({ target }) => {
                                                                                                            const { name, value } = target || {};
                                                                                                            handleChange({
                                                                                                                target: {
                                                                                                                    name,
                                                                                                                    value
                                                                                                                }
                                                                                                            })
                                                                                                        }}></input>
                                                                                                        <label htmlFor="input-2">
                                                                                                            <span></span>
                                                                                                            No
                                                                                                        </label>
                                                                                                        
                                                                                                    </div>
                                                                                                </Col>
                                                                                            </Row>
                                                                                            
                                                                                                
                                                                                        </FormGroup> 
                                                                                    </Col>
                                                                                </Row>   
                                                                                <Row>
                                                                                    <Col md="6" lg="6">
                                                                                        <FormGroup tag="fieldset" className="event-form-group ">
                                                                                            <Row>
                                                                                                <Col md="12" lg="12">
                                                                                                    <div className="event-form-check">
                                                                                                        <input 
                                                                                                            type="checkbox"
                                                                                                            id="input-3"
                                                                                                            name="invitee_set_duration_status"
                                                                                                            value={ values.invitee_set_duration_status } 
                                                                                                            checked = { values.invitee_set_duration_status === "E" }
                                                                                                            onChange = { ({ target }) => {
                                                                                                                const { value, name } = target || {};

                                                                                                                let val = "D";

                                                                                                                if(value === "D") {
                                                                                                                    val = "E";
                                                                                                                }

                                                                                                                handleChange({
                                                                                                                    target: {
                                                                                                                        name,
                                                                                                                        value: val
                                                                                                                    }
                                                                                                                })
                                                                                                            }}
                                                                                                        ></input>
                                                                                                        <label htmlFor="input-3">
                                                                                                            <span></span>
                                                                                                            Let Invitee Set Event Duration.
                                                                                                        </label>
                                                                                                        
                                                                                                    </div>
                                                                                                </Col>
                                                                                            </Row>
                                                                                        </FormGroup>
                                                                                    </Col>
                                                                                </Row> 
                                                                            </div>
                                                                        </Col>
                                                                    </Row>
                                                                </TabPane>
                                                                <TabPane tabId="2">
                                                                    <Row>
                                                                        <Col sm="12" md="12" lg="12">
                                                                            <div className="event-field-group">
                                                                                <Row>
                                                                                    <Col md="3">
                                                                                        <div className="form-group">
                                                                                            <label>Minimum Scheduling Notice</label>
                                                                                            <NumberField
                                                                                                name="min_scheduling_notice_minutes"
                                                                                                defaultValue={ values.min_scheduling_notice_minutes }
                                                                                                onChange= { (value) => {
                                                                                                    handleChange({
                                                                                                        target: { name: "min_scheduling_notice_minutes", value }
                                                                                                    });
                                                                                                }} 
                                                                                            />
                                                                                        </div> 
                                                                                    </Col>
                                                                                    <Col md="3">
                                                                                        <div className="form-group">
                                                                                            <label>Buffer Before The Event</label>
                                                                                            <NumberField
                                                                                                name="buffer_before_event_minutes"
                                                                                                defaultValue={ values.buffer_before_event_minutes }
                                                                                                onChange= { (value) => {
                                                                                                    handleChange({
                                                                                                        target: { name: "buffer_before_event_minutes", value }
                                                                                                    });
                                                                                                }} 
                                                                                            />
                                                                                        </div> 
                                                                                    </Col>
                                                                                    <Col md="3">
                                                                                        <div className="form-group">
                                                                                            <label>Maximum Event Per Day</label>
                                                                                            <NumberField 
                                                                                                name="max_event_per_day"
                                                                                                defaultValue={ values.max_event_per_day }
                                                                                                onChange= { (value) => {
                                                                                                    handleChange({
                                                                                                        target: { name: "max_event_per_day", value }
                                                                                                    });
                                                                                                }} 
                                                                                            />
                                                                                        </div> 
                                                                                    </Col>
                                                                                </Row>
                                                                                <Row>
                                                                                    <Col md="3">
                                                                                        <div className="form-group">
                                                                                            <label>Maximum Scheduling Notice</label>
                                                                                            <NumberField 
                                                                                                name="max_scheduling_notice_minutes"
                                                                                                defaultValue={ values.max_scheduling_notice_minutes }
                                                                                                onChange= { (value) => {
                                                                                                    handleChange({
                                                                                                        target: { name: "max_scheduling_notice_minutes", value }
                                                                                                    });
                                                                                                }}
                                                                                            />
                                                                                        </div> 
                                                                                    </Col>
                                                                                    <Col md="3">
                                                                                        <div className="form-group">
                                                                                            <label>Buffer After The Event</label>
                                                                                            <NumberField 
                                                                                                name="buffer_after_event_minutes"
                                                                                                defaultValue={ values.buffer_after_event_minutes }
                                                                                                onChange= { (value) => {
                                                                                                    handleChange({
                                                                                                        target: { name: "buffer_after_event_minutes", value }
                                                                                                    });
                                                                                                }}
                                                                                            />
                                                                                        </div> 
                                                                                    </Col>
                                                                                    <Col md="3">
                                                                                        <div className="form-group">
                                                                                            <label>Maximum Event Per Week</label>
                                                                                            <NumberField 
                                                                                                name="max_event_per_week"
                                                                                                defaultValue={ values.max_event_per_week }
                                                                                                onChange= { (value) => {
                                                                                                    handleChange({
                                                                                                        target: { name: "max_event_per_week", value }
                                                                                                    });
                                                                                                }}
                                                                                            />
                                                                                        </div> 
                                                                                    </Col>
                                                                                </Row>
                                                                            </div> 
                                                                        </Col>
                                                                    </Row>
                                                                </TabPane>
                                                            </TabContent>       
                                                            <div className="event-field-group">
                                                                <Row>
                                                                    <Col md="6" lg="6">
                                                                        <FormGroup tag="fieldset" className="event-form-group ">
                                                                            <label>Staff Assignment</label>
                                                                            <div className="event-form-check">
                                                                                <input 
                                                                                    type="radio"
                                                                                    id="input-4"
                                                                                    name="staff_assignment_type"
                                                                                    value = "1"
                                                                                    onChange = { ({ target }) => {
                                                                                        const { name, value } = target || {};
                                                                                        handleChange({
                                                                                            target: {
                                                                                                name,
                                                                                                value
                                                                                            }
                                                                                        });

                                                                                        
                                                                                    }}
                                                                                ></input>
                                                                                <label htmlFor="input-4">
                                                                                    <span></span>
                                                                                    My Event
                                                                                </label>
                                                                                
                                                                            </div>
                                                                            <div className="event-form-check">
                                                                                <input 
                                                                                    type="radio"
                                                                                    id="input-5"
                                                                                    name="staff_assignment_type"
                                                                                    value = "2"
                                                                                    onChange = { ({ target }) => {
                                                                                        const { name, value } = target || {};
                                                                                        handleChange({
                                                                                            target: {
                                                                                                name,
                                                                                                value
                                                                                            }
                                                                                        })
                                                                                    }}
                                                                                ></input>
                                                                                <label htmlFor="input-5">
                                                                                    <span></span>
                                                                                    Assign it To A Staff
                                                                                </label>
                                                                                
                                                                            </div>

                                                                            <div className="staff_assignment ml-2">
                                                                                <Row>
                                                                                    <Col md="8" lg="8">
                                                                                        <div className="form-group event-form-group">
                                                                                            
                                                                                            <Select
                                                                                                options = { this.transformValue(staff) }
                                                                                                isMulti
                                                                                                onChange = { (value) => {
                                                                                                    const { id } = value || {};
                                                                                                    
                                                                                                    


                                                                                                    handleChange({
                                                                                                        target: {
                                                                                                            name: 'staffs',
                                                                                                            value: id
                                                                                                        }
                                                                                                    });

                                                                                                    this.setState({
                                                                                                        selectedStaff: [...selectedStaff, value]
                                                                                                    })

                                                                                                }}
                                                                                            >

                                                                                            </Select>
                                                                                        </div>
                                                                                    </Col>
                                                                                    
                                                                                </Row>
                                                                                <Row className="mt-1">
                                                                                    <Col md="12" lg="12">
                                                                                        <div className="event-form-check">
                                                                                            <input 
                                                                                                type="checkbox"
                                                                                                id="input-27"
                                                                                                name="staff_choose"
                                                                                                value="allow_invitee" 
                                                                                                checked = { values.staff_choose === "allow_invitee" }
                                                                                                onChange = { ({ target }) => {
                                                                                                    const { value, name } = target || {};
                                                                                                    handleChange({
                                                                                                        target: {
                                                                                                            name,
                                                                                                            value
                                                                                                        }
                                                                                                    })
                                                                                                }}
                                                                                            ></input>
                                                                                            <label htmlFor="input-27">
                                                                                                <span></span>
                                                                                                Allow Attendee To Select Staff
                                                                                            </label>
                                                                                            
                                                                                        </div>
                                                                                    </Col>
                                                                                </Row>
                                                                                <Row className="">
                                                                                    <Col md="12" lg="12">
                                                                                        <div className="event-form-check">
                                                                                            <input 
                                                                                                type="checkbox"
                                                                                                id="input-28"
                                                                                                name="staff_choose"
                                                                                                value="random_choose" 
                                                                                                checked = { values.staff_choose === "random_choose" }
                                                                                                onChange = { ({ target }) => {
                                                                                                    const { value, name } = target || {};
                                                                                                    handleChange({
                                                                                                        target: {
                                                                                                            name,
                                                                                                            value
                                                                                                        }
                                                                                                    })
                                                                                                }}
                                                                                            ></input>
                                                                                            <label htmlFor="input-28">
                                                                                                <span></span>
                                                                                                Select Staff (Automatic Assignment)
                                                                                            </label>
                                                                                            
                                                                                            
                                                                                            
                                                                                        </div>
                                                                                        <Row className="ml-1">
                                                                                            <Col md="6" lg="6">
                                                                                                <div className="event-form-check">
                                                                                                    <input 
                                                                                                        type="checkbox"
                                                                                                        id="input-30"
                                                                                                        name="staff_assignment_method"
                                                                                                        value="round-robin" 
                                                                                                        checked = { values.staff_assignment_method === "round-robin" }
                                                                                                        onChange = { ({ target }) => {
                                                                                                            const { value, name } = target || {};
                                                                                                            handleChange({
                                                                                                                target: {
                                                                                                                    name,
                                                                                                                    value
                                                                                                                }
                                                                                                            })
                                                                                                        }}
                                                                                                    ></input>
                                                                                                    <label htmlFor="input-30">
                                                                                                        <span></span>
                                                                                                        Round-Robin
                                                                                                    </label>
                                                                                                </div>
                                                                                            </Col>
                                                                                            <Col md="6" lg="6">
                                                                                                <div className="event-form-check">
                                                                                                    <input 
                                                                                                        type="checkbox"
                                                                                                        id="input-31"
                                                                                                        name="staff_assignment_method"
                                                                                                        value="event-rotation" 
                                                                                                        checked = { values.staff_assignment_method === "event-rotation" }
                                                                                                        onChange = { ({ target }) => {
                                                                                                            const { value, name } = target || {};
                                                                                                            handleChange({
                                                                                                                target: {
                                                                                                                    name,
                                                                                                                    value
                                                                                                                }
                                                                                                            })
                                                                                                        }}
                                                                                                    ></input>
                                                                                                    <label htmlFor="input-31">
                                                                                                        <span></span>
                                                                                                        Event Rotation
                                                                                                    </label>
                                                                                                </div>
                                                                                            </Col>
                                                                                        </Row>
                                                                                    </Col>
                                                                                </Row>
                                                                            </div>
                                                                            
                                                                        </FormGroup>
                                                                    </Col>
                                                                    <Col md="6" lg="6">
                                                                        <div className="form-group event-form-group">
                                                                            <label>Event Internal Notes:</label>
                                                                            {/* <Input 
                                                                                className="form-control"
                                                                                type="textarea" 
                                                                                placeholder="Event Internal Notes"
                                                                                name="event_internal_notes"
                                                                                value = { values.event_internal_notes } 
                                                                                onChange = {({ target }) => {
                                                                                    const { name, value } = target || {};
                                                                                    handleChange({
                                                                                        target: { name, value }
                                                                                    });
                                                                                }} 
                                                                                id="venueNotes" 
                                                                            /> */}
                                                                            <TextEditor name="event_internal_notes" onChange = {({ target }) => {
                                                                                const { name, value } = target || {};
                                                                                handleChange({
                                                                                    target: { name, value }
                                                                                });
                                                                            }} />
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                            </div>
                                                            <div className="event-field-group">
                                                                <Row>
                                                                    <Col md="12" lg="12">
                                                                        <FormGroup tag="fieldset" className="event-form-group ">
                                                                            <label>Event Validity</label>
                                                                            <Row>
                                                                                <Col md="3" lg="3">
                                                                                    <div className="event-form-check">
                                                                                        <input type="radio" id="input-16" value="indefinately" name="event_valid" onChange = {
                                                                                            ({ target }) => {
                                                                                                const { name, value } = target || {};
                                                                                                handleChange({
                                                                                                    target: { name, value }
                                                                                                });
                                                                                            }
                                                                                        }></input>
                                                                                        <label htmlFor="input-16">
                                                                                            <span></span>
                                                                                            Indefinitely
                                                                                        </label>
                                                                                        
                                                                                    </div>
                                                                                </Col>
                                                                                <Col md="4" lg="4">
                                                                                    <div className="event-field-inline">
                                                                                        <div className="event-form-check ">
                                                                                            <input type="radio" id="input-17" value="valid_over" name="event_valid" onChange = {
                                                                                            ({ target }) => {
                                                                                                const { name, value } = target || {};
                                                                                                handleChange({
                                                                                                    target: { name, value }
                                                                                                });
                                                                                            }
                                                                                        }></input>
                                                                                            <label htmlFor="input-17">
                                                                                                <span></span>
                                                                                                Valid Over
                                                                                            </label>
                                                                                            
                                                                                        </div>
                                                                                        <div className="input-field">
                                                                                            <input type="number" placeholder="15 Days" name="valid_date_range" onChange = {({ target }) => {
                                                                                                const { name, value} = target || {};
                                                                                                handleChange({
                                                                                                    target: { name, value }
                                                                                                });
                                                                                            }} />
                                                                                        </div>
                                                                                    </div>
                                                                                    

                                                                                </Col>
                                                                                <Col md="5" lg="5">
                                                                                    <div className="event-field-inline-range">
                                                                                        <div className="event-form-check">
                                                                                            <input type="radio" id="input-18" value="valid_date_range" name="event_valid" onChange = {
                                                                                            ({ target }) => {
                                                                                                const { name, value } = target || {};
                                                                                                handleChange({
                                                                                                    target: { name, value }
                                                                                                });
                                                                                            }
                                                                                        }></input>
                                                                                            <label htmlFor="input-18">
                                                                                                <span></span>
                                                                                                Over Date Range
                                                                                            </label>
                                                                                            
                                                                                        </div>
                                                                                        { values.event_valid === "valid_date_range" && <div className="range-field">
                                                                                            <DateRangePicker
                                                                                                initialSettings={{ startDate: moment(), endDate: moment().add(14, 'd') }}
                                                                                                onCallback= { (start, end, label) => {
                                                                                                    const startDate = moment(start).format('DD/MM/yyyy');
                                                                                                    const endDate = moment(end).format('DD/MM/yyyy');
                                                                                                    
                                                                                                    handleChange({
                                                                                                        target: { name: "event_valid_period", value: startDate + '-'+ endDate  }
                                                                                                    });
                                                                                                }}
                                                                                                >
                                                                                                <input type="text" />
                                                                                            </DateRangePicker>
                                                                                        </div> }
                                                                                    </div>
                                                                                    
                                                                                </Col>
                                                                            </Row>
                                                                            
                                                                                
                                                                        </FormGroup> 
                                                                    </Col> 
                                                                </Row>
                                                            </div>
                                                            <div className="event-field-group border-zero">
                                                                
                                                                <div className="availbility-container">
                                                                    <EventAvailbilityComponent businessId={ businessId } errors={ errors } touched={ touched } staff = { selectedStaff }/>
                                                                </div>
                                                                
                                                            </div>
                                                        </Col>
                                                    </Row>                 
                                                </div>
                                                <div className="event-card-footer">
                                                    <Row>
                                                        <Col md="6" lg="6">
                                                            <Button className="btn btn-outline">
                                                                Go Back
                                                            </Button>
                                                        </Col>
                                                        <Col md="6" lg="6">
                                                            <Button className="btn btn-app">
                                                                Next Step
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Form>
                                        )
                                    }}
                                </Formik>            
                            </div>
                        </Col>
                        <Col md="3" lg="3">
                            <SidebarProgress/>
                        </Col>
                    </Row>
                </div>
            </div>                    
        )
    }
}

export default connect(null, {
    getEventStaffList,
    getVenues
})(AddNewEventAvailability);