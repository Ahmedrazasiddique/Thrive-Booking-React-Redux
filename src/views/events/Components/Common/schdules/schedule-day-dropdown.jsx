import React, { Component, Fragment } from 'react';
import moment from 'moment';
import { Card } from 'reactstrap';
import { Calendar, Repeat } from 'react-feather';
import DayScheduleSelectorModal from '../../Modals/DayScheduleSelectorModal';
import WeekdayScheduleModal from '../../Modals/WeekDayScheduleModal';



class ScheduleDayDropdown extends Component {
   
    state = {
        showDayModal: false,
        showWeekdayModal: false,
        showDayDropdown: true,
    }


    showCalendar = () => {
        this.setState({
            showDayModal: true,
            showDayDropdown: false
        });
    }

    handleToggle = () => {
        const { showDayModal } = this.state || {};
        this.setState({
            showDayModal: !showDayModal
        });
    }

    handleWeekToggle = () => {
        const { showWeekdayModal } = this.state || {};
        this.setState({
            showWeekdayModal: !showWeekdayModal
        });
    }

    weekDay = () =>  {
        this.setState({
            showWeekdayModal: true,
            showDayDropdown: false
        });
    }

    render () {
        const { day, staff, businessId } = this.props || {};
        const { showDayModal, showDayDropdown, showWeekdayModal } = this.state || {};
        const { start, box } = day || {};
        const { clientX, clientY } = box || {};
        const yPoint = parseInt(clientY) - 260;
        const xPoint = parseInt(clientX) - 120;
        return (
            <Fragment>
                {
                    showDayModal && <DayScheduleSelectorModal staff={ staff } businessId={ businessId } onToggle={ this.handleToggle } isOpen={ showDayModal }/>
                }

                { 
                    showWeekdayModal && <WeekdayScheduleModal weekDayId = { moment(start).format('d') } staff={ staff } businessId={ businessId } day={ moment(start).format('dddd')} onToggle={ this.handleWeekToggle } isOpen = { showWeekdayModal} />
                }
               { showDayDropdown && <div className="event-day-dropdown"
                    style= {{
                        position: 'absolute',
                        background: '#ffffff',
                        border: '1px solid #fff',
                        borderRadius: '5px',
                        top: `${yPoint}px`,
                        left: `${xPoint}px`,
                        zIndex: 100000
                    }}
                >
                    <div className="event-day">
                        <Card>
                            <ul>
                                <li onClick={ this.showCalendar }><Calendar size="14"/>Edit All Dates</li>
                                <li onClick={ this.weekDay }><Repeat size="14"/>Edit All { moment(start).format('dddd')}s</li>
                            </ul>
                        </Card>
                        
                    </div>
                </div> }
            </Fragment>
           
        )
    }
}


export default ScheduleDayDropdown;