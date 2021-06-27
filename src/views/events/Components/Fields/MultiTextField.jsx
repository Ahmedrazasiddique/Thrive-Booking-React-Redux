import React, { Component } from 'react';

class MultiTextField extends Component {
    render() {
        const { title,isRequired } = this.props;
        return (
            <div className="field-section">
                <label>{ title } { (isRequired === "E" )? "*" : "" }</label>
                <div className="textarea-field-preview"></div>
            </div>
        )
    }
}


export default MultiTextField;