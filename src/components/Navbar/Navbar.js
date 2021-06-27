import React from 'react';
import logo from '../../assets/fe-images/logo.png';

function Navbar() {
  return (
    <div>
      <nav>
        <div className="nav-container">
          <div className="logo">
            <img src={logo} />
          </div>
          <div className="links-side-btns">
            <ul className="links">
              <li>
                <a className="active" href="#">
                  Home
                </a>
              </li>
              <li>
                <a href="#">Features</a>
              </li>
              <li>
                <a href="#">How it works</a>
              </li>
              <li>
                <a href="#">Octo For</a>
              </li>
              <li>
                <a href="#">Pricing</a>
              </li>
            </ul>
            <ul className="side-bnts">
              <li>
                <button className="btn login">Login</button>
              </li>
              <li>
                <button className="btn signup">Signup</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
