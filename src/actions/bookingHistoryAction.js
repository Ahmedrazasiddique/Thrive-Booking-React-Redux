import axios from "../axios-instance";
import {
    BookingHistory_START,
    BookingHistory_END,
    BookingHistory_ERROR,
    BookingHistory_SUCCESS,
    BookingHistory_FAIL
} from "../constants/bookingHistory";
import { getAdminBusinessId,getLoggedInUserId } from "../utils/authHelper";

export const getBookingHistory =  async (filter) => {
  
  /*dispatch({
    type: BookingHistory_START,
  });
  */
  return axios
    .post("admin/booking-history/" + getAdminBusinessId(), filter)
    
    
   
    
};

export const getCustomerPayment =  async (filter) => {
  
  /*dispatch({
    type: BookingHistory_START,
  });
  */
  return axios
    .post("admin/customer-payments/" + getAdminBusinessId(), filter)
    
    
   
    
};

export const getStaffPayment =  async (filter) => {
  
  /*dispatch({
    type: BookingHistory_START,
  });
  */
  return axios
    .post("staff/payments/" + getLoggedInUserId(), filter)
    
    
   
    
};

export const getStaffBookingHistory =  async (filter) => {
  
  /*dispatch({
    type: BookingHistory_START,
  });
  */
  return axios
    .post("staff/bookings/" + getLoggedInUserId(), filter)
    
    
   
    
};

export const getSuperAdminSubscriber =  async (filter) => {
  
  /*dispatch({
    type: BookingHistory_START,
  });
  */
  return axios
    .post("super-admin/subscribers", filter)
    
    
   
    
};


export const getSuperAdminReferrals =  async (filter) => {
  
  /*dispatch({
    type: BookingHistory_START,
  });
  */
  return axios
    .post("super-admin/referrals", filter)
    
    
   
    
};

