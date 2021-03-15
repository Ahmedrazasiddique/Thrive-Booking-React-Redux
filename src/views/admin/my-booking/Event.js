import React from "react";

const Event = () => {
  return (
    <div className="col">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Event Title here...</h5>
          <small className="card-text">March 22 - March 24</small>
          <p className="text-muted">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit...{" "}
          </p>
          <a className="cta" href="test">
            Read More
          </a>
        </div>
        <div className="card-footer d-flex align-items-center">
          <div className="custom-control custom-switch">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customSwitch1"
            />
            <label className="custom-control-label" htmlFor="customSwitch1">
              Enable/Disable
            </label>
          </div>
          <button className="btn btn-success ml-auto" type="button">
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Event;
