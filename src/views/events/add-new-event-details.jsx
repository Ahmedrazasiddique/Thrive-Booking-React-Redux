
import React, { Component, Fragment } from 'react';
import FormField from "./Components/Common/FormField";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { Row, Col, Alert, Button, Input, FormGroup, InputGroup, InputGroupAddon,InputGroupText } from 'reactstrap';
import SidebarProgress from './Components/Sidebar/sidebar-progress';
import NumberField from './Components/Common/NumberField';
import { saveEventDetails } from '../../actions/eventActions';
import ToggleField from './Components/Common/ToggleField';
import FileUploadField from './Components/Common/FileUploadField';
import qs from 'query-string';
import ColorSelectorField from './Components/Common/ColorSelectorField';
import SectionPricing from './Components/Sections/section-pricing';
import SectionAddOns from './Components/Sections/section-add-ons';

const initialValues = {
    event_image: "",
    event_color: "",
    event_description: "",
    max_no_of_booking: 0,
    is_max_no_bookings: "D",
    recurring_booking_status: "D",
    allow_rescheduling_status: "D",
    attendee_cancellation_status: "D",
  
    
}


const paidValues = {
    ...initialValues,
    coupon_codes_status: "D",
    recurrent_booking_discounts_status: "D",
    cancellation_policy: "",
    instructions_attende: "",
    event_prepaid_status: ""
}


class AddNewEventDetails extends Component {

    state = {
        isLoading: false,
        errorMessage: "",
        pricing: [
            {
                "item_name": "",
                "price": "",
                "qty": 1
            }
        ],
        add_ons: [
            {
                "item_name": "",
                "price": "",
                "qty": 0
            }
        ],
        payments_type: [],
        payments_price: []
    }

