
import React, { Component, Fragment } from 'react';
import FormField from "./Components/Common/FormField";
import { Link } from 'react-router-dom';
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Tooltip from './Components/Common/ToolTip';
import TextEditor from './Components/Common/TextEditorField';
import { connect } from "react-redux";
import { Row, Col, Alert, Button, Input, FormGroup, InputGroup, InputGroupAddon,InputGroupText } from 'reactstrap';
import SidebarProgress from './Components/Sidebar/sidebar-progress';
import NumberField from './Components/Common/NumberField';
import { saveEventDetails, getEventDetails } from '../../actions/eventActions';
import Loader from '../../components/Loader/Loader';
import ToggleField from './Components/Common/ToggleField';
import FileUploadField from './Components/Common/FileUploadField';
import qs from 'query-string';
import ColorSelectorField from './Components/Common/ColorSelectorField';
import SectionPricing from './Components/Sections/section-pricing';
import SectionAddOns from './Components/Sections/section-add-ons';

let initialValues = {
    event_image: "",
    event_color: "",
    event_description: "",
    max_no_of_booking: 0,
    max_no_booking_status: "D",
    recurring_booking_status: "D",
    allow_rescheduling_status: "D",
    attendee_cancellation_status: "D",
    cancellation_policy: "",
    ita_booking_page_status: "D",
    ita_confirmation_page_status: "D",
    ita_reminder_email_status: "D",
    instruction_to_attendee: "",

}


