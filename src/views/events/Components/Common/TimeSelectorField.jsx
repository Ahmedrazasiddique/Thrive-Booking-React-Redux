
import React, { Component } from 'react';
import { Fragment } from 'react';

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
        value: '0',
        text: '000',
        type: 'custom'
    },

]

class TimeSelectorField extends Component {

    state = {
        textboxValue: "",

    }

    handleChange = ( { target } ) => {
        const { onChange } = this.props;
        
        const { value } = target || {};

        if(target.getAttribute('data-type') === "text") {
            this.setState({
                textboxValue: value
            })
        }
        onChange(value);
    }

    render() {
        const { textboxValue } = this.state || {};
        const { defaultValue } = this.props || {};
        return (
            <div className="time-selector-wrapper">
                {
                    (time || []).map((e, i) => {
                        const { text, value, type } = e || {};
                        return (
                            <Fragment>
                                {
                                    type === "custom"
                                    ?
                                    <div className="event-form-check" key = { i }>
                                        <input type="number" id={ text } value = { textboxValue } placeholder={ text } onChange = { this.handleChange } data-type="text" name = "time"></input>
                                    </div>  
                                    :
                                    <div className="event-form-check" key = { i }>
                                        <input type="radio" id={ text } value = { value } onChange = { this.handleChange } checked = {
                                            (defaultValue === value) ? true : false
                                        } name = "time"></input>
                                        <label htmlFor={ text }>
                                            <span> { text } </span>
                                            
                                        </label>
                                    </div> 
                                }
                            </Fragment>
                        )
                    })
                }
            </div>
        )
    }
}

export default TimeSelectorField;