import React, { Component, Fragment } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Label, Input, FormGroup } from 'reactstrap';
import FormField from "../../Components/Common/FormField";

class InviteModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            defaultView: "",
            allowGuest: false,
            autofill: false
        }
    }

    toggle = () => {
        const { isOpen } = this.state;
        this.setState({
            isOpen: !isOpen
        })
    }

    handleChange = ({ target }) => {
        const { name, value } = target || {};
        this.setState({
            [name]: value
        });
    }

    applyChanges = () => {
        const { defaultView, allowGuest, autofill } = this.state || {};
        const { onChange }  = this.props;
        onChange({
            defaultView,
            allowGuest,
            autofill
        });

        this.toggle();
    }

    render() {
        const { isOpen } = this.state;
        const { invitee, onChange } = this.props;

        const { defaultView, autofill, allowGuest} = this.state || {};

        // const { defaultView, allowGuest, autofill } = invitee || {};
        return (
            <Fragment>
                <div className="btn-wrapper">
                    <Button type="button" className="btn btn-primary" onClick={ this.toggle }>Invitee Settings</Button>
                </div>
                <Modal isOpen={isOpen} toggle={this.toggle} className="event-modal modal-lg modal-dialog">
                    <ModalHeader toggle={this.toggle}>Invitee Setting</ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col md="12" lg="12">
                                <FormGroup className="event-form-group">
                                    <label>
                                        Name
                                    </label>
                                    <select className="form-control" name="defaultView" onChange = { this.handleChange }>
                                        <option value="name" selected = { (defaultView === "name" ? "selected" : "" )}>
                                            Name
                                        </option>
                                        <option value="first-name" selected = { (defaultView === "first-name" ? "selected" : "" )}>
                                            First Name, Last Name
                                        </option>
                                    </select>
                                </FormGroup>
                            </Col>
                            
                        </Row>           
                        
                        <Row>
                            <Col md="12" lg="12">
                                <FormGroup tag="fieldset" className="event-form-group">
                                    <div className="form-group event-form-group">
                                        <div className="form-check-box">
                                            <input id="full_payment" type="checkbox" value = { allowGuest } checked = { (allowGuest === true) ? true : false } name="allowGuest" onChange = { ( { target }) => {
                                                const { name } = target || {};
                                                const guest = (allowGuest === false) ? true : false;

                                                this.setState({
                                                    [name]: guest
                                                })
                                                // onChange("allowGuest", guest);
                                            }}></input>
                                            <label htmlFor="full_payment">
                                                <span></span>
                                                Allow Attendee to add additional guest
                                            </label>
                                        </div>
                                        <div className="form-check-box">
                                            <input id="full_payments"  type="checkbox" value = { autofill } checked = { (autofill === true) ? true : false }  onChange = { ({ target }) => {
                                                const { name } = target || {}; 
                                                const guest = (autofill === false) ? true : false;
                                                // onChange("autofill", guest);
                                                this.setState({
                                                    [name]: guest
                                                })
                                            }} name="autofill"></input>
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
                                <Button className="btn btn-app" onClick={this.applyChanges}>Apply</Button>
                            </Col>
                        </Row>
                    </ModalFooter>
                </Modal>
            </Fragment>
            
        )
    }
}


export default InviteModal;