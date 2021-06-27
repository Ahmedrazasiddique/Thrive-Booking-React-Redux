import React, { Component, Fragment } from 'react';
import TextField from '../Fields/TextField';
import CheckboxField from '../Fields/CheckboxField';
import MultiTextField from '../Fields/MultiTextField';
import RadioField from '../Fields/RadioField';
import FieldDropDown from '../Fields/FieldDropDown';
import AddQuestionModal from '../Modals/AddQuestionModal';
import EditQuestionModal from '../Modals/EditQuestionModal';
import { Row, Col } from 'reactstrap';


const fieldTypes = [
    {
        label: "On Line",
        value: "text",
        component: TextField
    }, 
    {
        label: "Multiple Lines",
        value: "multiline",
        component: MultiTextField
    },
    {
        label: "Select Field",
        value:"select",
        component: FieldDropDown
    }, 
    {
        label: "Radio Buttons",
        value: "radio",
        component: RadioField
    },
    {
        label: "Checkboxes",
        value: "checkbox",
        component: CheckboxField
    }
]

class SectionQuestions extends Component {

    handleChange = (event, index) => {
        const { onChange } = this.props || {};
        const { target } = event || {};
        const { name, value } = target || {};
        onChange(name, value, index);
    }

    render() {
        const { questions, onAddQuestion, onChange, onAddOption, onRemoveQuestion, onRemoveOption, onChangeOption } = this.props || {};
        return (
            <Fragment>
                
                { (questions || []).map((question, index) => {
                    // console.log({
                    //     question
                    // })
                    const { question:title, question_type, mandatory_status,details } = question || {};
                    const field = (fieldTypes || []).find((e) => e.value === question_type);
                    const {component: ComponentField } = field || {};
                    return (
                        <Row key={ index } className="question-section">
                            <Col md="12" lg="12">
                                <Fragment>
                                    <ComponentField title = { title } options = { details } isRequired = { mandatory_status }/>
                                    <EditQuestionModal 
                                        types={ fieldTypes } 
                                        question = { question }
                                        index = { index } 
                                        // index = { index } 
                                        onChange = { (fieldName, fieldValue, index) => {
                                            
                                            onChange(fieldName, fieldValue, index)
                                        }}
                                        onAdd = { (questionIndex) => {
                                            onAddOption(questionIndex)
                                        }}
                                        onRemove = { (questionIndex, optionIndex) => {
                                            onRemoveOption(questionIndex, optionIndex)
                                        }}
                                        onRemoveQuestion = { (questionIndex) => {
                                            onRemoveQuestion(questionIndex)
                                        }}
                                        onOptionChange = { (questionIndex, optionIndex, fieldValue) => {
                                            onChangeOption(questionIndex, optionIndex, fieldValue);
                                        }}
                                    />
                                </Fragment>
                            </Col>
                        </Row>
                    )
                }) } 
                
                <div className="add-question-section-modal">
                    <Row>
                        <Col md="3" lg="3">
                            <AddQuestionModal 
                                types={ fieldTypes } 
                                label = "Add New Question"
                                addQuestion = { (question) => {
                                    onAddQuestion(question)
                                }}
                            />
                            
                        </Col>
                    </Row>
                </div>
            </Fragment>
        )
    }
}


export default SectionQuestions;