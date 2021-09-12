import React from 'react';
import meetingOne from '../../../../../assets/fe-images/meeting-1.png';
import meetingTwo from '../../../../../assets/fe-images/meeting-2.png';
import meetingThree from '../../../../../assets/fe-images/meeting-3.png';

export const Meetings = () => {
  return (
    <div className="meetings wrapper">
      <h1 className="heading">Give Your Meeting Extra Tentacles</h1>
      <div className="row pt-5 pb-4">
        <div className="col-lg-6 col-sm-12 meeting-img">
          <img src={meetingOne} />
        </div>
        <div className="col-lg-6 col-sm-12 meeting-details">
          <h1>Flexible & Customizable</h1>
          <p>Use it to schedule free and paid events for individuals, teams and traditional brick and mortar</p>
        </div>
      </div>
      <div className="row pt-4 pb-4">
        <div className="col-lg-6 col-sm-12 meeting-details">
          <h1>Full Scheduling Automation</h1>
          <p>Automate every aspect from communication, to reminders and processing payments.</p>
        </div>
        <div className="col-lg-6 col-sm-12 meeting-img">
          <img src={meetingTwo} />
        </div>
      </div>
      <div className="row pt-4 pb-5">
        <div className="col-lg-6 col-sm-12 meeting-img">
          <img src={meetingThree} />
        </div>
        <div className="col-lg-6 col-sm-12 meeting-details">
          <h1>Integrates</h1>
          <p>Meet Octo integrates with your favorite productivity apps easily and securely</p>
        </div>
      </div>
    </div>

  );
};
