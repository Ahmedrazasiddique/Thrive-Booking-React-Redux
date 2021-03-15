import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import successImage from '../../assets/images/events/event-success.svg';


class EventSuccessPage extends Component {
    render() {
        return (
            <div className="success-wrapper">
                <div className="success-container">
                    <span>
                        <img src={ successImage } alt="success image"/>
                    </span>
                    <p><strong>Success.</strong> Your event has been created and added to your calendar.</p>
                    <Link to="/admin/events/list">
                        Create a New Event
                    </Link>
                </div>
            </div>
        )
    }
}


export default EventSuccessPage;