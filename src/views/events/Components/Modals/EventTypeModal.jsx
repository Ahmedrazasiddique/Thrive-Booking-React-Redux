import React, { Component, Fragment } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Label, Input, FormGroup } from 'reactstrap';
import EventDropDownComponent from '../Dropdown/event-dropdown';
import FormField from "../../Components/Common/FormField";
import PropTypes from "prop-types";

class EventTypeModal extends Component {
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
        const { venues, defaultValue, formValues: values, errors, touched, onChange } = this.props;
        return (
            <Fragment>
                <div className="btn-wrapper">
                    <Button type="button" className="btn btn-primary" onClick={ this.toggle }>Edit Details</Button>
                </div>
                <Modal isOpen={isOpen} toggle={this.toggle} className="event-modal modal-lg modal-dialog">
                    <ModalHeader toggle={this.toggle}>Add Location</ModalHeader>
                    <ModalBody>                    
                        <Row>
                            <Col md="12" lg="12">
                                <div className="event-form-group">
                                    <EventDropDownComponent defaultValue = { defaultValue } venues = { venues } onChange = { this.onDropdownChange }/>
                                    { defaultValue === "3" && <div className="help-block">
                                        Google Meet Link will be provided after invitee completed booking.
                                    </div> }

                                    { defaultValue === "4" && <div className="help-block">
                                        Zoom Link will be provided after invitee completed booking..
                                    </div> }
                                </div>
                            </Col>
                            { defaultValue === "1" && ( 
                                <Fragment>
                                    <Col md="12" lg="12">
                                        <FormField
                                            type="text"
                                            name="venue_location"
                                            label="Location"
                                            placeholder="Location"
                                            showLabel={true}
                                            value={ values.venue_location }
                                            errors={errors}
                                            touched={touched} 
                                            onChange = {({ target }) => {
                                                const { name, value } = target || {};
                                                onChange(name, value);
                                            }}
                                        />
                                    </Col>
                                    <Col md="12" lg="12">
                                        <div className="form-group event-form-group">
                                            <Label for="venueNotes">Venue Notes</Label>
                                            <Input 
                                                className="form-control"
                                                type="textarea" 
                                                placeholder="From Text"
                                                name="venue_location_notes"
                                                onChange = {({ target }) => {
                                                    const { name, value } = target || {};
                                                    onChange(name, value);
                                                }} 
                                                id="venueNotes" 
                                            />
                                    </div>
                                    </Col>
                                    <Col md="12" lg="12">
                                        <FormGroup tag="fieldset" className="event-form-group">
                                            <div class="event-form-check">
                                                <input 
                                                    type="radio"
                                                    id="input-1"
                                                    name="venue_location_status"
                                                    value="display_location_booking"
                                                    onChange = {({ target }) => {
                                                        const { name, value } = target || {};
                                                        onChange(name, value);
                                                    }} 
                                                ></input>
                                                <label htmlFor="input-1">
                                                    <span></span>
                                                    Display Location while booking.
                                                </label>
                                            </div>
                                            <div class="event-form-check">
                                                <input 
                                                    type="radio"
                                                    id="input-2"
                                                    name="venue_location_status"
                                                    value="display_booking_after_confirmed"
                                                    onChange = {({ target }) => {
                                                        const { name, value } = target || {};
                                                        onChange(name, value);
                                                    }} 
                                                ></input>
                                                <label htmlFor="input-2">
                                                    <span></span>
                                                    Display Location After Booking is Confirmed
                                                </label>
                                            </div>
                                            <div class="event-form-check">
                                                <input 
                                                    type="radio"
                                                    id="input-3"
                                                    name="venue_location_status"
                                                    value="invitee_add_location"
                                                    onChange = {({ target }) => {
                                                        const { name, value } = target || {};
                                                        onChange(name, value);
                                                    }} 
                                                ></input>
                                                <label htmlFor="input-3">
                                                    <span></span>
                                                    Let invitee add location for meeting
                                                </label>
                                                <div className="help-block">
                                                    This option will automatically require and add a section for your client to add location.
                                                </div>
                                            </div>
                                            
                                        </FormGroup>    
                                    </Col> 
                                </Fragment>
                            
                            ) }
                            { defaultValue === "2" && <Col md="12" lg="12">
                                <FormGroup tag="fieldset" className="event-form-group">
                                    <div class="event-form-check">
                                        <input type="checkbox" id="input-1" name="call_my_invitee_status"
                                            checked = { values.call_my_invitee_status === "yes"}
                                            onChange = {
                                            ({ target }) => {
                                                if(values.call_my_invitee_status === "yes") {
                                                    onChange("call_my_invitee_status", "no"); 
                                                } else {
                                                    onChange("call_my_invitee_status", "yes")
                                                }
                                                
                                        }}></input>
                                        <label htmlFor="input-1">
                                            <span></span>
                                            I will call my invitee.
                                        </label>
                                        <div className="help-block">
                                            This option will automatically require and add a section for your client to add location.
                                        </div>
                                    </div>
                                    <div class="event-form-check">
                                        <input type="checkbox" id="input-2" name="invitee_call_me_status"
                                            checked = { values.invitee_call_me_status === "yes"}
                                            onChange = {
                                                ({ target }) => {
                                                    if(values.invitee_call_me_status === "yes") {
                                                        onChange("invitee_call_me_status", "no"); 
                                                    } else {
                                                        onChange("invitee_call_me_status", "yes")
                                                    }
                                                }
                                            }
                                        ></input>
                                        <label htmlFor="input-2">
                                            <span></span>
                                            Let my invitee call me
                                        </label>
                                        <div className="check-field">
                                            <FormField
                                                type="text"
                                                name="host_phone_no"
                                                label="Phone No"
                                                placeholder="+XXX-XXX-XXXXXX"
                                                showLabel={true}
                                                value={ values.host_phone_no }
                                                errors={errors}
                                                touched={touched}
                                                onChange={ ({ target }) => {
                                                    const { name, value } = target || {};
                                                    onChange(name, value);
                                                }}
                                            />
                                        </div>
                                        <div className="help-block">
                                            This option will not require thriveBooking to collect your client’s phone number when
                                            booking Your phone number will be sent to the invitee once booking is confirmed.
                                        </div>
                                    </div>
                                    
                                </FormGroup>    
                            </Col> }
                            
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


EventDropDownComponent.propTypes = {
    venues: PropTypes.any,
    defaultValue: PropTypes.any,
    formValues: PropTypes.any,
    errors: PropTypes.any,
    touched: PropTypes.any,
    onChange: PropTypes.any
};

export default EventTypeModal;