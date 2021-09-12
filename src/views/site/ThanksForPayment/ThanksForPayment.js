import React from 'react'
import logoSm from '../../../assets/images/logo-sm.png'
import likeImg from '../../../assets/images/like.png'

const ThanksForPayment = () => {
  return (
    <div className="main-container">
      <header>
        <div className="header-container">
          <div className="logo">
            <img src={logoSm} alt=""/>
          </div>
        </div>
      </header>

      <div className="thanks page">
        <div className="page-desc">
          <img src={likeImg}/>
          <h1>Thanks For Your Payment!</h1>
          <p>An email has been sent to your email
            to confirm your email address.</p>
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

export default ThanksForPayment
