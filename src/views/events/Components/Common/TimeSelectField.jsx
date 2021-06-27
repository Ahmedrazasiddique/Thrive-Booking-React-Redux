import React, { Component } from 'react';
// import TimePicker from 'basic-react-timepicker';

var TimePicker = require('basic-react-timepicker');


class TimeSelectField extends Component {
    render() {
        return (
            <TimePicker 
                step={60}
                name="default"
                defaultValue="2:30PM"
                onChange= { () => {
                    console.log(`change...`);
                }}
            />
        )
    }
}

export default TimeSelectField;
 
