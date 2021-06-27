import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col} from 'reactstrap';
import * as Icon from 'react-feather';
import { connect } from "react-redux";
import Loader from '../../components/Loader/Loader';
import { getEvents } from '../../actions/eventActions';
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
            <div className="list-view">
                <div className="top-header-section">
                    <h1 className="event-title">Events List</h1>
                    <Link to="/admin/events/create/list" className="btn btn-app">
                        Add New Event
                    </Link>
                </div>

                <Fragment>
                    {
                        isLoading ? <Loader isShowLoader={true}/> :  <div className="content-container">
                        <Row>
                            { (events || []).map((event, index) => {
                                const { is_event_paid, venue, event_color, event_title, event_format_id, end_date, timeslot, is_draft, id } = event || {};
                                const event_type = is_event_paid === "E" ? "paid-event" : "free-event"
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
                        </Row>
                        
                    </div>
                    }
                </Fragment>

               
            </div>
        )
    }
}

// export default ListEventsView;

export default connect(null, {
    getEvents,
})(ListEventsView);