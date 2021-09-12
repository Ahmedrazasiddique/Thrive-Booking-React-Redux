import React from 'react'
import headerImage from '../../../../../assets/images/header-img.png'
import Interests from "./Components";
import {Link} from 'react-router-dom'
import ProfileStepOne from "../../../ProfileSteps/Components/ProfileStepOne";

export const InterestsView = () => {
  const interests = [
    {interest: 'Project Management'},
    {interest: 'Coaching Sessions'},
    {interest: 'Training Classes'},
    {interest: 'Reservations'},
    {interest: 'Appointments'},
    {interest: 'Webinars'},
    {interest: 'Demos'},
    {interest: 'Spa Treatments'},
    {interest: 'Job Interviews'},
    {interest: 'Group Meetings'},
  ]
  return (
    <div className="interests wrapper">
      <h1 className="heading">Say Goodbye To Frustrating Back-And-Forths</h1>
      <p>Sign Up Today</p>
      <div className="interest-btns">
        {interests.map((interest, index) => (
          <Interests key={index} interests={interest} />
        ))}
      </div>
      <div className="started-btn">
        <Link to='/signup'><button className="btn">Get Started</button></Link>
      </div>
      <div className="header-img">
        <img src={headerImage}/>
      </div>
    </div>
  )
}
