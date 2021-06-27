import React, { Component } from 'react';
import * as Icon from 'react-feather';
class ToolTip extends Component {
    render () {
        const { position:direction } = this.props || {};
        const type = Math.floor(Math.random() * 3) + 1 
        return(
            <span className="tooltip-wrapper">
                
                <Icon.HelpCircle size="16" />
                <div className={ `tooltip-section ${ direction }`}>
                   <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout</p>
                   {
                       (type === 2) && <img src="https://dzf8vqv24eqhg.cloudfront.net/userfiles/953/1347/ckfinder/images/Calendly%20-%20Jane%20Doe%202016-05-03%2015-12-13.png?dc=201605031907-0" alt="image" />
                   }
                </div>
            </span>
        )
    }
}

export default ToolTip;