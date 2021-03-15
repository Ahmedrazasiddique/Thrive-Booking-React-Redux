import React, { Component } from 'react';
import { FormGroup, Row, Col } from 'reactstrap';
import Select from 'react-select'
import FormField from './FormField';

class TimeIntervalComponent extends Component {
    constructor (props) {
        super(props);
        this.state = {
            interval: "am",
            time: "",
            intervalOptions: [
                {
                    value: "am",
                    label: "AM"
                },
                {
                    value: "pm",
                    label: "PM"
                },
            ]    
        }
    }
    render() {
        const { value, name, touched, onChange, placeholder, label, errors } = this.props;
        console.log({
            errors,
            touched,
            [name]: errors[name],
            touched: touched[name]
        })
        const { intervalOptions, interval, time } = this.state;
        return (
           <Row>
               <Col md="8" lg="8">
                    <FormField
                        showLabel
                        placeholder={ placeholder }
                        type="text"
                        name={ name}
                        label= { label }
                        errors={errors}
                        touched={touched}
                        value={ time }
                        onChange = { ({ target }) => {
                            const { value } = target || {};
                            this.setState({
                                time: value
                            }, () => {
                                const { time, interval } = this.state;
                                onChange(`${time} ${ interval }`)
                            })
                        }}
                    />
               </Col>
               <Col md="4" lg="4">
                    <FormGroup>
                        <label>Time Interval</label>
                        <Select 
                            value={(intervalOptions || []).filter(option => option.value === interval)}
                            options = { intervalOptions } onChange = { (interval) => {
                            const { value } = interval || {};
                            this.setState({
                                interval: value
                            }, () => {
                                const { time, interval } = this.state;
                                if(time !== "") {
                                    onChange(`${time} ${ interval }`);
                                }
                            })
                        }} />
                    </FormGroup>
               </Col>
           </Row>
        )
    }
}


export default TimeIntervalComponent;