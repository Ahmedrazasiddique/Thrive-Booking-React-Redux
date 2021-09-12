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

    formatDefaultTime = (time) => {
        const { time: prevTime } = this.state || {};
        
        if(time) {
            const currentTime = time.split(':');
            let currTime = currentTime[0]+':'+currentTime[1];
            if(parseInt(currentTime[0]) > 12) {
                currentTime[0] = parseInt(currentTime[0]) - 12;
                currTime = this.formatTime(currentTime[0], currentTime[1]);
            }

            if(currTime !== prevTime) {
                this.setState({
                    time: currTime
                });
            }
        }

        return "";
    }

    formatInterval(time) {
        const { interval: prevInterval } = this.state || {};
        if(time) {
            let interval = "am";
            const currentTime = time.split(":");
            
            if(parseInt(currentTime[0]) > 12) {
                interval = "pm";
            }

            if(prevInterval !== interval) {
                this.setState({
                    interval
                })
            }
            
        }

        return "";
    }
    render() {
        const { value, name, touched, onChange, placeholder, label, errors } = this.props;        
        const { intervalOptions, interval, time } = this.state;
        const options = this.getOptions();

        if(value) {
            this.formatDefaultTime(value);
            this.formatInterval(value);
        }

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
                                // value = { defaultValue }
                                label= { label }
                                errors={errors}
                                touched={touched}
                                value={ time }
                                onChange = { ({ target }) => {
                                    const { value } = target || {};
                                    this.setState({
                                        time: value
                                    }, () => {
                                        const { time } = this.state;
                                        onChange(`${time}`)
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