
import React, { Component } from 'react';

const time = [
    {
        value: '1',
        text: 'Sun'
    },
    {
        value: '2',
        text: 'Mon'
    },
    {
        value: '3',
        text: 'Tue'
    },
    {
        value: '4',
        text: 'Wed'
    },
    {
        value: '5',
        text: 'Thu'
    },
    {
        value: '6',
        text: 'Fri'
    },
    {
        value: '7',
        text: 'Sat'
    },

]

class DaySelectorField extends Component {

    handleChange = ( { target } ) => {
        const { onChange } = this.props;
        const { value } = target || {}; 
        onChange(value);
    }

    render() {
        return (
            <div className="time-selector-wrapper day-selector">
                {
                    (time || []).map((e, i) => {
                        const { text, value } = e || {};
                        return (
                            <div className="event-form-check" key = { i }>
                                <input type="radio" id={ text } value = { value } onChange = { this.handleChange } name = "time"></input>
                                <label htmlFor={ text }>
                                    <span> { text } </span>
                                    
                                </label>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default DaySelectorField;