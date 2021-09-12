import axios from "../axios-instance";
import {
    BookingHistory_START,
    BookingHistory_END,
    BookingHistory_ERROR,
    BookingHistory_SUCCESS,
    BookingHistory_FAIL
} from "../constants/bookingHistory";
import { getAdminBusinessId,getLoggedInUserId } from "../utils/authHelper";

export const getAdminReferrals =  async (filter) => {
  
  /*dispatch({
    type: BookingHistory_START,
  });
  */
  return axios
    .post("admin/referrals", filter)
    
    
   
    
};
