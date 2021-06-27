import React, { Component, Fragment } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Label, Input, FormGroup } from 'reactstrap';
// import ToggleField from '../Common/ToggleField';
// import FormField from "../Common/FormField";
import NumberField from '../Common/NumberField';
import { Formik, Form } from "formik";



class EventAvailbilityModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            dropDownValue: ""
        }
    }

    toggle = () => {
        const { isOpen } = this.state;
        this.setState({
            isOpen: !isOpen
        })
    }

    onDropdownChange = (value) => {
        this.setState({
            dropDownValue: value
        })
    }

    render() {
        const { isOpen, dropDownValue } = this.state;
        return (
            <Fragment>
                <div className="btn-wrapper">
                    <Button type="button" className="btn btn-primary" onClick={ this.toggle }>Event Validity</Button>
                </div>
                <Modal isOpen={isOpen} toggle={this.toggle} className="event-modal modal-lg modal-dialog">
                    <ModalHeader toggle={this.toggle}>Event Validity</ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col md="4" lg="4">
                                <div className="form-group event-form-group">
                                    <label>Number of days</label>
                                    <NumberField defaultValue = { 0 } onChange = { (value) => {
                                        console.log({
                                            value
                                        })
                                    }}/>
                                </div>
                            </Col>
                            <Col md="1" lg="1"></Col>
                            <Col md="6" lg="6">
                                <div className="form-group event-form-group ">
                                    <label>
                                        Staff Assignment
                                    </label>
                                    <FormGroup tag="fieldset" className="event-form-group ">
                                        
                                        <Row>
                                            <Col md="12" lg="12">
                                                <div className="event-form-check">
                                                    <input type="radio" id="input-1" name="is_time_block"></input>
                                                    <label htmlFor="input-1">
                                                        <span></span>
                                                        Yes
                                                    </label>
                                                    
                                                </div>
                                            </Col>
                                            <Col md="12" lg="12">
                                                <div className="event-form-check">
                                                    <input type="radio" id="input-2" name="is_time_block"></input>
                                                    <label htmlFor="input-2">
                                                        <span></span>
                                                        No
                                                    </label>
                                                    
                                                </div>
                                            </Col>
                                        </Row>
                                        
                                    </FormGroup>  
                                </div>
                            </Col>
                        </Row>
                    </ModalBody>
                    
                </Modal>
            </Fragment>
            
        )
    }
}


export default EventAvailbilityModal;