import React, { Component, Fragment } from 'react';
import { Row, Col, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { getStaffSchedule } from '../../../../actions/eventActions';
import ScheduleListView from './ScheduleListView';
import ScheduleCalendarView from './ScheduleCalendarView';

import * as Icon from "react-feather";

class EventAvailbilityComponent extends Component {
    state = {
        events: [],
        activeTab: '1',
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

    render () {
        const { staff:selectedStaff, errors, touched, businessId } = this.props || {};
        const { activeTab, startDate, endDate, events:stateEvents } = this.state;
        return (
            <Fragment>
                <div className="tabs-wrapper event-availbility">
                    <div className="tabs-container">
                        <Nav tabs>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: activeTab === '1' })}
                                    onClick={() => { this.toggle('1'); }}
                                >
                                    <span className="icon">
                                        <Icon.List size="20"/>
                                    </span>
                                    List View
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: activeTab === '2' })}
                                    onClick={() => { this.toggle('2'); }}
                                >
                                    <span className="icon">
                                        <Icon.Calendar size="20"/>
                                    </span>
                                    Calendar View
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={activeTab}>
                            <TabPane tabId="1">
                                <ScheduleListView businessId = { businessId } staff={ selectedStaff } errors = { errors } touched = { touched }/>
                            </TabPane>
                            <TabPane tabId="2">
                                <ScheduleCalendarView businessId = { businessId } staff={ selectedStaff }  events = {stateEvents} errors = { errors } touched = { touched }/>
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