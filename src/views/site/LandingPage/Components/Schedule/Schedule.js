import React from 'react';
import stepOne from '../../../../../assets/icons/step-1.svg';
import stepTwo from '../../../../../assets/icons/step-2.svg';
import stepThree from '../../../../../assets/icons/step-3.svg';
import topCurve from '../../../../../assets/icons/top-curve.png';
import bottomCurve from '../../../../../assets/icons/bottom-curve.png';

export const Schedule = () => {
  return (
    <div className="scheduling wrapper">
      <h1 className="heading schedule">Scheduling A 15 Minute Meeting Should Not Take 15 Back-And-Forths</h1>
      <p>MeetOcto manages everything before and after the meeting So you can can focus on what’s important… Your
        meeting.</p>
      <div className="row">
        <div className="col-4"></div>
        <div className="col-4 scheduling-desc">
          <h1>Share Your Event Link</h1>
          <p>On social media Emails On your website</p>
        </div>
        <div className="col-4"></div>
      </div>
      <div className="row">
        <div className="col-4 step-1">
          <div className="scheduling-img">
            <span className="number-count">1</span>
            <img src={stepOne}/>
          </div>
          <div className="top-curve"><img src={topCurve} alt=""/></div>
        </div>
        <div className="col-4 step-2">
          <div className="scheduling-img">
            <span className="number-count">2</span><img src={stepTwo} alt=""/></div>
          <div className="bottom-curve"><img src={bottomCurve} alt=""/></div>
        </div>
        <div className="col-4 step-3">
          <div className="scheduling-img">
            <span className="number-count">3</span><img src={stepThree} alt=""/></div>
          <div className="step-3-arrow"></div>
        </div>
      </div>
      <div className="row">
        <div className="col-4 scheduling-desc">
          <h1>Tell Octo The Rules </h1>
          <p>How, where and when you want to schedule your event</p>
        </div>
        <div className="col-4"></div>
        <div className="col-4 scheduling-desc">
          <h1>Book Events 24/7</h1>
          <p>Octo manages: Timezones, payments, Reminders and tons of things you don’t have time for</p>
        </div>
      </div>
    </div>

  );
};

