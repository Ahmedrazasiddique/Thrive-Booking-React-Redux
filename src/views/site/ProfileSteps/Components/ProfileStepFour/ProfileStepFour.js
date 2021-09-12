import React from 'react'
import fillStep from '../../../../../assets/images/fill.png'
import currentStep from '../../../../../assets/images/current-step.png'
import facebook from '../../../../../assets/images/facebook.png'
import twitter from '../../../../../assets/images/twitter.png'
import email from '../../../../../assets/images/email.png'
import logoSm from '../../../../../assets/images/logo-sm.png'
import {Link} from "react-router-dom";

const ProfileStepFour = () => {
  return (
    <div>
      <header>
        <div className="header-container">
          <div className="logo">
            <img src={logoSm} />
          </div>
        </div>
      </header>

      <div className="profile-step profile-step-4">
        <div className="step-1">
          <h1>Thank you for signing up</h1>
          <p className="m-0">Just few more steps to get you started</p>
          <div className="by-step complete-steps">
            <div className="step">
              <img alt="" src={fillStep} />
              <p className="current-step">Step 1</p>
            </div>
            <div className="step">
              <img alt="" src={fillStep} />
              <p className="current-step">Step 2</p>
            </div>
            <div className="step">
              <img alt="" src={fillStep} />
              <p className="current-step">Step 3</p>
            </div>
            <div className="step">
              <img alt="" src={currentStep}/>
              <p className="current-step">Step 4</p>
            </div>
          </div>
        </div>
        <form>
          <div className="invite">
            <div className="form-group">
              <label className="same-label">Invite a Friend</label>
              <div className="invite-friend">
                <p className="form-control same-input">https://referral_link.com/yourlink</p>
                <button className="btn">Copy</button>
              </div>
            </div>
          </div>
          <div className="invite-socials">
            <h1>Invite a Friend</h1>
            <ul>
              <li><a href="#"><img src={facebook} alt=''/></a></li>
              <li><a href="#"><img src={twitter} alt=''/></a></li>
              <li><a href="#"><img src={email} alt=''/></a></li>
            </ul>
            <p>Share your link to a friend and get a free month for you and your friend.</p>
          </div>
          <div className="details">
            <h1>How Does This Work?</h1>
            <p className="pt-3">
              <span className="no">1- </span>
              <span> If your friend sings up using your link and subscribes to one of our plans, they will get The second month free and you will also get a free month.</span>
            </p>
            <p className="pb-3">
              <span className="no">2- </span>
              <span> Share and Repeat.</span>
            </p>
            <h1 className="pb-2">Learn More About Our Referral Through This Link.</h1>
          </div>
          <div className="submit-btns">
            <Link to='/admin/dashboard' className='skip-btn'><button className="btn" type='button'>Go Back</button></Link>
            <Link to='/signup/payment' className='last-step'><button className="btn next">Next Step</button></Link>
          </div>
        </form>
      </div>

      <footer>
        <ul className="languages">
          <li>English (UK)</li>
          <li>हिन्दी</li>
          <li>ਪੰਜਾਬੀ</li>
          <li>বাংলা</li>
          <li>Deutsch</li>
          <li>ગુજરાતી</li>
          <li>Español</li>
        </ul>
        <p>Copyright © 2021 MeetOcto.</p>
      </footer>
    </div>
  )
}

export default ProfileStepFour
