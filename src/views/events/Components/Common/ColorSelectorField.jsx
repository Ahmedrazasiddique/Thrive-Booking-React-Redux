import React, { Component } from 'react';
import ColorField from './ColorField';
import PropTypes from "prop-types";

const colors = [
    {
        name: 'app',
        color: '#fe9920'
    },
    {
        name: 'primary',
        color: '#0c4767'
    },
    {
        name: 'success',
        color: '#45c48a'
    },
    {
        name: 'secondary', 
        color: '#1fbae7'
    },
    {
        name: 'yellow',
        color: '#fece42'
    },
    {
        name: 'danger',
        color: '#de5347'
    },
    {
        name: 'black',
        color: '#121114'
    }

]

class ColorSelectorField extends Component {

    onValueChange = ({ target }) => {
        const { onChange } = this.props;
        const { name, value } = target || {};
        
        onChange(name, value);

    }
    render() {
        const { name: fieldName } = this.props;

        return (
            <div className="color-selector-wrapper">
                {
                    (colors || []).map((e, i) => {
                        const { name, color } = e || {};
                        return (
                            <div class="event-form-check" key = { i }>
                                <input type="radio" id={ name } name={ fieldName } value = { color } onChange = { this.onValueChange }></input>
                                <label htmlFor={ name }>
                                    <span style= {{
                                        backgroundColor: color ,
                                        borderColor: color 
                                    }}></span>
                                </label>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

ColorSelectorField.propTypes = {
   name: PropTypes.any,
   onChange: PropTypes.func
};

export default ColorSelectorField;