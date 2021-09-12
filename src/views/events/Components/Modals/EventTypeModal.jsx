import React, { Component, Fragment } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Label, Input, FormGroup } from 'reactstrap';
import EventDropDownComponent from '../Dropdown/event-dropdown';
import FormField from "../../Components/Common/FormField";
import PropTypes from "prop-types";
import Tooltip from '../Common/ToolTip';


class EventTypeModal extends Component {
    constructor(props) {
        super(props);
        const { defaultValue } = props || {};
        // const { venue_id } = values || {};
        this.state = {
            isOpen: false,
            dropDownValue: "",
            veneue: defaultValue,
            shouldUpdate: true,
        }
    }

    toggle = () => {
        const { onToggle } = this.props;
        onToggle();
    }

    onDropdownChange = (value) => {
       this.setState({
           veneue: value,
           shouldUpdate: false
       })
    }

    onApplyChanges = () => {

        const { formValues: values, onToggle, onChange } = this.props || {};

        const { veneue: venue_id } = this.state || {};

        // const { venue_id } = values || {};

        if(parseInt(venue_id) === 1) {
            const { venue_location, venue_location_notes, venue_location_status} = values || {};

            if(venue_location === "") {
                alert("Venue locatation is required.");
                return;
            }

            if(venue_location_notes === "") {
                alert("Venue locatation notes is required.");
                return;
            }

            if(venue_location_status === "") {
                alert("Venue locatation status is required.");
                return;
            }
        }

        if(parseInt(venue_id) === 2) {
            const { invitee_call_status, host_phone_no } = values || {};

            if(invitee_call_status === "" || !invitee_call_status) {
                alert("Invitee call status is required.");
                return;
            }

            if(invitee_call_status === "invitee" && host_phone_no === "") {
                alert("Host phone number is required.");
                return;
            }
        }

        // other

        if(parseInt(venue_id) === 7) {
            const { venue_other_display_status, venue_other_notes} = values || {};
            if(venue_other_notes === "") {
                alert("Notes is required.");
                return;
            }

            if(venue_other_display_status === "") {
                alert("Venue display status is required.");
                return;
            }
        }

        onChange("venue_id", venue_id);

       
        
        onToggle();

        this.setState({
            shouldUpdate: true
        })
    }

    componentDidUpdate(prevProps, nextProps) {
        const { veneue: oldVeneue, shouldUpdate } = nextProps || {};
        const { defaultValue } = prevProps || {};

        if(parseInt(oldVeneue) !== parseInt(defaultValue) && shouldUpdate) {
            this.setState({
                veneue: defaultValue
            });
        }
    }