let paidValues = {
    ...initialValues,
    coupon_codes_status: "D",
    recurrent_booking_discounts_status: "D",
    // attendee_cancellation_status: "",
    event_prepaid_status: "",
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
        payments_type: "",
        payments_price: "",
        payments_flat_type: "percent",
        pageLoading: false
    }

    componentDidMount() {
        const { route, getEventDetails } = this.props;
        const { location, match, history } = route || {};
        const { search } = location || {};

        const locationParse = qs.parse(search);
        const { type } = locationParse || {};

        const { params } = match || {};
        const { id } = params || {};

        if(id) {
            this.setState({
                pageLoading: true
            });

            const _this = this;
            getEventDetails({
                data: {
                    id,
                    type: type === "paid-event" ? type : "event"
                },
                onSuccess: function(response) {
                   if(type === "free-event") {
                       initialValues = {
                           ...initialValues,
                           ...response
                       }
                   }

                   if(type === "paid-event") {
                        paidValues = {
                            ...paidValues,
                            ...response
                        }
                    }

                    _this.setState({
                        pageLoading: false
                    })
                },
                onError: function(error) {
                    _this.setState({
                        pageLoading: false
                    });
                }
            })
        }
    }

    render() {
        const { route } = this.props;
        const { location, match, history } = route || {};
        const { search } = location || {};

        const locationParse = qs.parse(search);
        const { type } = locationParse || {};

        const { params } = match || {};
        const { id } = params || {};

        const { isLoading, pageLoading, errorMessage, pricing, add_ons, payments_type, payments_price, payments_flat_type } = this.state;
        return (
            <div className="create-event-wrapper">
                <div className="create-event-container">
                    <Row>
                        <Col md="9" lg="9">
                            <div className="event-card">
                                <div className="event-card-head">
                                    <h3 className="event-title">Event Details</h3>
                                </div>
                                { pageLoading ? <Loader isShowLoader={true}/> : <Formik
                                   
                                    initialValues={ type === "paid-event" ? paidValues :initialValues }
                                    enableReinitialize
                                    onSubmit={(data) => {
                                        
                                        const { max_no_of_booking, event_description, event_image: file, event_color, is_max_no_bookings } = data || {};

                                        if(event_color === "") {
                                            alert("Event color is required field.");
                                            return;
                                        }

                                        if(parseInt(max_no_of_booking) === 0 && is_max_no_bookings === "E") {
                                            alert("Max number of booking needs to be greater than 0");
                                            return;
                                        }

                                        this.setState({
                                            isLoading: true
                                        })

                                        const { saveEventDetails } = this.props;

                                        const { pricing, add_ons } = this.state;

                                        let newData = {
                                            ...data,
                                            id: parseInt(id)
                                        }

                                        if(type === "paid-event") {
                                            const payments = [
                                                {
                                                    payment_type: payments_type,
                                                    payment_type_flat_percent: payments_flat_type,
                                                    price: payments_price
                                                }
                                            ]

                                            newData = {
                                                ...data,
                                                pricing,
                                                add_ons,
                                                payments,
                                                id: parseInt(id)
                                            }
                                        }
                                        
                                        
                                        saveEventDetails({
                                            data: {
                                                ...newData,
                                                'event_image': file
                                            },
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
                                                                <label>
                                                                    Image
                                                                    <Tooltip/>
                                                                </label>
                                                                <FileUploadField 
                                                                    name = "event_image"
                                                                    value = { values.event_image }
                                                                    accept="image/*" placeholder = "Choose Images" onChange= { (file) => {
                                                                    handleChange({
                                                                        target: { name: "event_image", value: file }
                                                                    });
                                                                }}/>
                                                            </div>
                                                        </Col>
                                                        <Col md="6" lg="6">
                                                            <div className="form-group event-form-group">
                                                                <label>
                                                                    Event Color
                                                                    <Tooltip/>
                                                                </label>
                                                                <ColorSelectorField name = "event_color" value={ values.event_color } onChange = {
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
                                                                    <label>
                                                                        Description / Instruction
                                                                        <Tooltip/>
                                                                    </label>
                                                                    <TextEditor name="event_description" value={ values.event_description } onChange = {(value) => {
                                                                            
                                                                            console.log({
                                                                                value
                                                                            })
                                                                            handleChange({
                                                                                target: { name: 'event_description', value }
                                                                            });
                                                                    }} />
                                                                    {/* <Input 
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
                                                                    /> */}
                                                                </div>
                                                            </Col>
                                                            <Col md="6" lg="6">
                                                                <div className="">
                                                                    <div className="form-group event-form-group d-flex justify-content-between">
                                                                        <label>
                                                                            Max no. of Bookings
                                                                            <Tooltip/>
                                                                        </label>
                                                                        <ToggleField 
                                                                            classes = {"text-right"} 
                                                                            labelText=""
                                                                            value = { values.max_no_booking_status }
                                                                            onChange = { (value) => {
                                                                                handleChange({
                                                                                    target: {
                                                                                        name: "max_no_booking_status",
                                                                                        value
                                                                                    }
                                                                                })
                                                                            } }
                                                                        />
                                                                        
                                                                    </div>
                                                                    { values.max_no_booking_status === "E" && <div className="form-group">
                                                                        <Row>
                                                                            <Col md="6">
                                                                                <NumberField 
                                                                                    defaultValue = { parseInt(values.max_no_of_booking) || 0 }
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
                                                                            <Tooltip/>
                                                                        </label>
                                                                        <ToggleField 
                                                                            labelText="" 
                                                                            classes = {"text-right"} 
                                                                            value = { values.recurring_booking_status || "" }
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
                                                                            <Tooltip/>
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
                                                                            <Tooltip/>
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
                                                    <Fragment>
                                                    { type === "paid-event" &&  <Fragment>
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
                                                                                <input id="full_payment" type="radio" name="payment_type" onChange = { () => {
                                                                                    // payments_type.push('full')

                                                                                    this.setState({
                                                                                        payments_type: "full"
                                                                                    });
                                                                                    
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
                                                                                            // payments_type.push('deposit')
                                                                                            this.setState({
                                                                                                payments_type: "deposit"
                                                                                            });
                                                                                            
                                                                                        }}></input>
                                                                                        <label htmlFor="deposit">
                                                                                            <span></span>
                                                                                            Deposit
                                                                                        </label>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="form-group form-field-group">
                                                                                    <div className="group-field">
                                                                                        <select name="payment_type_flat_percent" onChange={ ({ target }) => {
                                                                                            const { value } = target || {};
                                                                                          
                                                                                            this.setState({
                                                                                                payments_flat_type: value
                                                                                            })
                                                                                            
                                                                                        }}> 

                                                                                            <option value="percent">Percent %</option>
                                                                                            <option value="flat">Flat</option>
                                                                                        </select>
                                                                                        <Input type="number" onChange = { ({ target }) => {
                                                                                            const { value } = target;
                                                                                            // payments_price.push(value);

                                                                                            this.setState({
                                                                                                payments_price: value
                                                                                            })
                                                                                            // payments_price = value;
                                                                                            
                                                                                        }}/>
                                                                                    </div>
                                                                                </div>
                                                                            </Col>
                                                                            <Col md="6" lg="6">
                                                                                <div className="form-group event-form-group">
                                                                                    <div className="form-check-box">
                                                                                        <input id="partial_payment" type="radio" name="payment_type" onChange = { () => {
                                                                                            // payments_type.push('partial_payment')
                                                                                            this.setState({
                                                                                                payments_type: "partial_payment"
                                                                                            })
                                                                                            
                                                                                        }}></input>
                                                                                        <label htmlFor="partial_payment">
                                                                                            <span></span>
                                                                                            Partial Payment
                                                                                        </label>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="form-group form-field-group">
                                                                                <div className="group-field">
                                                                                        <select name="payment_type_flat_percent" onChange={ ({ target }) => {
                                                                                            const { name , value } = target || {};
                                                                                            // payments_flat_type["partial_payment"] = value;
                                                                                            this.setState({
                                                                                                payments_flat_type: value
                                                                                            })
                                                                                            // payments_flat_type = value;
                                                                                        }}>
                                                                                            <option value="percent">Percent %</option>
                                                                                            <option value="flat">Flat</option>
                                                                                        </select>
                                                                                        <Input type="number" onChange = { ({ target }) => {
                                                                                            const { value } = target;
                                                                                            this.setState({
                                                                                                payments_price: value
                                                                                            });
                                                                                             
                                                                                        }}/>
                                                                                    </div>
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
                                                        </Fragment> }
                                                        <div className="cancel-wrapper mt-30">
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
                                                                        name="instruction_to_attendee"
                                                                        label="Instructions to Attendee"
                                                                        placeholder="From Text"
                                                                        showLabel={true}
                                                                        value={values.instruction_to_attendee}
                                                                        errors={errors}
                                                                        touched={touched}
                                                                    />
                                                                </Col>
                                                            </Row> 
                                                            <Row>
                                                                <Col md="3" lg="3">
                                                                    <div className="form-group event-form-group">
                                                                        <div className="form-check-box">
                                                                            <input id="booking_page" type="checkbox" checked={ values.ita_booking_page_status === "E" ? true : false } name="ita_booking_page_status" value={ values.ita_booking_page_status } onChange = { (event) => {
                                                                                const { target } = event || {};
                                                                                const { name, value } = target || {};
                                                                                let defaultValue = "D";
                                                                                if(value === "D") {
                                                                                    defaultValue = "E";
                                                                                }

                                                                                handleChange({
                                                                                    target: {
                                                                                        name,
                                                                                        value: defaultValue
                                                                                    }
                                                                                })

                                                                                
                                                                            }}></input>
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
                                                                            <input id="confirmation_page" type="checkbox" checked={ values.ita_confirmation_page_status === "E" ? true : false } name="ita_confirmation_page_status" value={ values.ita_confirmation_page_status } onChange = { (event) => {
                                                                                const { target } = event || {};
                                                                                const { name, value } = target || {};
                                                                                let defaultValue = "D";
                                                                                if(value === "D") {
                                                                                    defaultValue = "E";
                                                                                }

                                                                                handleChange({
                                                                                    target: {
                                                                                        name,
                                                                                        value: defaultValue
                                                                                    }
                                                                                })

                                                                                
                                                                            }}></input>
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
                                                                            <input id="reminder_email" type="checkbox" checked={ values.ita_reminder_email_status === "E" ? true : false } name="ita_reminder_email_status" value={ values.ita_reminder_email_status } onChange = { (event) => {
                                                                                const { target } = event || {};
                                                                                const { name, value } = target || {};
                                                                                let defaultValue = "D";
                                                                                if(value === "D") {
                                                                                    defaultValue = "E";
                                                                                }

                                                                                handleChange({
                                                                                    target: {
                                                                                        name,
                                                                                        value: defaultValue
                                                                                    }
                                                                                })

                                                                                
                                                                            }}></input>
                                                                            <label htmlFor="reminder_email">
                                                                                <span></span>
                                                                                Reminder Email
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                    
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </Fragment> 
                                                </div>
                                                <div className="event-card-footer">
                                                    <Row>
                                                        <Col md="6" lg="6">
                                                            <Link to={`/admin/events/${id}/create?type=${type}`} className="btn btn-outline">
                                                                Go Back
                                                            </Link>
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
                                </Formik>  }       
                            </div>                      
                        </Col>
                        <Col md="3" lg="3">
                            <SidebarProgress route = { route } props = { this.props }/>
                        </Col>
                    </Row>
                </div>
            </div>        

        )
    }
} 


export default connect(null, {
    saveEventDetails,
    getEventDetails
})(AddNewEventDetails);

// export default AddNewEventDetails;