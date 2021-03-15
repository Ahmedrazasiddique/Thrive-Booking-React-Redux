import React, { Component } from 'react';
import { Link } from "react-router-dom";
import freeEvent from '../../assets/images/events/free-event.svg';
import paidEvent from '../../assets/images/events/paid-event.svg';
import adHocEvent from '../../assets/images/events/ad-hoc-event.svg';


class EventTypeList extends Component {
    render() {
        return (
            <div className="event-wrapper">
                <div className="event-container">
                    <h2 className="event-title">Create New Events</h2>
                    <div className="event-type-wrapper">
                        <div className="row">
                            <div className="col-md-4 col-lg-4">
                                <div className="card">
                                    <div className="image-wrapper">
                                        <img src={ freeEvent } alt="Free Event"/>
                                    </div>
                                    <Link to="/admin/events/create?type=free-event">
                                        Free Event
                                    </Link>
                                </div>
                            </div>
                            <div className="col-md-4 col-lg-4">
                                <div className="card">
                                    <div className="image-wrapper">
                                        <img src={ paidEvent } alt="Paid Event"/>
                                    </div>
                                    <Link to="/admin/events/create?type=paid-event">
                                        Paid Event
                                    </Link>
                                </div>
                            </div>
                            <div className="col-md-4 col-lg-4">
                                <div className="card">
                                    <div className="image-wrapper">
                                        <img src={ adHocEvent } alt="Ad Hoc Event"/>
                                    </div>
                                    <Link to="/admin/events/create/ad-hoc">
                                        Ad-Hoc Event
                                    </Link>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default EventTypeList;