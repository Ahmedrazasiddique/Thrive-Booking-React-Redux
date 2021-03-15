import React, { Component } from 'react';



const SidebarProgressPoint = ({ point, index }) => {
    const { stepTitle } = point || {};
    return (
        <li className="progress-point">
            <span className="point-decimal">
                { index }
            </span>
            { stepTitle }
        </li>

    )
}


export default SidebarProgressPoint;