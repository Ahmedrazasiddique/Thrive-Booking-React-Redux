import React from 'react'
import logoLg from '../../../assets/images/lg-logo.png'
import crossBtn from '../../../assets/images/clear.png'
import cnfirmEmail from '../../../assets/images/confrim-email.png'

const ConfirmEmail = () => {
  return (
    <div className="signup-process">
      <div className="logo-side">
        <img src={logoLg}/>
      </div>
      <div className="signup">
        <div className="cross-btn">
          <img width="33" src={crossBtn}/>
        </div>
        <div className="confirm-email">
          <img src={cnfirmEmail}/>
          <h1>Email Sent!</h1>
          <p>Confirm your email to access your account.</p>
        </div>
        <div className="signup-footer">
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
        </div>
      </div>
    </div>
  )
}

export default ConfirmEmail
