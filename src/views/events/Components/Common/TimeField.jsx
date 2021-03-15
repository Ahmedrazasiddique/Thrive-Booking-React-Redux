import React, { Component } from 'react';


class TimeField extends Component {
    render() {
        const { data, name: fieldName  } = this.props;
        const { text, value  } = data || {};
        return (
            <div className="event-form-check">
                <input type="radio" id={ text } name={ fieldName }></input>
                <label htmlFor={ text }>
                    <span> { text } </span>
                    
                </label>
            </div>
        )
    }
}

export default TimeField;