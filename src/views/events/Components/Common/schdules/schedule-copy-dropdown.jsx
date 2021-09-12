import React, { Component } from 'react';
import * as Icon from 'react-feather';

class ScheduleCopyDropdown extends Component {
    state = {
        showDropdown: false
    }
    render () {
        const { schedules } = this.props || {};
        const { showDropdown } = this.state || {};

        return (
            <span className="icon has-dropdwon" onClick={
                () => {
                    const { showDropdown } = this.state || {};
                    this.setState({
                        showDropdown: !showDropdown
                    })
                }
            }>
                <Icon.Copy size="22"/>
                { showDropdown && <div className="schedule-dropdown">
                    {
                        (schedules || []).map((schedule, index) => {
                            const { day, dayId, isEdit } = schedule || {};
                            return (
                                <div className="schedule">
                                    <div className="form-check-box">
                                        <input type="checkbox" key={ index } checked={ isEdit }/>
                                        <label htmlFor="reminder_email">
                                            <span></span>
                                            { day }
                                        </label>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div> }
            </span>

        )
    }
}

export default ScheduleCopyDropdown;