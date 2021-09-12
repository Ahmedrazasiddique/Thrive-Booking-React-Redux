import axios from "../axios-instance";
import {
    MyCalendar_START,
    MyCalendar_END,
    MyCalendar_ERROR,
    MyCalendar_SUCCESS,
    MyCalendar_FAIL,
    MyCalendarPopUp_SUCCESS
} from "../constants/mycalendar";
import { getAdminBusinessId } from "../utils/authHelper";

function formatDate  (date)  {
  const d = new Date(date);
  const month = d.getMonth();
  const year = d.getFullYear();
  const day = d.getDate();
  const minutes = d.getMinutes();
  const hours = d.getHours();
  const seconds = d.getSeconds();

  return new Date(year, month, day, hours, minutes, seconds);
}


export const getCalendarView = (filter) => (dispatch) => {
    dispatch({
      type: MyCalendar_START,
    });
    axios
      .post("admin/calendar-or-list-bookings/" + getAdminBusinessId(), filter)
      .then((res) => {
        let newData = [];
        let defaultDate = "";
        for (var i =0;i<res.data.length;i++)
        {
          var changeDateFormate = res.data[i].booking_date.split('-');
          var date = formatDate (changeDateFormate[2]+"-"+changeDateFormate[1]+"-"+changeDateFormate[0])
          defaultDate= changeDateFormate[2]+"-"+changeDateFormate[1]+"-"+changeDateFormate[0];
          newData.push({   id: res.data[i].id,
            title:res.data[i].venue+" with "+res.data[i].invitee_email+" at "+ res.data[i].booking_time,
            allDay: true,
            start: date,
            end: date,})
        }
        dispatch({
            type: MyCalendar_SUCCESS,
            newData:newData,
            defaultDate:defaultDate,
          });

          dispatch({
            type: MyCalendar_END,
          });
      })
      .catch((err) =>
        dispatch({
          type: MyCalendar_ERROR,
          payload: null,
        })
      );
  };

  export const getCalendarListView = (filter) => (dispatch) => {
    dispatch({
      type: MyCalendar_START,
    });
    axios
      .post("admin/calendar-or-list-bookings/" + getAdminBusinessId(), filter)
      .then((res) => {
      
        let newData = [];
        let defaultDate = "";
        for (var i =0;i<res.data.length;i++)
        {
          var changeDateFormate = res.data[i].booking_date.split('-');
          var date = formatDate (changeDateFormate[2]+"-"+changeDateFormate[1]+"-"+changeDateFormate[0]+":"+res.data[i].booking_time)
          defaultDate= changeDateFormate[2]+"-"+changeDateFormate[1]+"-"+changeDateFormate[0];
          newData.push({   id: res.data[i].id,
            title:res.data[i].venue+" with "+res.data[i].invitee_email+" at "+ res.data[i].booking_time,
            start: date,
            end: date,
            type: "global"})
        }
        dispatch({
            type: MyCalendar_SUCCESS,
            newData:newData,
            defaultDate:defaultDate,
            IsSuccess:true
          });
          dispatch({
            type: MyCalendar_END,
          });
      })
      .catch((err) =>
        dispatch({
          type: MyCalendar_ERROR,
          payload: null,
        })
      );
  };
  

  export const getEventInfoMyEventID = (id) => (dispatch) => {
    dispatch({
      type: MyCalendar_START,
    });
    axios
      .get("/admin/booking-details/" + id)
      .then((res) => {
      
        dispatch({
            type: MyCalendarPopUp_SUCCESS,
            eventDetails:res.data
          });

          dispatch({
            type: MyCalendar_END,
          });
      })
      .catch((err) =>
        dispatch({
          type: MyCalendar_ERROR,
          payload: null,
        })
      );
  };
  