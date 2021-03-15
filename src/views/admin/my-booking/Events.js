//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import Event from "./Event";

const Events = () => {
  return (
    <section className="section">
      <div className="container">
        <nav className="my-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/admin/my-bookings">My Booking</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/admin/my-bookings">All Events</Link>
            </li>
          </ol>
        </nav>

        <div className="page-title d-flex align-items-center my-4">
          <h4 className="active">All Booking / Event</h4>
          <a className="btn btn-outline-success ml-auto" href="new-booking.php">
            
            New Event Type
          </a>
        </div>

        <div className="event">
          <div className="row row-cols-3">
            <Event />
            <Event />
            <Event />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;
