import React, { Component, Fragment } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, FormGroup, Input } from 'reactstrap';
import ToggleField from '../Common/ToggleField';
import * as Icon from "react-feather";
import OptionsField from '../Common/OptionsField';

const defaultOption = {
    field_value: "",
    field_label: ""
}

const defaultField = {
    title: "",
    question_type:"",
    answerType: "",
    show_status: "E",
    mandatory_status: "D",
    details: []
};

class AddQuestionModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            dropDownValue: "",
            field: {
                question: "",
                question_type:"",
                answerType: "",
                show_status: "E",
                mandatory_status: "D",
                details: []
            }
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

    onChange = (name, value) => {
        const { field } = this.state ||{};
        const allowedTypes = ["select", "checkbox", "radio"];
        let options = {
            ...field,
            [name]: value
        };
        if(name === "question_type" && (allowedTypes || []).indexOf(value) === -1) {
            options = {
                ...field,
                [name]: value,
                "details": []
            }
        }
        this.setState({
            field: options
        })
    }

    saveField = () => {
       const { field: question } = this.state || {};
       const { addQuestion } = this.props || {};

       this.setState({
            isOpen: false,
           field: defaultField
       }, () => {
        addQuestion(question)
       })
    }

    onAdd = () => {
        const { field } = this.state;
        const { details } = field || {};
        this.setState({
            field: {
                ...field,
                details: [...details, defaultOption]
            }
        })
    }

    formatLabel = (optionText) => {
        const newOption = optionText.replace(/ /g,"-");
        return newOption.toLowerCase();
    }

    onOptionChange = (index,value) => {
        const { field } = this.state;
        const { details } = field || {};

        const newOptions = (details || []).map((e, i) => {
            if(index === i) {
                return {
                    ...e,
                    field_label: value,
                    field_value:this.formatLabel(value)
                }
            }
            return e;
        });

        this.setState({
            field: {
                ...field,
                details: newOptions
            }
        });
    }

    onRemove = (optionIndex) => {
        const { field } = this.state || {};
        const { details } = field || {};

        const newOptions = (details || []).filter((option, optIndex) => optIndex !== optionIndex);

        this.setState({
            field: {
                ...field,
                details: newOptions
            }
        })
    }

    render() {
        const { isOpen, field } = this.state;
        const { mandatory_status, show_status: status, question, details ,question_type } = field || {};
        const { types:questionTypes,  index, label } = this.props || {};
        // const { question:title, question_type, show_status: status, mandatory_status, details } = question || {}; 
        // const type = (questionTypes || []).find(questionType =>  questionType.value === question_type);
        // const { component: ComponentType } = type || {};
        return (
            <Fragment>
                <div className="btn-wrapper">
                    <Button type="button" className="btn btn-primary btn-outline btn-add-question" onClick={ this.toggle }> <span> <Icon.Plus size="16" /></span> { label }</Button>
                </div>
                <Modal isOpen={isOpen} toggle={this.toggle} className="event-modal modal-lg modal-dialog">
                    <ModalHeader toggle={this.toggle}>Add Question</ModalHeader>
                    <ModalBody>
                        
                        <Row>
                            <Col md="12" lg="12">
                                <div className="form-group event-form-group">
                                    <label>Question*</label>
                                    <Input 
                                        type="textarea" 
                                        className="form-control"
                                        name="question"
                                        value={ question }
                                        placeholder="Question"
                                        onChange = { ({ target }) => {
                                            const { name, value } = target || {};
                                            this.onChange(name, value, index)
                                        }}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6" lg="6">
                                <div className="form-group event-form-group">
                                    <label>Answer Type</label>
                                    <select className="form-control" name="question_type" onChange = {({ target }) => {
                                        const { name, value } = target || {};
                                        this.onChange(name, value, index);
                                    }}>
                                        <option value="">Choose...</option>
                                        {(questionTypes || []).map((type, index) => {
                                            const { label, value } = type || {};
                                            return (
                                                <option value={ value } key={ index } selected = { question_type === value ? true : false }>{ label }</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                
                            </Col>
                            <Col md="6" lg="6">
                                <div className="form-group event-form-group ">
                                    <label>
                                        {""}
                                    </label>
                                    <ToggleField classes = {""} labelText="Enable/Disable" value={ status } onChange= { (value) => {
                                        this.onChange("show_status", value, index)
                                    }}/>
                                </div>
                            </Col>
                        </Row>
                        {
                            (question_type === "radio" || question_type === "checkbox" || question_type === "select") && (
                                <OptionsField 
                                    options = { details } 
                                    index = { index } 
                                    onChange = { (optionIndex, value) => {
                                        this.onOptionChange(optionIndex, value)
                                    }}
                                    onAddOption = {() => {
                                        this.onAdd(index)
                                    }}
                                    onRemoveOption = { (optionIndex) => {
                                        this.onRemove(index, optionIndex);
                                    }}

                                />
                            )
                        }
                        <Row>
                            <Col md="12" lg="12">
                                <FormGroup tag="fieldset" className="event-form-group">
                                    <div className="form-group event-form-group">
                                        <div className="form-check-box">
                                            <input id="full_payment" type="checkbox" 
                                                checked = { mandatory_status === "E" ? true : false  } 
                                                onChange = { () => {
                                                    const val = mandatory_status === "E" ? "D" : "E";
                                                    this.onChange("mandatory_status", val, index);
                                                }}
                                            ></input>
                                            <label htmlFor="full_payment">
                                                <span></span>
                                                Required
                                            </label>
                                        </div>
                                        
                                    </div>
                                    
                                    
                                </FormGroup>
                            </Col>
                        </Row>
                                    
                    </ModalBody>
                    <ModalFooter>
                        <Row>
                            <Col md="6" lg="6">
                                <Button className="btn btn-outline" onClick={this.toggle}>Cancel</Button>
                            </Col>
                            <Col md="6" lg="6">
                                <Button className="btn btn-app" onClick={this.saveField }>Apply</Button>
                            </Col>
                        </Row>
                    </ModalFooter>
                </Modal>
            </Fragment>
            
        )
    }
}


export default AddQuestionModal;