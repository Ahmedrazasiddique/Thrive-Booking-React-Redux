import React, { Component, Fragment } from 'react';
import { Row, Col, Button, FormGroup,  TabContent, TabPane, Nav, NavItem, NavLink, } from 'reactstrap';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import classnames from 'classnames';

class AdHocCalendar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeTab: '3',
            // value: new Date(),
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
    render() {
        const { activeTab } = this.state;
        const { value, onChange } = this.props;
        return (
            <Fragment>
                <Nav tabs>
                    
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
                        <Calendar
                            onChange={(value) => {
                                this.setState({
                                    value
                                }, () => {
                                    onChange(value)
                                })
                            }}
                            value={value}
                        />
                    </TabPane>
                </TabContent>
            </Fragment>        
        )
    }
}


export default AdHocCalendar;