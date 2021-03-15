import React, { Component, Fragment } from 'react';
import { Row, Col, TabContent, TabPane, Nav, NavItem, NavLink, } from 'reactstrap';
import { connect } from 'react-redux';
import { getStaffSchedule } from '../../../../actions/eventActions';
import EventSchedulingModal from '../Modals/EventSchedulingModal';
import { Calendar, momentLocalizer, Views  } from 'react-big-calendar';
import classnames from 'classnames';
import moment from 'moment'


const localizer = momentLocalizer(moment);

class EventAvailbilityComponent extends Component {
    state = {
        activeTab: '1',
        startDate: moment().format("YYYY-MM-DD"),
        endDate: moment().add(5, 'days').format("YYYY-MM-DD"),
        events: [],
        showModal: false
    }

    toggle = tab => {
        const { activeTab } = this.state;
        if(activeTab !== tab) {
            this.setState({
                activeTab: tab
            })
        };

    }

    handleChange = ({ target }) => {
        const { value } = target || {};
        const { getStaffSchedule } = this.props || {};

        getStaffSchedule({
            data: {
                id: value,
            },
            onSuccess: (events) => {
                console.log({
                    events
                })
                const { schedule_details } = events || {};

                let schedules = this.formatSchedules(schedule_details);

                console.log({
                    schedules
                })


                this.setState({
                    events: schedules
                }, () => {
                    const { events } = this.state;
                    console.log(`after...`, {
                        events
                    })
                })

                
            },
            onError: (error) => {
                console.log({
                    error
                })
            }
        });
    }

    formatSchedules = (schedules) => {

        let newSchedules = [];
        
        (schedules || []).forEach((schedule) => {
            const { dated, schedule_availability } = schedule || {};
            if(dated) {
                const newDate = moment(dated).format('YYYY-MM-DD');
                (schedule_availability || []).forEach((scheduleDetail) => {
                    const { id ,start_time, end_time } = scheduleDetail || {};
                    const start = this.formatDate(`${newDate} ${start_time}`);
                    const end = this.formatDate(`${newDate} ${end_time}`);

                    const schedule = {
                        start,
                        end,
                        id,
                        title: `${ start_time } - ${ end_time }`
                    }

                    newSchedules.push(schedule);
                });
            }
        });

        return newSchedules;
    }

    formatDate = (date) => {
        const d = new Date(date);
        console.log({
            month: d.getMonth(),
            year: d.getFullYear(),
            day: d.getDate(),
            minutes: d.getMinutes(),
            hours: d.getHours(),
            seconds: d.getSeconds()
        });

        const month = d.getMonth();
        const year = d.getFullYear();
        const day = d.getDate();
        const minutes = d.getMinutes();
        const hours = d.getHours();
        const seconds = d.getSeconds();

        return new Date(year, month, day, hours, minutes, seconds);
    }

    handleSelect = ({ start, end }) => {
        console.log({
            start,
            end
        })

        this.setState({
            showModal: true
        })

    }

    render () {
        const { staff:selectedStaff } = this.props || {};
        const { activeTab, startDate, endDate, events:stateEvents, showModal } = this.state;
        return (
            <Fragment>
                <EventSchedulingModal isOpen = {showModal}/>
                <Row>
                    <Col md="6" lg="6">
                        <select className="form-control" onChange = { this.handleChange }>
                            <option value="">Choose Staff</option>
                            {
                                (selectedStaff || []).map((staff, index) => {
                                    
                                    const { id, first_name, last_name } = staff[0] || staff || {};
                                    return (
                                        <option value={ id } key = { index }>{ `${first_name} ${ last_name }` }</option>
                                    )
                                })
                            }
                        </select>
                    </Col>
                </Row>
                <div className="availbility-container-wrapper">
                    <div className="">
                        <Nav tabs>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: activeTab === '1' })}
                                    onClick={() => { this.toggle('1'); }}
                                >
                                    Use an Existing
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: activeTab === '2' })}
                                    onClick={() => { this.toggle('2'); }}
                                >
                                    Custom Schedule
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={activeTab}>
                            <TabPane tabId="1">
                                <div>
                                    <Calendar
                                        localizer={localizer}
                                        events={stateEvents}
                                        // startAccessor={ new Date() }
                                        // max={ new Date(2021, 3, 11) }
                                        defaultDate={new Date()}
                                        defaultView={Views.MONTH}
                                        scrollToTime={new Date(1970, 1, 1, 6)}
                                        // defaultDate={ new Date() }
                                    />
                                </div>
                            </TabPane>
                            <TabPane tabId="2">
                                <div>
                                    <Calendar
                                        localizer={localizer}
                                        events={[]}
                                        startAccessor={startDate}
                                        endAccessor={endDate}
                                        defaultDate={new Date()}
                                        onSelectEvent={event => alert(event.title)}
                                        onSelectSlot={this.handleSelect}
                                        selectable
                                        // defaultView={Views.MONTH}
                                        // scrollToTime={new Date(1970, 1, 1, 6)}
                                        // defaultDate={new Date()}
                                    />
                                </div>
                            </TabPane>
                        </TabContent>    
                    </div>
                </div>
            </Fragment>
            
                   
        )
    }
}

export default connect(null, {
    getStaffSchedule  
})(EventAvailbilityComponent)