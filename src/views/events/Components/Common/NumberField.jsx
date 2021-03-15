import React, { Component } from 'react';
import * as Icon from "react-feather";



class NumberField extends Component {
    constructor(props) {
        super(props);
        const { defaultValue } = this.props;
        this.state = {
            value: defaultValue
        }
    }

    onIncrement = () => {
        const { value } = this.state;
        this.setState({
            value: value + 1
        }, () => {
            const { value } = this.state;
            const { onChange } = this.props;

            onChange(value);
        })
    }

    onDecrement = () => {

        const { value } = this.state;
        if(value === 1) return;

        this.setState({
            value: value - 1
        }, () => {
            const { value } = this.state;
            const { onChange } = this.props;
            onChange(value);
        })
    }

    render() {
        const { value } = this.state;
        return (
            <div className="number-input-field">
                <span onClick = { this.onDecrement }>
                    <Icon.Minus size="16"/>
                </span>
                <input type="text" disabled value={ value }/>
                <span onClick = { this.onIncrement }>
                    <Icon.Plus size="16"/>
                </span>
            </div>
        )
    }
}


export default NumberField;