import React, { Component, Fragment } from 'react';
import * as Icon from "react-feather";
import { Row, Col, Button } from 'reactstrap';

class OptionsField extends Component {
    render() {
        const { options, onChange, onAddOption, onRemoveOption } = this.props || {};
        return (
            <div className="answer_options">
                {
                    (options || {}).map((option, index) => {
                        const { field_label: fieldLabel } = option || {};
                        return (
                            <Row key = { index }>
                                <Col md="10" lg="10">
                                    <div className="form-group event-form-group">
                                        <label>Option</label>
                                        <input type="text" className="form-control" value = { fieldLabel } placeholder="Answer" onChange = { ({ target }) => {
                                            const { value } = target || {};
                                            onChange(index, value);
                                        }}/>
                                    </div>
                                </Col>
                                <Col md="2" lg="2">
                                    <span className="removeOption" onClick = { () => {
                                        onRemoveOption(index);
                                    }}><Icon.Trash size="24"/></span>
                                </Col>
                            </Row>
                        )
                    })
                }
                <Row>
                    <Col md="3" lg="3">
                        <Button className="btn btn-primary btn-outline btn-add-question" type="button" onClick = { () => {
                            onAddOption()
                        }}>
                            <span> <Icon.Plus size="16" /></span>
                            Add Option
                        </Button>
                    </Col>
                </Row>
            </div>
        )
    }
}


export default OptionsField;