import React, { useState } from 'react';
import { Fragment } from 'react';
import * as Icon from "react-feather";
import SidebarProgressPoint from './sidebar-progress-point';


const progressPoints = [
    {
        stepTitle: 'Event Type',
        stepKey: 'step-1'
    },
    {
        stepTitle: 'Event Details',
        stepKey: 'step-2'
    },
    {
        stepTitle: 'Availability',
        stepKey: 'step-3'
    },
    {
        stepTitle: 'Advanced',
        stepKey: 'step-4'
    },
]


const SidebarProgress = () => {

   
    const [isToggle, setToggle ] = useState(false);

    const handleToggle = () => {
        setToggle(!isToggle);
    } 

    return (
        <div className="event-card">
            <div className="event-card-head">
                <h3 className="event-title">New Free Event</h3>
                <span onClick={ handleToggle }>
                   { isToggle ? <Icon.ChevronUp size="16"/>: <Icon.ChevronDown size="16"/>} 
                </span>
            </div>
           {!isToggle && ( <Fragment>
            <div className="event-card-body">
                <ul className="progress-points">
                    {
                        (progressPoints || []).map((e, i) => {
                            return <SidebarProgressPoint point = {e} index = { i + 1 }key = { i }/>
                        }) 
                    }
                </ul>
            </div> 
            <div className="event-card-footer"></div>
           </Fragment> ) }
        </div>    
    )
}

export default SidebarProgress;