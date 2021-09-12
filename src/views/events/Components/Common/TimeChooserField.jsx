import React, { Component } from 'react';
import Select from 'react-select'


class TimeChooserField extends Component {

    getOptions = () => {
        const intervals = [];
        
        for(var i =0; i< 24; i++) {
            for(var j = 0; j < 60; j=j+15) {
                const interval = i < 12 ? 'am' : 'pm'
                intervals.push({
                    value: `${this.formatTime(i, j)}${interval}`,
                    label: `${this.formatTime(i, j)}${interval}`
                })
            }
        }


        return intervals;
    }



    formatTime (hour, minutes) {
        let hourText = hour;
        let minuteText = minutes;

        if(hour < 10) {
            hourText = `0${hour}`;
        }

        if(hourText > 12 ) {
            hour = parseInt(hour) - 12;
            hourText = hour < 10 ? `0${hour}` : hour
        }

        if( minutes === 0 || minutes === "0") {
            minuteText =`0${minutes}`;
        }

        

        

        return `${hourText}:${minuteText}`
    }

    render () {

        // const { intervalOptions } = this.state || {}; 
        const { interval, index, name, onUpdate } = this.props || {};
        const options = this.getOptions();

        return (
            <Select 
                value={(options || []).filter(option => option.value === interval)}
                options = { options } 
                onChange = {(value) => {
                    onUpdate(name, value, index)
                }}
            />
        )
    }
}


export default TimeChooserField;