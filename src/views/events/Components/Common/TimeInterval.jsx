import React, { Component } from 'react';
import { FormGroup, Row, Col } from 'reactstrap';
import Select from 'react-select'
import ToolTip from './ToolTip';

import FormField from './FormField';
import { Fragment } from 'react';

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

    getOptions = () => {
        const intervals = [];
        
        for(var i =0; i< 12; i++) {
            for(var j = 0; j < 60; j=j+15)
            intervals.push({
                value: this.formatTime(i, j),
                label: this.formatTime(i, j)
            })
        }


        return intervals;
    }

    formatTime (hour, minutes) {
        let hourText = hour;
        let minuteText = minutes;
        if(hour < 10) {
            hourText = `0${hour}`;
        }

        if( minutes === 0 || minutes === "0") {
            minuteText =`0${minutes}`;
        }

        return `${hourText}:${minuteText}`
    }
    render() {
        const { value, name, touched, onChange, placeholder, label, errors } = this.props;

        const { intervalOptions, interval, time } = this.state;
        const options = this.getOptions();
        return (
           <Fragment>
                
                <Row>
                    <Col md="8" lg="8">
                        
                            <FormField
                                showLabel
                                placeholder={ placeholder }
                                type="select"
                                options= { options }
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
                                <label>
                                    Time Interval
                                    <ToolTip/>
                                </label>
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
           </Fragment>
        )
    }
}


export default TimeIntervalComponent;