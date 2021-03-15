import React, { Component, Fragment } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Label, Input, FormGroup } from 'reactstrap';
import ToggleField from '../Common/ToggleField';
import FormField from "../Common/FormField";
import { Formik, Form } from "formik";
import * as Yup from "yup";

const validation = Yup.object().shape({
    name: Yup.string().required("Name is required"),
});    

let initialValues = {
    name: "",
    location: ""
}

class AddQuestionModal extends Component {
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
                    <Button type="button" className="btn btn-primary" onClick={ this.toggle }>Add Question</Button>
                </div>
                <Modal isOpen={isOpen} toggle={this.toggle} className="event-modal modal-lg modal-dialog">
                    <ModalHeader toggle={this.toggle}>Add Question</ModalHeader>
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
                                            <Col md="12" lg="12">
                                                <FormField
                                                    showLabel
                                                    placeholder="Question"
                                                    type="select"
                                                    name="type"
                                                    label="Question"
                                                    errors={errors}
                                                    touched={touched}
                                                    
                                                    options={[
                                                        {
                                                        value: 0,
                                                        label: "Random Question 1",
                                                        },
                                                        {
                                                        value: 1,
                                                        label: "Random Question 2",
                                                        },
                                                    ]}
                                                />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="6" lg="6">
                                                <FormField
                                                    showLabel
                                                    placeholder="Answer/Type"
                                                    type="select"
                                                    name="type"
                                                    label="Answer/Type"
                                                    errors={errors}
                                                    touched={touched}
                                                    
                                                    options={[
                                                        {
                                                        value: 0,
                                                        label: "Random Question 1",
                                                        },
                                                        {
                                                        value: 1,
                                                        label: "Random Question 2",
                                                        },
                                                    ]}
                                                />
                                            </Col>
                                            <Col md="6" lg="6">
                                                <div className="form-group event-form-group ">
                                                    <label>
                                                        {""}
                                                    </label>
                                                    <ToggleField classes = {""} labelText="Enable/Disable"/>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="12" lg="12">
                                                <FormGroup tag="fieldset" className="event-form-group">
                                                    <div className="form-group event-form-group">
                                                        <div className="form-check-box">
                                                            <input id="full_payment" type="checkbox" name="payment_type"></input>
                                                            <label htmlFor="full_payment">
                                                                <span></span>
                                                                Required
                                                            </label>
                                                        </div>
                                                        
                                                    </div>
                                                    
                                                    
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


export default AddQuestionModal;