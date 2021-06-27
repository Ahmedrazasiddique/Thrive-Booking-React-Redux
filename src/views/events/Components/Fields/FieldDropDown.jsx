import React, { Component } from 'react';


class FieldDropDown extends Component {
    render() {
        const { title,isRequired, options } = this.props;
        return (
            <div className="field-section">
                <label>{ title } { (isRequired === "E" )? "*" : "" }</label>
                <div className="select-field-preview">
                    <select disabled={ true }>
                        {
                            (options || []).map((e, index) => {
                                const { field_label } = e || {};
                                return (
                                    <option key = { index }>{ field_label }</option>
                                )
                            })
                        }
                    </select>
                </div>
            </div>
        )
    }
}

export default FieldDropDown;