    render() {
        const { dropDownValue, veneue:defaultValue } = this.state;
        const { isOpen, venues, formValues: values, errors, touched, onChange, defaultValue: propValue } = this.props;
        return (
            <Fragment>
                <div className="btn-wrapper">
                    <Button type="button" className="btn btn-primary" onClick={ this.toggle }>
                        Edit Details
                        
                    </Button>
                </div>
                <Modal isOpen={isOpen} toggle={this.toggle} className="event-modal modal-lg modal-dialog">
                    <ModalHeader toggle={this.toggle}>Add Location</ModalHeader>
                    <ModalBody>                    
                        <Row>
                            <Col md="12" lg="12">
                                <div className="event-form-group">
                                    <EventDropDownComponent defaultValue = { defaultValue } venues = { venues } onChange = { this.onDropdownChange }/>
                                    { (defaultValue === "3" || defaultValue === 3) && <div className="help-block">
                                        Google Meet link will be provided after invitee booking completed.
                                    </div> }

                                    { (defaultValue === "4" || defaultValue === 4) && <div className="help-block">
                                        Zoom link will be provided after invitee booking completed.
                                    </div> }

                                    {(defaultValue === "5" || defaultValue === 5) && <div className="help-block">
                                        Microsoft Team link will be provided after invitee booking completed.
                                    </div> }

                                    { (defaultValue === "6" || defaultValue === 6) && <div className="help-block">
                                        Go to Meeting link will be provided after invitee booking completed.
                                    </div> }
                                </div>
                            </Col>
                            { (defaultValue === "1" || defaultValue === 1) && ( 
                                <Fragment>
                                    <Col md="12" lg="12">
                                        <FormField
                                            type="text"
                                            name="venue_location"
                                            label="Location *"
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
                                            <label for="venueNotes">
                                                Venue Notes
                                                <Tooltip/>
                                            </label>
                                            <Input 
                                                className="form-control"
                                                type="textarea" 
                                                placeholder="From Text"
                                                name="venue_location_notes"
                                                onChange = {({ target }) => {
                                                    const { name, value } = target || {};
                                                    onChange(name, value);
                                                }} 
                                                value = { values.venue_location_notes }
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
                                                    checked = { values.venue_location_status === "display_location_booking" ? true : false }
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
                                                    checked = { values.venue_location_status === "display_booking_after_confirmed" ? true : false }
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
                                                    checked = { values.venue_location_status === "invitee_add_location" ? true : false }
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
                            { (defaultValue === "2" || defaultValue === 2) && <Col md="12" lg="12">
                                <FormGroup tag="fieldset" className="event-form-group">
                                    <div class="event-form-check">
                                        <input type="checkbox" id="input-1" value="me" name="invitee_call_status"
                                            checked = { values.invitee_call_status === "me"}
                                            onChange = {
                                            ({ target }) => {
                                               
                                                const { name, value } = target || {};
                                                onChange(name, value);
                                                
                                        }}></input>
                                        <label htmlFor="input-1">
                                            <span></span>
                                            I will call my invitee
                                        </label>
                                        <div className="help-block">
                                            This option will automatically require and add a section for your client to add phone.
                                        </div>
                                    </div>
                                    <div class="event-form-check">
                                        <input type="checkbox" id="input-2" value="invitee" name="invitee_call_status"
                                            checked = { values.invitee_call_status === "invitee"}
                                            onChange = {
                                                ({ target }) => {
                                                    const { name, value} = target || {};
                                                    onChange(name, value);
                                                }
                                            }
                                        ></input>
                                        <label htmlFor="input-2">
                                            <span></span>
                                            Let my invitee call me
                                        </label>
                                       { values.invitee_call_status === "invitee" && <div className="check-field">
                                            <FormField
                                                type="number"
                                                name="host_phone_no"
                                                label="Phone No"
                                                placeholder="+XXX-XXX-XXXXXX"
                                                showLabel={true}
                                                value={ values.host_phone_no }
                                                errors={errors}
                                                touched={touched}
                                                onChange={ ({ target }) => {
                                                    // const { isOpen } = this.state;
                                                    const { name, value } = target || {};
                                                    onChange(name, value);

                                                    

                                                }}
                                            />
                                        </div> }
                                        <div className="help-block">
                                            This option will not require MeetOcto to collect your client’s phone number when
                                            booking Your phone number will be sent to the invitee once booking is confirmed.
                                        </div>
                                    </div>
                                    
                                </FormGroup>    
                            </Col> }


                            { (defaultValue === "7" || defaultValue === 7) && <Fragment>
                                <Col md="12" lg="12">
                                    <div className="form-group event-form-group">
                                        <label for="venueNotes">
                                            Notes *
                                            <Tooltip/>
                                        </label>
                                        <Input 
                                            className="form-control"
                                            type="textarea" 
                                            placeholder="From Text"
                                            name="venue_other_notes"
                                            onChange = {({ target }) => {
                                                const { name, value } = target || {};
                                                onChange(name, value);
                                            }} 
                                            value = { values.venue_other_notes }
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
                                                name="venue_other_display_status"
                                                checked = { values.venue_other_display_status === "1" }
                                                value="1"
                                                onChange = {({ target }) => {
                                                    const { name, value } = target || {};
                                                    onChange(name, value);
                                                }} 
                                            ></input>
                                            <label htmlFor="input-1">
                                                <span></span>
                                                Display booking notes.
                                            </label>
                                        </div>
                                        <div class="event-form-check">
                                            <input 
                                                type="radio"
                                                id="input-2"
                                                name="venue_other_display_status"
                                                value="2"
                                                checked = { values.venue_other_display_status === "2" }
                                                onChange = {({ target }) => {
                                                    const { name, value } = target || {};
                                                    onChange(name, value);
                                                }} 
                                            ></input>
                                            <label htmlFor="input-2">
                                                <span></span>
                                                Display Notes After Booking is Confirmed
                                            </label>
                                        </div>
                                        
                                        
                                    </FormGroup>    
                                </Col> 
                            </Fragment> }
                            
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <Row>
                            <Col md="6" lg="6">
                                <Button className="btn btn-outline" onClick={this.toggle}>Cancel</Button>
                            </Col>
                            <Col md="6" lg="6">
                                <Button className="btn btn-app" onClick={this.onApplyChanges}>Apply</Button>
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