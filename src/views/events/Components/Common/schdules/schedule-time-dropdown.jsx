import React, { Component, Fragment } from 'react';
import { FormGroup, Row, Col } from 'reactstrap';
import FormField from '../FormField';

class ScheduleTimeDropdown extends Component {
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
        
        for(var i =0; i< 24; i++) {
            const label = i <= 12 ? 'am' : 'pm';
            for(var j = 0; j < 60; j=j+15)
            intervals.push({
                value: this.formatTime(i, j),
                label: `${this.formatTime(i, j)} ${label}`
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

    render() {
        const { value, name, touched, onChange, placeholder, label, errors } = this.props;
        
        const { time } = this.state;
        const options = this.getOptions();

        if(value) {
            this.formatDefaultTime(value);
            this.formatInterval(value);
        }

        return (
           <Fragment>
               <div className="time-dropdown">
                    <Row>
                        <Col md="12" lg="12">
                            <FormField
                                
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
                    </Row>
               </div>
                
           </Fragment>
        )
    }
}



export default ScheduleTimeDropdown;