    render() {
        const { route } = this.props;
        const { location, match, history } = route || {};
        const { search } = location || {};

        const locationParse = qs.parse(search);
        const { type } = locationParse || {};

        const { params } = match || {};
        const { id } = params || {};

        const { isLoading, errorMessage, pricing, add_ons, payments_type, payments_price } = this.state;

        return (
            <div className="create-event-wrapper">
                <div className="create-event-container">
                    <Row>
                        <Col md="9" lg="9">
                            <div className="event-card">
                                <div className="event-card-head">
                                    <h3 className="event-title">Event Details</h3>
                                </div>
                                <Formik
                                   
                                    initialValues={ type === "paid-event" ? paidValues : initialValues }
                                    onSubmit={(data) => {
                                        // this.setState({
                                        //     isLoading: true
                                        // })

                                        const { saveEventDetails } = this.props;

                                        const { pricing, add_ons } = this.state;

                                        let newData = {
                                            ...data,
                                            id: parseInt(id)
                                        }

                                        if(type === "paid-event") {
                                            console.log({
                                                payments_price,
                                                payments_type
                                            });


                                            const payments = (payments_type || []).map((e) => {
                                                if(payments_price[e]) {
                                                    return {
                                                        payment_type: e,
                                                        payment_type_flat_percent: "percent",
                                                        price: payments_price[e]
                                                    }
                                                }

                                                return {
                                                    payment_type: e,
                                                }
                                            });

                                            newData = {
                                                ...data,
                                                pricing,
                                                add_ons,
                                                payments
                                            }
                                        }

                                        saveEventDetails({
                                            data: newData,
                                            onSuccess: (eventId) => {
                                                history.push(`/admin/events/create/${eventId}/step-3?type=${type}`)
                                            },
                                            onError: (error) => {
                                                this.setState({
                                                    isLoading: false,
                                                    errorMessage: error
                                                })
                                            }
                                        })

                                    }}
                                >
                                    {(formProps) => {
                                        const {
                                            values,
                                            errors,
                                            touched,
                                            handleChange,
                                            
                                        } = formProps;
                                        return (
                                            <Form>
                                                <div className="event-card-body">
                                                    <Row>
                                                        <Col md="6" lg="6">
                                                            <div className="form-group event-form-group">
                                                                <label>Image</label>
                                                                <FileUploadField 
                                                                    name = "eventFile"
                                                                    accept="image/*" placeholder = "Choose Images" onChange= { (file) => {
                                                                    handleChange({
                                                                        target: { name: "eventFile", value: file }
                                                                    });
                                                                }}/>
                                                            </div>
                                                        </Col>
                                                        <Col md="6" lg="6">
                                                            <div className="form-group event-form-group">
                                                                <label>Event Color</label>
                                                                <ColorSelectorField name = "event_color" onChange = {
                                                                    (name, value) => {
                                                                        handleChange({
                                                                            target: { name, value }
                                                                        });
                                                                    }
                                                                }/>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                    <div className="event-field-group">
                                                        <Row>
                                                            <Col md="6" lg="6">
                                                                <div className="form-group event-form-group">
                                                                    <label>Description / Instruction</label>
                                                                    <Input 
                                                                        className="form-control"
                                                                        type="textarea" 
                                                                        placeholder="From Text"
                                                                        name="event_description"
                                                                        value = { values.event_description } 
                                                                        onChange = {({ target }) => {
                                                                            const { name, value } = target || {};
                                                                            handleChange({
                                                                                target: { name, value }
                                                                            });
                                                                        }} 
                                                                        id="venueNotes" 
                                                                    />
                                                                </div>
                                                            </Col>
                                                            <Col md="6" lg="6">
                                                                <div className="">
                                                                    <div className="form-group event-form-group d-flex justify-content-between">
                                                                        <label>
                                                                                Max no. of Bookings
                                                                        </label>
                                                                        <ToggleField 
                                                                            classes = {"text-right"} 
                                                                            labelText=""
                                                                            value = { values.is_max_no_bookings }
                                                                            onChange = { (value) => {
                                                                                handleChange({
                                                                                    target: {
                                                                                        name: "is_max_no_bookings",
                                                                                        value
                                                                                    }
                                                                                })
                                                                            } }
                                                                        />
                                                                        
                                                                    </div>
                                                                    { values.is_max_no_bookings === "E" && <div className="form-group">
                                                                        <Row>
                                                                            <Col md="6">
                                                                                <NumberField 
                                                                                    defaultValue = { values.max_no_of_booking }
                                                                                    onChange = {(value) => {
                                                                                    handleChange({
                                                                                        target: { name: "max_no_of_booking", value }
                                                                                    });
                                                                                }}/>
                                                                            </Col>
                                                                        </Row>
                                                                    </div> }
                                                                        
                                                                       
                                                                    <div className="form-group event-form-group d-flex justify-content-between">
                                                                        <label>
                                                                                Allow Recurring Booking?
                                                                        </label>
                                                                        <ToggleField 
                                                                            labelText="" 
                                                                            classes = {"text-right"} 
                                                                            value = { values.recurring_booking_status }
                                                                            onChange = { (value) => {
                                                                                handleChange({
                                                                                    target: {
                                                                                        name: "recurring_booking_status",
                                                                                        value
                                                                                    }
                                                                                })
                                                                            } }
                                                                        />
                                                                    </div>
                                                                    <div className="form-group event-form-group d-flex justify-content-between">
                                                                        <label>
                                                                                Allow Rescheduling?
                                                                        </label>
                                                                        <ToggleField 
                                                                            labelText=""
                                                                            classes = {"text-right"} 
                                                                            value = { values.allow_rescheduling_status }
                                                                            onChange = { (value) => {
                                                                                handleChange({
                                                                                    target: {
                                                                                        name: "allow_rescheduling_status",
                                                                                        value
                                                                                    }
                                                                                })
                                                                            } }
                                                                        />
                                                                    </div>
                                                                    <div className="form-group event-form-group d-flex justify-content-between">
                                                                        <label>
                                                                                Allow Attendee Cancellation?
                                                                        </label>
                                                                        <ToggleField 
                                                                            labelText=""
                                                                            classes = {"text-right"} 
                                                                            value = { values.attendee_cancellation_status }
                                                                            onChange = { (value) => {
                                                                                handleChange({
                                                                                    target: {
                                                                                        name: "attendee_cancellation_status",
                                                                                        value
                                                                                    }
                                                                                })
                                                                            } }
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                    { type === "paid-event" && <Fragment>
                                                        <div className="event-field-group">
                                                            <h3 className="field-title">Do You Require A Prepayment/Deposit ?</h3>
                                                            <Row>
                                                                <Col md="6" lg="6">
                                                                    <FormGroup tag="fieldset" className="event-form-group">
                                                                        <div className="event-form-check">
                                                                            <input type="radio" checked = { values.event_prepaid_status === "E" } id="input-1" name="event_prepaid_status" value="E" onChange = { ({ target }) => {
                                                                                const { name, value } = target;
                                                                                handleChange({
                                                                                    target: {
                                                                                        name,
                                                                                        value
                                                                                    }
                                                                                })
                                                                            }}></input>
                                                                            <label htmlFor="input-1">
                                                                                <span></span>
                                                                                Yes
                                                                            </label>
                                                                            
                                                                        </div>
                                                                    </FormGroup>  
                                                                    <div className="event-field-groups">
                                                                        <div className="form-group event-form-group">
                                                                            <div className="form-check-box">
                                                                                <input id="full_payment" type="checkbox" name="payment_type" onChange = { () => {
                                                                                    payments_type.push('full')
                                                                                }}></input>
                                                                                <label htmlFor="full_payment">
                                                                                    <span></span>
                                                                                    Full Payment
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                        <Row>
                                                                            <Col md="6" lg="6">
                                                                                <div className="form-group event-form-group">
                                                                                    <div className="form-check-box">
                                                                                        <input id="deposit" type="checkbox" name="payment_type" onChange = { () => {
                                                                                            payments_type.push('deposit')
                                                                                        }}></input>
                                                                                        <label htmlFor="deposit">
                                                                                            <span></span>
                                                                                            Deposit
                                                                                        </label>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="form-group form-field-group">
                                                                                    <InputGroup>
                                                                                        <InputGroupAddon addonType="prepend">
                                                                                        <InputGroupText>Precent %</InputGroupText>
                                                                                        </InputGroupAddon>
                                                                                        <Input onChange = { ({ target }) => {
                                                                                            const { value } = target;

                                                                                            payments_price["deposit"] = value;
                                                                                            
                                                                                        }}/>
                                                                                    </InputGroup>
                                                                                </div>
                                                                            </Col>
                                                                            <Col md="6" lg="6">
                                                                                <div className="form-group event-form-group">
                                                                                    <div className="form-check-box">
                                                                                        <input id="partial_payment" type="checkbox" name="payment_type" onChange = { () => {
                                                                                            payments_type.push('partial_payment')
                                                                                        }}></input>
                                                                                        <label htmlFor="partial_payment">
                                                                                            <span></span>
                                                                                            Partial Payment
                                                                                        </label>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="form-group form-field-group">
                                                                                    <InputGroup >
                                                                                        <InputGroupAddon addonType="prepend">
                                                                                        <InputGroupText>Precent %</InputGroupText>
                                                                                        </InputGroupAddon>
                                                                                        <Input onChange = { ({ target }) => {
                                                                                            const { value } = target;
                                                                                            payments_price["partial_payment"] = value;
                                                                                            
                                                                                        }}/>
                                                                                    </InputGroup>
                                                                                </div>
                                                                            </Col>
                                                                        </Row>
                                                                    </div>
                                                                    
                                                                </Col>
                                                                <Col md="6" lg="6">
                                                                    <FormGroup tag="fieldset" className="event-form-group">
                                                                        <div class="event-form-check">
                                                                            <input type="radio" id="input-2" checked = { values.event_prepaid_status === "D" } name="event_prepaid_status" value="D" onChange = { ({ target }) => {
                                                                                const { name, value } = target;
                                                                                handleChange({
                                                                                    target: {
                                                                                        name,
                                                                                        value
                                                                                    }
                                                                                })
                                                                            }}></input>
                                                                            <label htmlFor="input-2">
                                                                                <span></span>
                                                                                No
                                                                            </label>
                                                                            
                                                                        </div>
                                                                    </FormGroup>    
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                        {/* coupon code */}
                                                        <div className="event-field-group">
                                                            <Row>
                                                                <Col md="4" lg="4">
                                                                    <div className="event-form-group">
                                                                        <ToggleField 
                                                                            labelText = "Coupon Codes" 
                                                                            value = { values.coupon_codes_status }
                                                                            onChange = { (value) => {
                                                                                handleChange({
                                                                                    target: {
                                                                                        name: "coupon_codes_status",
                                                                                        value
                                                                                    }
                                                                                })
                                                                            } }
                                                                        />
                                                                    </div>
                                                                </Col>
                                                                <Col md="6" lg="6">
                                                                    <div className="event-form-group">
                                                                        <ToggleField 
                                                                            labelText = "Enable Recurrent Booking Discounts" 
                                                                            value = { values.recurrent_booking_discounts_status }
                                                                            onChange = { (value) => {
                                                                                handleChange({
                                                                                    target: {
                                                                                        name: "recurrent_booking_discounts_status",
                                                                                        value
                                                                                    }
                                                                                })
                                                                            } }
                                                                        />
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                        {/* pricing */}
                                                        <div className="event-field-group">
                                                            <h3 className="field-title">Pricing</h3>
                                                            <SectionPricing pricing = { pricing } onChange = {
                                                                (items) => {
                                                                    this.setState({
                                                                        pricing: items
                                                                    })
                                                                }
                                                            }/>
                                                            
                                                        </div>
                                                        {/* add on */}
                                                        <div className="event-field-group mb-30">
                                                            <h3 className="field-title">Add-on</h3>
                                                            <SectionAddOns addOns = { add_ons } onChange = {
                                                                (items) => {
                                                                    this.setState({
                                                                        add_ons: items
                                                                    })
                                                                }
                                                            }/>
                                                        </div>
                                                        <Row >
                                                            <Col md="6" lg="6">
                                                                <FormField
                                                                    type="text"
                                                                    name="cancellation_policy"
                                                                    label="Cancellation Policy"
                                                                    placeholder="From Text"
                                                                    showLabel={true}
                                                                    value={values.cancellation_policy}
                                                                    errors={errors}
                                                                    touched={touched}
                                                                />
                                                            </Col>
                                                            <Col md="6" lg="6">
                                                                <FormField
                                                                    type="text"
                                                                    name="instructions_attende"
                                                                    label="Instructions to Attendee"
                                                                    placeholder="From Text"
                                                                    showLabel={true}
                                                                    value={values.instructions_attende}
                                                                    errors={errors}
                                                                    touched={touched}
                                                                />
                                                            </Col>
                                                        </Row>
                                                        <Row className="mt-4">
                                                            <Col md="3" lg="3">
                                                                <div className="form-group event-form-group">
                                                                    <div className="form-check-box">
                                                                        <input id="booking_page" type="checkbox" name="page_selector"></input>
                                                                        <label htmlFor="booking_page">
                                                                            <span></span>
                                                                            Booking Page
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                                
                                                            </Col>
                                                            <Col md="3" lg="3">
                                                                <div className="form-group event-form-group">
                                                                    <div className="form-check-box">
                                                                        <input id="confirmation_page" type="checkbox" name="page_selector"></input>
                                                                        <label htmlFor="confirmation_page">
                                                                            <span></span>
                                                                            Confirmation Page
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                                
                                                            </Col>
                                                            <Col md="3" lg="3">
                                                                <div className="form-group event-form-group">
                                                                    <div className="form-check-box">
                                                                        <input id="reminder_email" type="checkbox" name="page_selector"></input>
                                                                        <label htmlFor="reminder_email">
                                                                            <span></span>
                                                                            Reminder Email
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                                
                                                            </Col>
                                                        </Row>
                                                    </Fragment> }
                                                </div>
                                                <div className="event-card-footer">
                                                    <Row>
                                                        <Col md="6" lg="6">
                                                            <Button className="btn btn-outline">
                                                                Go Back
                                                            </Button>
                                                        </Col>
                                                        <Col md="6" lg="6">
                                                            <Button type="submit" className="btn btn-app" disabled = { isLoading }>
                                                               { isLoading ? "Saving..." : "Next Step"} 
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                    { errorMessage !== "" && <Alert color="danger" className="mt-4 text-center p-10">
                                                        { errorMessage }
                                                    </Alert> }
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


export default connect(null, {
    saveEventDetails
})(AddNewEventDetails);

// export default AddNewEventDetails;