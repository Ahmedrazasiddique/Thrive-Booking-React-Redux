import React, { Component } from 'react';
import { Row, Col, Button, FormGroup } from 'reactstrap';
import FormField from "./Components/Common/FormField";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import ToggleField from './Components/Common/ToggleField';
import SidebarProgress from './Components/Sidebar/sidebar-progress';
import InviteModal from './Components/Modals/InviteModal';
import AddQuestionModal from './Components/Modals/AddQuestionModal';

const validation = Yup.object().shape({
    name: Yup.string().required("Name is required"),
});    

let initialValues = {
    name: ""
}

class AddNewEventAdvanced extends Component {
    render() {
        return (
            <div className="create-event-wrapper">
                <div className="create-event-container">
                    <Row>
                        <Col md="9" lg="9">
                            <div className="event-card">
                                <div className="event-card-head">
                                    <h3 className="event-title">Advanced</h3>
                                </div>
                                <div className="event-card-body">
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
                                                    <div className="event-field-group padding-zero">
                                                        <Row>
                                                            <Col md="6" lg="6">
                                                                <FormField
                                                                    showLabel
                                                                    placeholder="First Name"
                                                                    type="text"
                                                                    name="type"
                                                                    label="First Name"
                                                                    errors={errors}
                                                                    touched={touched}
                                                                    
                                                                    
                                                                />
                                                            </Col>
                                                            <Col md="6" lg="6">
                                                                <FormField
                                                                    showLabel
                                                                    placeholder="Last Name"
                                                                    type="text"
                                                                    name="type"
                                                                    label="Last Name"
                                                                    errors={errors}
                                                                    touched={touched}
                                                                />
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col md="3" lg="3">
                                                                <div className="form-group">
                                                                    <InviteModal/>
                                                                </div>
                                                            </Col>
                                                        </Row>      
                                                    </div>
                                                    <div className="event-field-group">
                                                        <Row>
                                                            <Col md="6" lg="6">
                                                                <FormField
                                                                    showLabel
                                                                    placeholder="Ask Attendee Questions"
                                                                    type="text"
                                                                    name="type"
                                                                    label="Ask Attendee Questions"
                                                                    errors={errors}
                                                                    touched={touched}
                                                                    
                                                                    
                                                                />
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col md="3" lg="3">
                                                                <AddQuestionModal/>
                                                            </Col>
                                                        </Row>
                                                    </div> 

                                                    <div className="event-field-group">
                                                        
                                                        <Row>
                                                            <Col md="6" lg="6">
                                                                <FormGroup tag="fieldset" className="event-form-group ">
                                                                    <label>Make Event Public</label>
                                                                    <Row>
                                                                        <Col md="6" lg="6">
                                                                            <div className="event-form-check">
                                                                                <input type="radio" id="input-1" name="is_time_block"></input>
                                                                                <label htmlFor="input-1">
                                                                                    <span></span>
                                                                                    Yes
                                                                                </label>
                                                                                
                                                                            </div>
                                                                        </Col>
                                                                        <Col md="6" lg="6">
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
                                                                <FormGroup tag="fieldset" className="event-form-group ">
                                                                    <label>Confirmation Page</label>
                                                                    <Row>
                                                                        <Col md="12" lg="12">
                                                                            <div className="event-form-check">
                                                                                <input type="radio" id="input-3" name="is_time_block"></input>
                                                                                <label htmlFor="input-3">
                                                                                    <span></span>
                                                                                    Yes
                                                                                </label>
                                                                                
                                                                            </div>
                                                                        </Col>
                                                                        <Col md="12" lg="12">
                                                                            <div className="event-form-check">
                                                                                <input type="radio" id="input-4" name="is_time_block"></input>
                                                                                <label htmlFor="input-4">
                                                                                    <span></span>
                                                                                    No
                                                                                </label>
                                                                                
                                                                            </div>
                                                                        </Col>
                                                                    </Row>
                                                                </FormGroup>
                                                            </Col>
                                                            <Col md="6" lg="6">
                                                                <FormGroup tag="fieldset" className="event-form-group ">
                                                                    <label>Reminders</label>
                                                                    <div className="form-group event-form-group d-flex justify-content-between">
                                                                        <label>
                                                                            Email Reminders
                                                                        </label>
                                                                        <ToggleField classes = {"text-right"} labelText=""/>
                                                                    </div>
                                                                    <div className="form-group event-form-group d-flex justify-content-between">
                                                                        <label>
                                                                            SMS Reminders
                                                                        </label>
                                                                        <ToggleField classes = {"text-right"} labelText=""/>
                                                                    </div>
                                                                    <div className="form-group event-form-group d-flex justify-content-between">
                                                                        <label>
                                                                            Email Follow-up
                                                                        </label>
                                                                        <ToggleField classes = {"text-right"} labelText=""/>
                                                                    </div>
                                                                </FormGroup>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col md="6" lg="6">
                                                                <FormGroup tag="fieldset" className="event-form-group ">
                                                                    <label>Collect Customer Feedback</label>
                                                                    <Row>
                                                                        <Col md="6" lg="6">
                                                                            <div className="event-form-check">
                                                                                <input type="radio" id="input-5" name="is_time_block"></input>
                                                                                <label htmlFor="input-5">
                                                                                    <span></span>
                                                                                    Yes
                                                                                </label>
                                                                                
                                                                            </div>
                                                                        </Col>
                                                                        <Col md="6" lg="6">
                                                                            <div className="event-form-check">
                                                                                <input type="radio" id="input-6" name="is_time_block"></input>
                                                                                <label htmlFor="input-6">
                                                                                    <span></span>
                                                                                    No
                                                                                </label>
                                                                                
                                                                            </div>
                                                                        </Col>
                                                                    </Row>
                                                                </FormGroup>    
                                                            </Col>
                                                        </Row>    
                                                    </div>
                                                </Form>
                                            )
                                        }}
                                    </Formik>                                
                                </div>
                                <div className="event-card-footer">
                                    <Row>
                                        <Col md="6" lg="6">
                                            <Button className="btn btn-outline">
                                                Go Back
                                            </Button>
                                        </Col>
                                        <Col md="6" lg="6">
                                            <Button className="btn btn-app">
                                                Finish
                                            </Button>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </Col>
                        <Col md="3" lg="3">
                            <SidebarProgress/>
                        </Col>
                    </Row>
                </div>
            </div>                    
        )
    }
}

export default AddNewEventAdvanced;