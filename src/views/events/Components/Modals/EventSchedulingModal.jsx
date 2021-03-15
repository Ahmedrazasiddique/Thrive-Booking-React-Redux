import React, { Component, Fragment } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Label, Input, FormGroup } from 'reactstrap';
import ToggleField from '../Common/ToggleField';
import FormField from "../Common/FormField";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import NumberField from '../Common/NumberField';
import DaySelectorField from '../Common/DaySelectorField';
const validation = Yup.object().shape({
    name: Yup.string().required("Name is required"),
});    

let initialValues = {
    name: "",
    location: ""
}

class EventSchedulingModal extends Component {
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
                    <Button type="button" className="btn btn-primary" onClick={ this.toggle }>Event Validity Schedule</Button>
                </div>
                <Modal isOpen={isOpen} toggle={this.toggle} className="event-modal modal-lg modal-dialog">
                    <ModalHeader toggle={this.toggle}>Event Validity</ModalHeader>
                    <ModalBody>
                        <Formik
                            validationSchema={validation}
                            initialValues={initialValues}
                            onSubmit={(data) => {
                                console.log({
                                    data
                                })
                            }}
                        >
                            {(formProps) => {
                                const {
                                    values,
                                    errors,
                                    touched,
                                    handleChange,
                                    setFieldValue,
                                } = formProps;
                                return (
                                    <Form>
                                        <Row>
                                            <Col sm="12" md="4" lg="4">
                                                <div className="form-group event-form-group">
                                                    <label>Repeat Every</label>
                                                    <NumberField defaultValue = { 0 } onChange = {
                                                        (value) => {
                                                            console.log({
                                                                value
                                                            })
                                                        }
                                                    }/>
                                                </div>
                                            </Col>
                                            <Col sm="12" md="1" lg="1"></Col>
                                            <Col sm="12" md="6" lg="6">
                                                <FormField
                                                    showLabel
                                                    placeholder="Answer/Type"
                                                    type="select"
                                                    showLabel= { true }
                                                    name="type"
                                                    label="Period"
                                                    errors={errors}
                                                    touched={touched}
                                                    
                                                    options={[
                                                        {
                                                        value: 0,
                                                        label: "Week",
                                                        },
                                                        {
                                                        value: 1,
                                                        label: "Day",
                                                        },
                                                    ]}
                                                />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="12" lg="12">
                                                <div className="form-group event-form-group">
                                                    <label>Repeat On</label>
                                                    <DaySelectorField onChange = { () => {
                                                        console.log("here");
                                                    }}/>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="12" lg="12">
                                                <FormGroup tag="fieldset" className="event-form-group ">
                                                    <label>Ends</label>
                                                    <Row>
                                                        <Col md="4" lg="4">
                                                            <div className="event-form-check">
                                                                <input type="radio" id="input-12" name="is_time_block"></input>
                                                                <label htmlFor="input-12">
                                                                    <span></span>
                                                                    Never
                                                                </label>
                                                                
                                                            </div>
                                                        </Col>
                                                        <Col md="4" lg="4">
                                                            <div className="event-form-check">
                                                                <input type="radio" id="input-13" name="is_time_block"></input>
                                                                <label htmlFor="input-13">
                                                                    <span></span>
                                                                    On
                                                                </label>
                                                                
                                                            </div>
                                                        </Col>
                                                        <Col md="4" lg="4">
                                                            <div className="event-form-check">
                                                                <input type="radio" id="input-14" name="is_time_block"></input>
                                                                <label htmlFor="input-14">
                                                                    <span></span>
                                                                    After
                                                                </label>
                                                                
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                    
                                                        
                                                </FormGroup> 
                                            </Col> 
                                        </Row>
                                    </Form>
                                )
                            }}
                        </Formik>                       

                    </ModalBody>
                    <ModalFooter>
                        <Row>
                            <Col md="6" lg="6">
                                <Button className="btn btn-outline" onClick={this.toggle}>Cancel</Button>
                            </Col>
                            <Col md="6" lg="6">
                                <Button className="btn btn-app" onClick={this.toggle}>Apply</Button>
                            </Col>
                        </Row>
                    </ModalFooter>
                </Modal>
            </Fragment>
            
        )
    }
}


export default EventSchedulingModal;