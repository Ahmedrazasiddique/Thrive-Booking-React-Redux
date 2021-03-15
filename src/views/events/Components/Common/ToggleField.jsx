
import React, { Component } from 'react';
import Switch from "react-switch";

class ToggleField extends Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(event) {
        const { onChange } = this.props;
        
        let value = "D";
        if(event) {
            value = "E";
        }


        onChange(value);


    }

    render() {
        const { labelText, classes, value } = this.props;
        return (
            <label className={ "toggle-field " + (value === "E" ? 'checked ' : 'un-checked ') + classes}>
                <Switch onChange={this.handleChange} checked={( value === "E") ? true : false } />
                <span>{ labelText }</span>
            </label>
        )
    }
}

export default ToggleField;