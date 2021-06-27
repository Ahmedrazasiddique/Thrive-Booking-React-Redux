import React, { Component, Fragment } from 'react';
import { Button, Modal, ModalHeader, Input, ModalBody, ModalFooter, Row, Col, FormGroup } from 'reactstrap';
import ToggleField from '../Common/ToggleField';
import * as Icon from "react-feather";
import OptionsField from '../Common/OptionsField';


class EditQuestionModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
        }
    }

    toggle = () => {
        const { isOpen } = this.state;
        this.setState({
            isOpen: !isOpen
        })
    }

    onChange = (name, value) => {
        const { field } = this.state ||{};
        this.setState({
            field: {
                ...field,
                [name]: value
            }
        })
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

    render() {
        const { isOpen } = this.state;
        const { types:questionTypes, question, index, onRemoveQuestion, onChange, onAdd, onRemove, onOptionChange } = this.props || {};
        const { question:title, question_type, show_status: status, mandatory_status, details } = question || {}; 
        
        return (
            <Fragment>
                <div>
                    <span className="icon" onClick={ this.toggle }>
                        <Icon.Edit size="16" />
                    </span>
                </div>
                <Modal isOpen={isOpen} toggle={this.toggle} className="event-modal modal-lg modal-dialog">
                    <ModalHeader toggle={this.toggle}>Edit Question</ModalHeader>
                    <ModalBody>
                        
                        <Row>
                            <Col md="12" lg="12">
                                <div className="form-group event-form-group">
                                    <label>Question*</label>
                                    <Input 
                                        type="textarea" 
                                        className="form-control"
                                        name="question"
                                        value={ title }
                                        placeholder="Question"
                                        onChange = { ({ target }) => {
                                            const { name, value } = target || {};
                                            console.log("Edit Question.",{
                                                name, value
                                            })
                                            onChange(name, value, index)
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
                                        onChange(name, value, index);
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
                                        onChange("show_status", value, index)
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
                                        onOptionChange(index, optionIndex, value)
                                    }}
                                    onAddOption = {() => {
                                        onAdd(index)
                                    }}
                                    onRemoveOption = { (optionIndex) => {
                                        onRemove(index, optionIndex);
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
                                                    onChange("mandatory_status", val, index);
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
                                <Button className="btn btn-app" onClick={this.toggle}>Apply</Button>
                            </Col>
                        </Row>

                        <Row>
                            <Col md="12" lg="12">
                            <Button className="btn btn-outline btn-danger btn-remove-question" onClick = {
                                    () => {
                                        onRemoveQuestion(index)
                                    }
                                }>
                                I want to Delete this Question
                            </Button> 
                            </Col>
                        </Row>
                    </ModalFooter>
                </Modal>
            </Fragment>
            
        )
    }
}


export default EditQuestionModal;