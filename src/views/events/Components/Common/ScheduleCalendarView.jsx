import React, { Component, Fragment } from 'react';
import moment from 'moment';
import EventSchedulingModal from '../Modals/EventSchedulingModal';
import { Calendar, momentLocalizer  } from 'react-big-calendar';
import ScheduleDayDropdown from './schdules/schedule-day-dropdown';



const localizer = momentLocalizer(moment);

class ScheduleCalendarView extends Component {

    state = {
        startDate: moment().format("YYYY-MM-DD"),
        endDate: moment().add(5, 'days').format("YYYY-MM-DD"),
        showModal: false,
        selectedEvent: null

    }


    toggleModal = () => {
        const { showModal } = this.state || {};

        this.setState({
            showModal: !showModal
        })
    }


    handleChange = ({ target }) => {
        const { value } = target || {};
        const { getStaffSchedule } = this.props || {};

        getStaffSchedule({
            data: {
                id: value,
            },
            onSuccess: (events) => {
                console.log({
                    events
                })
                const { schedule_details } = events || {};

                let schedules = this.formatSchedules(schedule_details);

                console.log({
                    schedules
                })


                this.setState({
                    events: schedules
                }, () => {
                    const { events } = this.state;
                    console.log(`after...`, {
                        events
                    })
                })

                
            },
            onError: (error) => {
                console.log({
                    error
                })
            }
        });
    }

    formatSchedules = (schedules) => {

        let newSchedules = [];
        
        (schedules || []).forEach((schedule) => {
            const { dated, schedule_availability } = schedule || {};
            if(dated) {
                const newDate = moment(dated).format('YYYY-MM-DD');
                (schedule_availability || []).forEach((scheduleDetail) => {
                    const { id ,start_time, end_time } = scheduleDetail || {};
                    const start = this.formatDate(`${newDate} ${start_time}`);
                    const end = this.formatDate(`${newDate} ${end_time}`);

                    const schedule = {
                        start,
                        end,
                        id,
                        title: `${ start_time } - ${ end_time }`
                    }

                    newSchedules.push(schedule);
                });
            }
        });

        return newSchedules;
    }

    formatDate = (date) => {
        const d = new Date(date);
        const month = d.getMonth();
        const year = d.getFullYear();
        const day = d.getDate();
        const minutes = d.getMinutes();
        const hours = d.getHours();
        const seconds = d.getSeconds();

        return new Date(year, month, day, hours, minutes, seconds);
    }

    handleSelect = (event) => {
        this.setState({
            showModal: true,
            selectedEvent: event
        })

    }

    render() {
        const { startDate, endDate, showModal, selectedEvent } = this.state || {};
        const { staff, businessId } = this.props || {};
        return (
            <Fragment>
                {/* <EventSchedulingModal toggleModal = { this.toggleModal }  errors={ errors } touched = { touched } isOpen = {showModal}/> */}
                <div className="availbility-container-wrapper">
                    <Calendar
                        localizer={localizer}
                        events={[]}
                        startAccessor={startDate}
                        endAccessor={endDate}
                        defaultDate={new Date()}
                        onSelectEvent={event => alert(event.title)}
                        onSelectSlot={this.handleSelect}
                        selectable
                        views={ ['month'] }
                    />
                    { showModal && <ScheduleDayDropdown staff = { staff } businessId = { businessId } day={ selectedEvent }/> }

                </div>
            </Fragment>
        )
    }
}


export default ScheduleCalendarView;