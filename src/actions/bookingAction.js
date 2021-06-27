import axios from "../axios-instance";
import {
  Booking_START,
  Booking_ERROR,
  Booking_SUCCESS,
  IsDataSubmitedSuccessfully,
  BookingCompany_SUCCESS,
  BookingEventList_SUCCESS,
  SingleEvent_SUCCESS,
  AvalaibleSlots_SUCCESS,
  PaidEvent_SUCCESS,
  FreeEvent_SUCCESS,
  PaidEvent_FAIL,
  FreeEvent_FAIL
} from "../constants/booking";
import { getAdminBusinessId } from "../utils/authHelper";

export const getCompanyData = (id) => (dispatch) => {
  dispatch({
    type: Booking_START,
  });
  axios
    .get("admin/settings/company/1")
    .then((res) => {

      dispatch({
        type: BookingCompany_SUCCESS,
        payload: res.data,
      
      });

    })
    .catch((err) =>
      dispatch({
        type: Booking_ERROR,
        payload: err.response.data.data,
      })
    );
};

export const getEventsList = (id) => (dispatch) => {
    dispatch({
      type: Booking_START,
    });
    axios
      .get("/admin/events/1")
      .then((res) => {
  
        dispatch({
          type: BookingEventList_SUCCESS,
          payload: res.data,
        
        });
  
      })
      .catch((err) =>
        dispatch({
          type: Booking_ERROR,
          payload: err.response.data.data,
        })
      );
  };

  
export const getEventByID = (id) => (dispatch) => {
    dispatch({
      type: Booking_START,
    });
    axios
      .get("/admin/event/show/"+id)
      .then((res) => {
  
        dispatch({
          type: SingleEvent_SUCCESS,
          payload: res.data,
        
        });
  
      })
      .catch((err) =>
        dispatch({
          type: Booking_ERROR,
          payload: err.response.data.data,
        })
      );
  };


  
export const getAvalaibleSlots = (data) => (dispatch) => {
  dispatch({
    type: Booking_START,
  });
  axios
    .post("available-time-slots", data)
    .then((res) => {

     
      dispatch({
        type: AvalaibleSlots_SUCCESS,
        payload: res.data,
      
      });
      //  getBookingData(1)(dispatch);
    })
    .catch((err) =>
      dispatch({
        type: Booking_ERROR,
        payload: err.response.data.data,
        //  IsDataSubmitedSuccessfully:false
      })
    );
};


export const savePaidEvent = (data) => (dispatch) => {
  dispatch({
    type: Booking_START,
  });
  axios
    .post("booking/save", data)
    .then((res) => {

     
      dispatch({
        type: PaidEvent_SUCCESS,
        payload: res.data,
      
      });
      //  getBookingData(1)(dispatch);
    })
    .catch((err) =>
      dispatch({
        type: PaidEvent_FAIL,
      //payload: err.response.data.data,
      PaidEvent_fail:true
      })
    );
};


export const saveFreeEvent = (data) => (dispatch) => {
  dispatch({
    type: Booking_START,
  });
  axios
    .post("booking/save-free-booking", data)
    .then((res) => {

     
      dispatch({
        type: FreeEvent_SUCCESS,
        payload: res.data,
      
      });
      //  getBookingData(1)(dispatch);
    })
    .catch((err) =>{
      
      dispatch({
        type: FreeEvent_FAIL,
        FreeEvent_fail:true
       // payload: err.response.data.data,
        //  IsDataSubmitedSuccessfully:false
      })
    });
};




export const updateBookingData = (thriveData) => (dispatch) => {
  dispatch({
    type: Booking_START,
  });
  axios
    .post("admin/settings/company/save", thriveData)
    .then((res) => {
      dispatch({
        type: IsDataSubmitedSuccessfully,
        IsDataSubmitedSuccessfully: true,
      });
      //  getBookingData(1)(dispatch);
    })
    .catch((err) =>
      dispatch({
        type: Booking_ERROR,
        payload: err.response.data.data,
        //  IsDataSubmitedSuccessfully:false
      })
    );
};
