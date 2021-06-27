import React, { Component } from 'react';

class RadioField extends Component {
    render() {
        const { title, isRequired, options } = this.props;
        return (
            <div className="field-section">
                <label>{ title } { (isRequired === "E" )? "*" : "" }</label>
                <div className="radio-field-preview">
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


export default RadioField;