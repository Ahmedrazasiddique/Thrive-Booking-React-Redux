
import React, { Component } from 'react';

const time = [
    {
        value: '1',
        text: 'S'
    },
    {
        value: '2',
        text: 'M'
    },
    {
        value: '3',
        text: 'T'
    },
    {
        value: '4',
        text: 'W'
    },
    {
        value: '5',
        text: 'T'
    },
    {
        value: '6',
        text: 'F'
    },
    {
        value: '7',
        text: 'S'
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

export default DaySelectorField;