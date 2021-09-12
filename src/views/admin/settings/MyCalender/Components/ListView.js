import React, { Component, Fragment } from 'react';
import moment from 'moment';
import { Calendar, momentLocalizer  } from 'react-big-calendar';
import EventInformationModal from './EventInformationModal';
import { connect } from "react-redux";
import {
    getCalendarListView,
    getEventInfoMyEventID
} from "../../../../../actions/myCalendarActions";
import Loader from "../../../../../../src/components/Loader/Loader";

import event from "./event";
import EventWrapper from "./EventWrapper";

const localizer = momentLocalizer(moment);
const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: 'lightblue',
    },
  })

class ListView extends React.Component {


    componentDidMount() {
        const { getCalendarListView } = this.props;
        getCalendarListView(this.state.filter);
      }

    
  componentDidUpdate(previousProp) {
    if (previousProp !== this.props) {

        if(this.props.IsPopUpShow)
        {
            this.setState({openTagModal:true})
            this.setState({bookingDetails:this.props.eventDetails.data})
        }else
        {
           // this.setState({openTagModal:false})
        }
console.log(this.props.CalendarData)
    }
}



getModelData = (id) => {
    this.props.getEventInfoMyEventID(id);
};
    toggleModal = (id) => {
        this.setState((prevState) => ({
          openTagModal: !prevState.openTagModal,
        }));
      };
     
    state = {
        startDate: moment().format("YYYY-MM-DD"),
        endDate: moment().add(5, 'days').format("YYYY-MM-DD"),
        showModal: false,
        selectedEvent: null,
        openTagModal: false,
    ModalOpenPreview: false,
    filter:{
        is_calendar_view:"D",
        filter:{selected_date:"",staff:""}
    },
    bookingID:0,
    IsPopUpShow:false,
    bookingDetails:{}
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
            selectedEvent: event,
        })

    }

    render() {
        const { startDate, endDate, showModal, selectedEvent } = this.state || {};
        const { staff, businessId } = this.props || {};
        return (
            <>
            <Loader isShowLoader={this.props.IsShowLoader}></Loader>
                {/* <EventSchedulingModal toggleModal = { this.toggleModal }  errors={ errors } touched = { touched } isOpen = {showModal}/> */}
              
              
{this.props.defaultDate?
<Calendar
 
  events={this.props.CalendarData?this.props.CalendarData
    :[]}
  defaultDate={this.props.defaultDate}
  //defaultDate={"2021-05-22"}
  onSelectEvent={event =>this.getModelData(event.id)}
  defaultView="day"
  //events={event} 
  views={["day"]}
  
  localizer={localizer}
  />:<></>
}
{
    this.state.openTagModal&&
<EventInformationModal
                  toggleModal={this.toggleModal}
                  ModalOpen={this.state.openTagModal}
                  eventDetails={this.state.bookingDetails}
                ></EventInformationModal>
}           
                
               
                    {/* showModal && <ScheduleDayDropdown staff = { staff } businessId = { businessId } day={ selectedEvent }/> */}
    
            </>
        )
    }
  
}


const mapStateToProps = (state) => {
  
    return {
      CalendarData: state.mycalendar.newData,
      IsShowLoader: state.mycalendar.IsLoaderShow,
      IsPopUpShow:state.mycalendar.IsPopUpShow,
      eventDetails:state.mycalendar.eventDetails,
      defaultDate:state.mycalendar.defaultDate,
      IsSuccess:state.mycalendar.IsSuccess
    };
  };
  
  const actionMethods = {
    getCalendarListView: getCalendarListView,
    getEventInfoMyEventID:getEventInfoMyEventID
  };
  
  export default connect(mapStateToProps, actionMethods)(ListView);