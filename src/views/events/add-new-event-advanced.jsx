import React, { Component } from 'react';
import { Row, Col, Button, FormGroup } from 'reactstrap';
import FormField from "./Components/Common/FormField";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import ToggleField from './Components/Common/ToggleField';
import SidebarProgress from './Components/Sidebar/sidebar-progress';
import InviteModal from './Components/Modals/InviteModal';
import SectionQuestions from './Components/Sections/section-questions';
import { Fragment } from 'react';
// import AddQuestionModal from './Components/Modals/AddQuestionModal';

const validation = Yup.object().shape({
    name: Yup.string().required("Name is required"),
});    

let initialValues = {
    name: ""
}

class AddNewEventAdvanced extends Component {

    state = {
        questions: [
            {
                question: "Please share anything that will help prepare for our meeting.",
                question_type: "multiline",
                show_status: "E",
                mandatory_status: "D",
                details: [] 
            }
        ],
        invitee: {
            defaultView: "name",
            allowGuest: false,
            autofill: false
        }
    }


    handleInviteeChange = (inviteVlaue) => {
        const { invitee } = this.state;

        this.setState({
            invitee: {
                ...invitee,
                ...inviteVlaue
            }
        })
    }

    addQuestion = (question) => {
        const { questions } = this.state || {};
        this.setState({
            questions: [...questions, question]
        })
    }

    onChange = (fieldName, fieldValue, index) => {
        const { questions } = this.state || {};
        const allowedTypes = ["select", "checkbox", "radio"];

        const newQuestions = (questions || []).map((question, questionIndex) => {
            let options = {
                ...question,
                [fieldName]: fieldValue
            };
            if(fieldName === "question_type" && (allowedTypes || []).indexOf(fieldValue) === -1) {
                options = {
                    ...question,
                    [fieldName]: fieldValue,
                    "details": []
                }
            }
            if(questionIndex === index) {
                return options;
            }

            return question;
        });

        console.log({
            newQuestions
        })

        this.setState({
            questions: newQuestions
        });
    }

    addOption = (index) => {
        const { questions } = this.state || {};
        const newQuestions = (questions || []).map((question, questionIndex) => {
        
            if(questionIndex === index) {
                const { details } = question || {};
                const defaultOption = {
                    field_value: "",
                    field_label: ""
                }
                return {
                    ...question,
                    details: [...details, defaultOption]
                }
            }

            return question;
        });

        this.setState({
            questions: newQuestions
        });
    } 

    onRemoveQuestion = (questionIndex) => {
        const { questions } = this.state || {};
        const newQuestions = (questions || []).filter((option, optIndex) => optIndex !== questionIndex);
        this.setState({
            questions: newQuestions
        })
    }

    removeOption = (questionIndex, optionIndex) => {
        const { questions } = this.state || {};
        const newQuestions = (questions || []).map((question, index) => {
            const { details: options } = question || {};
            if(index === questionIndex) {
                return {
                    ...question,
                    details: (options || []).filter((option, optIndex) => optIndex !== optionIndex)
                }
            }

            return question;
        });

        this.setState({
            questions: newQuestions
        });
    }

    formatLabel = (optionText) => {
        const newOption = optionText.replace(/ /g,"-");
        return newOption.toLowerCase();
    }

    changeOption = (questionIndex, optionIndex, fieldValue) => {
        const { questions } = this.state || {};

        const newQuestions = (questions || []).map((question, index) => {
            const { details: options } = question || {};
            if(index === questionIndex) {
                const newOptions = (options || []).map((option, optIndex) => {
                    if(optIndex === optionIndex) {
                        return {
                            field_label: fieldValue,
                            fieldValue: this.formatLabel(fieldValue)
                        }
                    }

                    return option;
                })
                return {
                    ...question,   
                    details: newOptions
                }
            }

            return question;
        });

        this.setState({
            questions: newQuestions
        });
    }
    render() {
        const { questions, invitee } = this.state || {};
        const { defaultView, allowGuest  } = invitee || {};
        return (
            <div className="create-event-wrapper">
                <div className="create-event-container">
                    <Row>
                        <Col md="9" lg="9">
                            <div className="event-card">
                                <div className="event-card-head">
                                    <h3 className="event-title">Advanced</h3>
                                </div>
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
                                                <div className="event-card-body">
                                                <div className="event-field-group padding-zero">
                                                        {
                                                            (defaultView === "first-name") ? <Fragment>
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
                                                                            value=""
                                                                            
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
                                                                            value=""
                                                                        />
                                                                    </Col>
                                                                </Row>
                                                            </Fragment> : <Fragment>
                                                            <Row>
                                                                    <Col md="12" lg="12">
                                                                        <FormField
                                                                            showLabel
                                                                            placeholder="Name"
                                                                            type="text"
                                                                            name="type"
                                                                            label="Name"
                                                                            errors={errors}
                                                                            touched={touched}
                                                                            value= ""
                                                                            
                                                                        />
                                                                    </Col>
                                                                    
                                                                </Row>
                                                            </Fragment>
                                                        }
                                                        <Row className="mt-2">
                                                            <Col md="12" lg="12">
                                                                <FormGroup className="event-form-group">
                                                                    <label>
                                                                        Email Address
                                                                    </label>
                                                                    <input type="email" className="form-control" value="" onChange = { this.handleChange } name="email" placeholder="Email Address"/>
                                                                </FormGroup>
                                                            </Col>
                                                        </Row>
                                                       { (allowGuest === true) && <Row className="mt-2">
                                                            <Col md="2" lg="2">
                                                                <Button className="btn btn-default btn-outline">Add Guest</Button>
                                                            </Col>
                                                        </Row>  }
                                                        <Row>
                                                            <Col md="3" lg="3">
                                                                <div className="form-group">
                                                                    <InviteModal invitee = { invitee } onChange = { this.handleInviteeChange }/>
                                                                </div>
                                                            </Col>
                                                        </Row>      
                                                    </div>
                                                    <div className="event-field-group">
                                                        <div className="form-group event-group">
                                                            <label>Ask Attendee Questions</label>
                                                            <SectionQuestions onRemoveQuestion = { this.onRemoveQuestion } questions = { questions } onChange = { this.onChange } onAddQuestion = { this.addQuestion } onAddOption = { this.addOption } onRemoveOption = { this.removeOption } onChangeOption = { this.changeOption }/>
                                                        </div>
                                                       
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
                                            </Form>
                                        )
                                    }}
                                </Formik>    
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