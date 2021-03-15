
import React, { Component } from 'react';

const time = [
    {
        value: '5',
        text: '5'
    },
    {
        value: '10',
        text: '10'
    },
    {
        value: '15',
        text: '15'
    },
    {
        value: '30',
        text: '30'
    },
    {
        value: '45',
        text: '45'
    },
    {
        value: '60',
        text: '60'
    },
    {
        value: '000',
        text: '000'
    },

]

class TimeSelectorField extends Component {

    handleChange = ( { target } ) => {
        const { onChange } = this.props;
        const { value } = target || {}; 
        onChange(value);
    }

    render() {
        return (
            <div className="time-selector-wrapper">
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

export default TimeSelectorField;