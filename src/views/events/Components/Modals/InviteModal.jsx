import React, { Component, Fragment } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Label, Input, FormGroup } from 'reactstrap';
import FormField from "../../Components/Common/FormField";

class InviteModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
    }

    toggle = () => {
        const { isOpen } = this.state;
        this.setState({
            isOpen: !isOpen
        })
    }

    handleChange = (event) => {
        const { onChange }  = this.props;
        onChange(event);
    }

    render() {
        const { isOpen } = this.state;
        const { data } = this.props;
        const { first_name, last_name, email } = data || {};
        return (
            <Fragment>
                <div className="btn-wrapper">
                    <Button type="button" className="btn btn-primary" onClick={ this.toggle }>Invitee Settings</Button>
                </div>
                <Modal isOpen={isOpen} toggle={this.toggle} className="event-modal modal-lg modal-dialog">
                    <ModalHeader toggle={this.toggle}>Invitee Setting</ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col md="6" lg="6">
                                <FormGroup className="event-form-group">
                                    <label>
                                        First Name
                                    </label>
                                    <input type="text" className="form-control" value={ first_name } name="first_name" onChange = { this.handleChange } placeholder="First Name"/>
                                </FormGroup>
                            </Col>
                            <Col md="6" lg="6">
                                <FormGroup className="event-form-group">
                                    <label>
                                        Last Name
                                    </label>
                                    <input type="text" className="form-control" value={ last_name } onChange = { this.handleChange } name="last_name" placeholder="Last Name"/>
                                </FormGroup>
                            </Col>
                        </Row>           
                        <Row>
                            <Col md="12" lg="12">
                                <FormGroup className="event-form-group">
                                    <label>
                                        Email Address
                                    </label>
                                    <input type="email" className="form-control" value={ email } onChange = { this.handleChange } name="email" placeholder="Email Address"/>
                                </FormGroup>
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
                                                Allow Attendee to add additional guest
                                            </label>
                                        </div>
                                        <div className="form-check-box">
                                            <input id="full_payments" type="checkbox" name="payment_type"></input>
                                            <label htmlFor="full_payments">
                                                <span></span>
                                                Autofill attendee name, email, and test reminder phone
                                                number
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
                    </ModalFooter>
                </Modal>
            </Fragment>
            
        )
    }
}


export default InviteModal;