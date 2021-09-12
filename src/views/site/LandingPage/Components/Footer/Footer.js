import React from 'react'
import {Link} from 'react-router-dom'
import Logo from '../../../../../assets/images/logo.png'
import fbIcon from '../../../../../assets/icons/fb.svg'
import twitterIcon from '../../../../../assets/icons/twitter.svg'
import instaIcon from '../../../../../assets/icons/insta.svg'

export const Footer = () => {
  return (
    <footer>
      <div className="wrapper">
        <div className="logo-links">
          <div className="logo">
            <img src={Logo} />
          </div>
          <ul className="footer-links">
            <li><a href="#">Home</a></li>
            <li><a href="#">Features</a></li>
            <li><a href="#">How it works</a></li>
            <li><a href="#">Octo For</a></li>
            <li><a href="#">Pricing</a></li>
            <li><Link to='/signup'>Signup</Link></li>
            <li><Link to='/login'>Login</Link></li>
          </ul>
        </div>
        <div className="copy-right">
          <p>© 2021 MeetOcto. All Rights Reserved.</p>
          <ul className="social-links">
            <li><a href="#"><img src={fbIcon} /></a></li>
            <li><a href="#"><img src={twitterIcon} /></a></li>
            <li><a href="#"><img src={instaIcon} /></a></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
