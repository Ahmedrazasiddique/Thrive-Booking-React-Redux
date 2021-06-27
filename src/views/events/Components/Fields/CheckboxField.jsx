import React, { Component } from 'react';

class CheckboxField extends Component {
    render() {
        const { title,isRequired, options } = this.props;
        return (
            <div className="field-section">
                <label>{ title } { (isRequired === "E" )? "*" : "" }</label>
                <div className="checkbox-field-preview">
                    <ul>
                        {
                            (options || []).map((e, index) => {
                                const { field_label } = e || {};
                                return <li key = { index }> { field_label } </li>
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }
}


export default CheckboxField;