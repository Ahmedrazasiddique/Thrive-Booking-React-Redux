import React, { Component } from 'react';
import * as Icon from "react-feather";



class IntervalField extends Component {
    constructor(props) {
        super(props);
        const { defaultValue } = this.props;
        this.state = {
            value: defaultValue
        }
    }

    onIncrement = () => {
        const { value } = this.state;
        const { interval } = this.props;
        this.setState({
            value: value + parseInt(interval)
        }, () => {
            const { value } = this.state;
            const { onChange } = this.props;

            onChange(value);
        })
    }

    onDecrement = () => {

        const { value } = this.state;
        const { interval } = this.props;
        if(value <= 0) return;

        this.setState({
            value: value - parseInt(interval)
        }, () => {
            const { value } = this.state;
            const { onChange } = this.props;
            onChange(value);
        })
    }

    render() {
        const { value } = this.state;
        const { label } = this.props;
        return (
            <div className="number-input-field interval-field">
                <span onClick = { this.onDecrement }>
                    <Icon.Minus size="16"/>
                </span>
                <input type="text" disabled value={ `${value} ${ label }` }/>
                <span onClick = { this.onIncrement }>
                    <Icon.Plus size="16"/>
                </span>
            </div>
        )
    }
}


export default IntervalField;