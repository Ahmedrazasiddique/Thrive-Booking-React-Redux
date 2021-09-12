import React from 'react'
import logoSm from '../../../assets/images/logo-sm.png'
import WelcomeIcon from '../../../assets/images/welcome.png'

const WelcomeToMeetOcto = () => {
  return (
    <div className="main-container">
      <header>
        <div className="header-container">
          <div className="logo">
            <img src={logoSm} alt=""/>
          </div>
        </div>
      </header>

      <div className="welcome page">
        <div className="page-desc">
          <img src={WelcomeIcon}/>
          <h1>Welcome to MeetOcto!</h1>
          <p>You may enjoy MeetOcto Pro for 7 days.
            After 7 days, all pro features will be disabled.</p>
          <p className="p2">Learn more about MeetOcto Pro features here.</p>
          <button className="btn" type="button">Okay, take me to my account</button>
        </div>
      </div>

      <footer>
        <div className="footer-container">
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
      </footer>
    </div>
  )
}

export default WelcomeToMeetOcto
