import React, { Component } from 'react';

class TextField extends Component {
    render() {
        const { title,isRequired } = this.props;
        return (
            <div className="field-section">
                <label>{ title } { (isRequired === "E" )? "*" : "" }</label>
                <div className="text-field-preview"></div>
            </div>
        )
    }
}


export default TextField;