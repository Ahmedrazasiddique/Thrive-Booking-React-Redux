import React, { Fragment } from "react";
import SettingAsideLeft from "../partials/SettingAsideLeft";
import SettingAsideRight from "../partials/SettingAsideRight";

const GoogleCalendar = () => {
  const rightNavItems = [
    { href: "google-calender-settings", title: "Google Calender Settings" },
    {
      href: "google-calender-configuration",
      title: "Google Calender Configuration",
    },
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
            <form id="personalDetails" className="form-grid" action="">
              <div className="d-flex justify-content-star">
                <h2 className="form-heading">Google Calender Settings</h2>
                <a
                  type="button"
                  className="btn btn-link"
                  data-toggle="modal"
                  data-target="#modalForgetPass"
                ></a>
                <a
                  href="test"
                  className="float-right text-success"
                  data-toggle="modal"
                  data-target="#modalCalender"
                >
                  [How it works?]
                </a>
              </div>
              <fieldset>
                <legend className="text-muted">Details</legend>
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label">
                    Add Appointments To Google Calender
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
                <div className="form-group row">
                  <label htmlFor="" className="col-sm-3 col-form-label">
                    Time Interval
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="asf dsfg"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="" className="col-sm-3 col-form-label">
                    Google Calender Client ID
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="asdf"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="" className="col-sm-3 col-form-label">
                    Google Calender Client Secret
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="asdf"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="" className="col-sm-3 col-form-label">
                    Google Calender Frontend URL
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="asdf"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="" className="col-sm-3 col-form-label">
                    Google Calender Admin URL
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="afd"
                    />
                  </div>
                </div>
                <div className="form-group mt-3">
                  <button className="btn btn-success btn-md" type="button">
                    Save Setting
                  </button>
                </div>
              </fieldset>
            </form>

            <div className="divider"></div>

            <form id="cardDetails" className="form-grid" action="">
              <h2 className="form-heading">Google Calender Configuration</h2>
              <fieldset>
                <legend className="text-muted">DETAILS</legend>

                <div className="form-group row">
                  <label htmlFor="" className="col-sm-3 col-form-label">
                    Add Appointments To Google Calender
                  </label>
                  <div className="col-sm-9">
                    <div className="custom-control custom-switch">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="switch4"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="switch4"
                      ></label>
                    </div>
                  </div>
                </div>

                <div className="form-group row">
                  <label htmlFor="" className="col-sm-3 col-form-label">
                    Two Way Sync
                  </label>
                  <div className="col-sm-9">
                    <div className="custom-control custom-switch">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="switch5"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="switch5"
                      ></label>
                    </div>
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="" className="col-sm-3 col-form-label">
                    <a
                      href="https://accounts.google.com/signin/oauth/error?authError=Cg9pbnZhbGlkX3JlcXVlc3QSPUludmFsaWQgcGFyYW1ldGVyIHZhbHVlIGZvciByZWRpcmVjdF91cmk6IE1pc3Npbmcgc2NoZW1lOiBhZmQaNWh0dHA6Ly9jb2RlLmdvb2dsZS5jb20vYXBpcy9hY2NvdW50cy9kb2NzL09BdXRoMi5odG1sIJAD&client_id=asdf"
                      className="btn btn-link"
                    >
                      Link
                    </a>
                  </label>
                </div>
                <div className="form-group mt-3">
                  <button className="btn btn-success btn-md" type="button">
                    Save Setting
                  </button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </section>
      <SettingAsideRight items={rightNavItems} />
    </Fragment>
  );
};

export default GoogleCalendar;
