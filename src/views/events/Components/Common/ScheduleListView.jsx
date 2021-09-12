
import React, { Component } from 'react';
import ScheduleCopyDropdown from './schdules/schedule-copy-dropdown';
import ScheduleTimeDropdown from './schdules/schedule-time-dropdown';

import * as Icon from 'react-feather';


class ScheduleListView extends Component {
    state = {
        dailySchedules : [
            {
                dayId: 7,
                day: 'Sun',
                schedules: [],
                isEdit: true
            },
            {
                dayId: 1,
                day: 'Mon',
                schedules: [],
                isEdit: true
            },
            {
                dayId: 2,
                day: 'Tue',
                schedules: [],
                isEdit: true

            },
            {
                dayId: 3,
                day: 'Wed',
                schedules: [],
                isEdit: true
            },
            {
                dayId: 4,
                day: 'Thu',
                schedules: [],
                isEdit: true
            },
            {
                dayId: 5,
                day: 'Fri',
                schedules: [],
                isEdit: true
            },
            {
                dayId: 6,
                day: 'Sat',
                schedules: [],
                isEdit: true
            }
        ]
    }
    render() {
        const { dailySchedules } = this.state || {};
        const { errors, touched } = this.props || {};
        return (
            <div className="list-view-wrapper">
                {
                    (dailySchedules || []).map((schedule, index) => {
                        const { day, dayId, isEdit } = schedule || {};
                        return (
                            <div className="list-view" key={ index }>
                                <div className="title-section">
                                    {/* <div className="form-group event-form-group"> */}
                                        <div className="form-check-box">
                                            <input type="checkbox" key={ index } checked={ isEdit }/>
                                            <label htmlFor="reminder_email">
                                                <span></span>
                                                {/* Reminder Email */}
                                            </label>
                                        </div>
                                    {/* </div>         */}
                                    <span className="day-title">
                                        { day }
                                    </span>
                                </div>
                                <div className="schedule-section">
                                    <ScheduleTimeDropdown
                                        errors={errors}
                                        touched={touched}
                                        onChange= { () => {
                                            console.log('change....');
                                        }}
                                    />
                                    <span>-</span>
                                    <ScheduleTimeDropdown
                                        errors={errors}
                                        touched={touched}
                                        onChange= { () => {
                                            console.log('change....');
                                        }}
                                    />
                                </div>
                                <div className="action-wrapper">
                                    <span className="icon">
                                        <Icon.Plus size="22"/>
                                    </span>
                                    <ScheduleCopyDropdown schedules = { dailySchedules }/>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}


export default ScheduleListView;