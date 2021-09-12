import React from 'react'
import logSm from '../../../assets/images/logo-sm.png'
import userImg from '../../../assets/images/user.png'
import heartImg from '../../../assets/images/heart.png'

const DoneAndWelcome = () => {
  return (
    <div className="main-container">
      <header>
        <div className="header-container">
          <div className="logo">
            <img src={logSm} alt=""/>
          </div>
          <div className="user">
            <div>
              <img src={userImg}/>
            </div>
            <div>
              <h1>Buff Brown</h1>
              <p className="m-0">Sign me out</p>
            </div>
          </div>
        </div>
      </header>

      <div className="done-thanks page">
        <div className="page-desc">
          <img src={heartImg}/>
          <h1>Done and Welcome to MeetOcto!</h1>
          <p>Learn more about MeetOcto Pro features here.</p>
          <button className="btn" type="button">Take me to my account</button>
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

export default DoneAndWelcome
