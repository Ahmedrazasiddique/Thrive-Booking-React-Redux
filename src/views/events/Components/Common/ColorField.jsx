import React, { Component } from 'react';


class ColorField extends Component {
    render() {
        const { data, name: fieldName  } = this.props;
        const { name, color  } = data || {};
        return (
            <div class="event-form-check">
                <input type="radio" id={ name } name={ fieldName }></input>
                <label htmlFor={ name }>
                    <span style= {{
                        backgroundColor: color ,
                        borderColor: color 
                    }}></span>
                </label>
            </div>
        )
    }
}

export default ColorField;