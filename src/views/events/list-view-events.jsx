import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col} from 'reactstrap';
import * as Icon from 'react-feather';
import { connect } from "react-redux";
import moment from 'moment';
import Loader from '../../components/Loader/Loader';
import { getEvents } from '../../actions/eventActions';
import noImage from '../../assets/images/no-event-image.jpg';
import { Fragment } from 'react';

class ListEventsView extends Component {
    constructor (props) {
        super(props);
        this.state = {
            events: [],
            adHocEvents: [],
            isLoading: false
        }
    }
    componentDidMount() {
        const { getEvents } = this.props || {};
        const bussinessId = localStorage.getItem('businessId');
        const _this = this;

        this.setState({
            isLoading: true
        })

        getEvents({
            data: {
                bussinessId
            },
            onSuccess: function(eventList) {
                const { events:basicEvents, adhocEvents: adhoc } = eventList || {};
                _this.setState({
                    events: basicEvents,
                    adHocEvents: adhoc,
                    isLoading: false
                });
            },
            onError: function(error) {
                console.error(error);
            }
        })
    }
    render() {
        const { events, adHocEvents, isLoading } = this.state || {};
        return (
            <Fragment>
                <div className="list-view">
                    <div className="top-header-section">
                        <h1 className="event-title">Events List</h1>
                        <Link to="/admin/events/create/list" className="btn btn-app">
                            Add New Event
                        </Link>
                    </div>

                    <Fragment>
                        {
                            isLoading ? <p>Loading...</p> :  <div className="content-container">
                            <Row>
                                <Fragment>
                                    {
                                        (events || []).length > 0 
                                        ? 
                                        <Fragment>
                                            { (events || []).map((event, index) => {
                                                const { is_event_paid, venue, event_image, event_color, event_title, event_format_id, end_date, timeslot, is_draft, id } = event || {};
                                                const event_type = is_event_paid === "E" ? "paid-event" : "free-event"
                                                let image = noImage;

                                                console.log({
                                                    "t":process.env.REACT_APP_PUBLIC_PATH
                                                })

                                                if(event_image) {
                                                    image = `https://www.staging.thrive-booking.com/backend/public/${event_image}`;
                                                }
                                                
                                                return (
                                                    <Col md="4" lg="4">
                                                        <div className="card" key = { index }>
                                                            <div className="card-header">
                                                                <p>
                                                                    {
                                                                        is_event_paid === "E" ? "Paid Event" : "Free Event"
                                                                    }
                                                                </p>
                                                                <span className="event-color" style= {{
                                                                    "backgroundColor": event_color || "#b8c2cc",
                                                                    "borderColor": event_color || "#b8c2cc"
                                                                }}></span>
                                                            </div>
                    
                                                            <div className="card-body">
                                                                <div className="image-wrapper">
                                                                    <img src={ image } alt={event_title}/>
                                                                </div>
                                                                <h3>
                                                                    <Link to={`/admin/events/${ id }/create?type=${event_type}`}>
                                                                        { event_title }
                                                                    </Link>
                                                                </h3>
                                                                <Row>
                                                                    <Col md="6" lg="6">
                                                                        <p>
                                                                            <Icon.Layers size="16"/>
                                                                            { venue }
                                                                        </p>
                                                                    </Col>
                                                                    <Col md="6" lg="6">
                                                                        <p>
                                                                            <Icon.Award size="16"/>
                                                                            { (event_format_id === "1" || event_format_id === 1) ? "One to One" : "Group" }
                                                                        </p>
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col md="6" lg="6">
                                                                        <p>
                                                                            <Icon.Calendar size="16"/>
                                                                            { !end_date ? "Not Selected" : end_date }
                                                                        </p>
                                                                    </Col>
                                                                    <Col md="6" lg="6">
                                                                        <p>
                                                                            <Icon.Clock size="16"/>
                                                                            { !timeslot ? "Not Selected": timeslot }
                                                                        </p>
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col md="6" lg="6">
                                                                        <p>
                                                                            <Icon.Activity size="16"/>
                                                                            { is_draft === "D" ? "Complete" : "Draft" }
                                                                        </p>
                                                                    </Col>
                                                                
                                                                </Row>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                )
                                            }) }
                                        </Fragment>
                                        :
                                        <p className="text-left">
                                            No Events Found.
                                        </p>
                                    }
                                </Fragment>
                                
                            </Row>
                            
                        </div>
                        }
                    </Fragment>    
                </div>
                <div className="list-view">
                    <div className="top-header-section">
                        <h1 className="event-title">
                            AdHoc Events
                        </h1>
                    </div>
                    <Fragment>
                        {
                            isLoading ? <p>Loading...</p> :  <div className="content-container">
                            <Row>
                                <Fragment>
                                    {
                                        (adHocEvents || []).length > 0 
                                        ? 
                                        <Fragment>
                                            { (adHocEvents || []).map((event, index) => {
                                                const { is_event_paid, venue, event_color, title:event_title, event_format_id, event_date:end_date, end_time:timeslot, is_draft, id } = event || {};
                                                const event_type = is_event_paid === "E" ? "paid-event" : "free-event"
                                                return (
                                                    <Col md="4" lg="4">
                                                        <div className="card" key = { index }>
                                                            <div className="card-header">
                                                                <p>
                                                                    Adhoc Event
                                                                </p>
                                                                <span className="event-color" style= {{
                                                                    "backgroundColor": event_color || "#b8c2cc",
                                                                    "borderColor": event_color || "#b8c2cc"
                                                                }}></span>
                                                            </div>
                    
                                                            <div className="card-body">
                                                                <h3>
                                                                    <Link to={`/admin/events/create/${ id }/ad-hoc`}>
                                                                        { event_title }
                                                                    </Link>
                                                                </h3>
                                                                
                                                                <Row>
                                                                    <Col md="6" lg="6">
                                                                        <p>
                                                                            <Icon.Calendar size="16"/>
                                                                            { !end_date ? "Not Selected" : moment(end_date).format('MMM Do YYYY') }
                                                                        </p>
                                                                    </Col>
                                                                    <Col md="6" lg="6">
                                                                        <p>
                                                                            <Icon.Clock size="16"/>
                                                                            { !timeslot ? "Not Selected": timeslot }
                                                                        </p>
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col md="6" lg="6">
                                                                        <p>
                                                                            <Icon.Activity size="16"/>
                                                                            { is_draft === "D" ? "Complete" : "Draft" }
                                                                        </p>
                                                                    </Col>
                                                                
                                                                </Row>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                )
                                            }) }
                                        </Fragment>
                                        :
                                        <p className="text-left">
                                            No Events Found.
                                        </p>
                                    }
                                </Fragment>
                                
                            </Row>
                            
                        </div>
                        }
                    </Fragment>
                </div>
            </Fragment>
        )
    }
}

// export default ListEventsView;

export default connect(null, {
    getEvents,
})(ListEventsView);