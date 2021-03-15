import React, { Component, Fragment } from 'react';
import FormField from "./FormField";
import { Row, Col, Button, FormGroup,  TabContent, TabPane, Nav, NavItem, NavLink, } from 'reactstrap';
import classnames from 'classnames';
import FullCalendarComponent from './FullCalendarComponent';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import EventAvailbilityModal from '../Modals/EventAvailbilityModal';
import EventSchedulingModal from '../Modals/EventSchedulingModal';
import AddNewEventAdvanced from '../../add-new-event-advanced';
// import timeGridPlugin from "@fullcalendar/timegrid";

// import "@fullcalendar/core/main.css";
// import "@fullcalendar/daygrid/main.css";
// import "@fullcalendar/timegrid/main.css";
// import 'react-calendar/dist/Calendar.css';

class EventAssignment extends Component {
    calendarComponentRef = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            activeTab: '3',
            value: new Date(),
            calendarWeekends: true,
            calendarEvents: [
            // initial event data
            { title: "Event Now", start: new Date() }
            ]
        }
    }

    toggle = tab => {
        const { activeTab } = this.state;
        if(activeTab !== tab) {
            this.setState({
                activeTab: tab
            })
        };

    }

    formatEvents = () => {
        console.log('....');
    }

    onCalendarChange = (value) => {
        console.log('value', value)
    } 

    render () {
        const { activeTab, value } = this.state;
        const { values, errors, touched  } = this.props;
        return (
            <Fragment>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '1' })}
                            onClick={() => { this.toggle('1'); }}
                        >
                            Daily
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '2' })}
                            onClick={() => { this.toggle('2'); }}
                        >
                            Weekly
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '3' })}
                            onClick={() => { this.toggle('3'); }}
                        >
                            Monthly
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                        Daily
                    </TabPane>
                    <TabPane tabId="2">
                        Weekly
                    </TabPane>
                    <TabPane tabId="3">
                        <Row>
                        <Col md="6" lg="6">
                                <FormField
                                    showLabel={ false }
                                    placeholder="Year"
                                    type="select"
                                    name="type"
                                    label="Year"
                                    errors={errors}
                                    touched={touched}
                                    
                                    options={[
                                        {
                                        value: 0,
                                        label: "2020",
                                        },
                                        {
                                        value: 1,
                                        label: "2019",
                                        },
                                    ]}
                                />
                            </Col>
                            <Col md="6" lg="6">
                                <FormField
                                    showLabel={ false }
                                    placeholder="Month"
                                    type="select"
                                    name="type"
                                    label="Month"
                                    errors={errors}
                                    touched={touched}
                                    
                                    options={[
                                        {
                                        value: 12,
                                        label: "December",
                                        },
                                        {
                                        value: 11,
                                        label: "November",
                                        },
                                    ]}
                                />
                            </Col>
                            

                        </Row>

                        <div className="full-calendar-wrapper mt-5">
                            {/* <FullCalendarComponent/>  */}
                            <FullCalendar
                                plugins={[ dayGridPlugin ]}
                                initialView="dayGridMonth"
                            />
                        </div>
                    </TabPane>
                </TabContent>
                <EventAvailbilityModal></EventAvailbilityModal>
                <EventSchedulingModal/>
            </Fragment>
        )
    }
}


export default EventAssignment;