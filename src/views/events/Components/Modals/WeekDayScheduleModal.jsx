import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, FormGroup, Label } from 'reactstrap';
import TimeChooserField  from '../Common/TimeChooserField';
import { connect } from 'react-redux';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { X, Plus } from 'react-feather';
import {  saveStaffSchedule } from '../../../../actions/eventActions';


class WeekdayScheduleModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
          selectedTime: [
              {
                startTime: "09:00am",
                endTime: "05:00pm"
              }
          ]
        };
    }
    

    toggle = () => {
        const { onToggle } = this.props || {};
        onToggle();
    }


    saveSchedule = () => {
        const { staff, weekDayId, businessId, saveStaffSchedule } = this.props || {};
        const { id: staffId } = staff[0] || {};
        const { selectedTime } = this.state || [];

        const selectEvents = (selectedTime || []).map((time, index) => {
            const { startTime, endTime } = time || {};
            return {
                "start_time": startTime,
                "end_time": endTime,

            }
        })

        const data = {
            "provider_id": businessId,
            businessId,
            "timezone_id": businessId,
            "staff_id": staffId,
            "on_status": "E",
            "type": "weekly",
            "weekday_id": weekDayId,
            "schedule_availability": selectEvents 
        }


        saveStaffSchedule({
            data,
            onSuccess: () =>  {
                console.log('successs')
            },
            onError: () => {
                console.log('error');
            }
        })

    }


    addOption = () => {
        const { selectedTime } = this.state || {};
        const defaultOption = {
            startTime: "09:00am",
            endTime: "05:00pm"
        };

        const newOptions = [...selectedTime, defaultOption];
        this.setState({ 
           selectedTime: newOptions
        })
    }


    onUpdate = (fieldName, fieldValue, index) => {
        const { selectedTime } = this.state || {};
       const newOptions =  (selectedTime || []).map((time, key) => {
           const { value } = fieldValue || {};
           if(index === key) {
                return {
                    ...time,
                    [fieldName]: value
                }
           }

           return time;
       });
       
       this.setState({
           selectedTime: newOptions
       });
    }

    removeOption = (index) => {
        const { selectedTime } = this.state || {};

        if((selectedTime || []).length > 1) {
            const newOptions = (selectedTime || []).filter((time, currentItem) => parseInt(index) !== parseInt(currentItem));

            this.setState({
                selectedTime: newOptions
            })
        }
    }
    
    render() {
        const { isOpen, day } = this.props || {};
        const { selectedTime } = this.state || {};

        return (
            <div className="day-schedule-wrapper">
                 <Modal isOpen={isOpen} toggle={this.toggle} size="sm" className="event-modal modal-lg modal-dialog">
                    <ModalHeader toggle={this.toggle}>
                       { day } availability
                    </ModalHeader>
                    <ModalBody>
                        <div className="time-interval-wrapper">
                            <Label>
                                What hours are you available?
                            </Label>
                            {
                                (selectedTime || []).map((time, index) => {
                                    const { startTime, endTime } = time || {}
                                    return (
                                        <Row key={index}>
                                            <Col md="5" lg="5" sm="5">
                                                <FormGroup>
                                                    <TimeChooserField name="startTime" index={index} onUpdate={ this.onUpdate } interval={ startTime }/>
                                                </FormGroup>
                                            </Col>
                                            <Col md="5" lg="5" sm="5">
                                                <FormGroup>
                                                    <TimeChooserField name="endTime" index={index} onUpdate={ this.onUpdate } interval={ endTime }/>
                                                </FormGroup>
                                            </Col>
                                            <Col md="2" lg="2" sm="2">
                                                <div className="icons">
                                                    <span onClick={ () => this.removeOption(index) }>
                                                        <X size="14"/>
                                                    </span>
                                                    <span onClick={ this.addOption }>
                                                        <Plus size="14"/> 
                                                    </span>
                                                </div>
                                            </Col>
                                        </Row>
                                    )
                                })
                            }
                          
                        </div>
                    </ModalBody>

                    <ModalFooter>
                        <div className="action-items">
                            <Button className="btn-outline" onClick={ this.toggle }>
                                Cancel
                            </Button>
                            <Button className="btn btn-primary" onClick={ this.saveSchedule }>
                                Save
                            </Button>
                        </div>
                    </ModalFooter>
                 </Modal>
            </div>
        )
    }
}

export default connect(null, {
   saveStaffSchedule
})(WeekdayScheduleModal);