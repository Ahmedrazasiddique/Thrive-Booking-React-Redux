import React, { Fragment } from "react";
import SettingAsideLeft from "../partials/SettingAsideLeft";
import SettingAsideRight from "../partials/SettingAsideRight";

const RecurrenceBooking = () => {
  const rightNavItems = [
    { href: "recurrence-booking", title: "Recurrence Booking" },
  ];
  return (
    <Fragment>
      <SettingAsideLeft />
      <section className="section">
        <div className="container">
          <div
            className=""
            data-spy="scroll"
            data-target="#formProfile"
            data-offset="0"
          >
            <form id="recurrence-booking" className="form-grid" action="">
              <h2 className="form-heading">Recurrence Booking</h2>

              <fieldset>
                <legend className="text-muted">Details</legend>
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Front Tool Tips
                  </label>
                  <div className="col-sm-9">
                    <div className="custom-control custom-switch">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="switch1"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="switch1"
                      ></label>
                    </div>
                  </div>
                </div>
              </fieldset>
              <div className="form-group mt-3">
                <button className="btn btn-success btn-md" type="button">
                  Save Setting
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <SettingAsideRight items={rightNavItems} />
    </Fragment>
  );
};

export default RecurrenceBooking;
