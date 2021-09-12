import axios from "../axios-instance";
import {
  AdminDashboard_START,
  AdminDashboard_ERROR,
  AdminDashboardFirst_SUCCESS,
  AdminDashboardSecond_SUCCESS,
  AdminDashboardThird_SUCCESS,
  AdminDashboardForthPortion_SUCCESS,
  AdminDashboardFifthPortion_SUCCESS
} from "../constants/adminDashboard";

import { getAdminBusinessId } from "../utils/authHelper";

export const getDashboardFirst = (filter) => (dispatch) => {
    dispatch({
      type: AdminDashboard_START,
    });
    axios
      .get("admin/crm-get-total-booking-status/"+getAdminBusinessId(), filter)
      .then((res) => {
        dispatch({
          type: AdminDashboardFirst_SUCCESS,
          payload: res.data,
          AdminDashboardFirst:res.data
        });
      })
      .catch((err) =>
        dispatch({
          type: AdminDashboard_ERROR,
          payload: err.response.data.data,
        })
      );
  };

  export const getDashboardSecond = (filter) => (dispatch) => {
    dispatch({
      type: AdminDashboard_START,
    });
    axios
      .get("admin/crm-booked-events/"+getAdminBusinessId(), filter)
      .then((res) => {
        dispatch({
          type: AdminDashboardSecond_SUCCESS,
          payload: res.data,
          AdminDashboardSecond:res.data
        });
      })
      .catch((err) =>
        dispatch({
          type: AdminDashboard_ERROR,
          payload: err.response.data.data,
        })
      );
  };


  export const getDashboardThird = (filter) => (dispatch) => {
    dispatch({
      type: AdminDashboard_START,
    });
    axios
      .get("admin/crm-upcoming-events/"+getAdminBusinessId(), filter)
      .then((res) => {
        dispatch({
          type: AdminDashboardThird_SUCCESS,
          payload: res.data,
          AdminDashboardThird:res.data
        });
      })
      .catch((err) =>
        dispatch({
          type: AdminDashboard_ERROR,
          payload: err.response.data.data,
        })
      );
  };

  export const getDashboardForth = (filter) => (dispatch) => {
    dispatch({
      type: AdminDashboard_START,
    });
    axios
      .get("admin/crm-booking-sales/"+getAdminBusinessId(), filter)
      .then((res) => {
      
        dispatch({
          type: AdminDashboardForthPortion_SUCCESS,
          payload: res.data,
          AdminDashboardForth:res.data
        });
      })
      .catch((err) =>
        dispatch({
          type: AdminDashboard_ERROR,
          payload: err.response.data.data,
        })
      );
  };

  export const getDashboardFifth = (filter) => (dispatch) => {
    dispatch({
      type: AdminDashboard_START,
    });
    axios
      .get("admin/crm-sales-per-booking/"+getAdminBusinessId(), filter)
      .then((res) => {
        dispatch({
          type: AdminDashboardFifthPortion_SUCCESS,
          payload: res.data,
          AdminDashboardFifth:res.data
        });
      })
      .catch((err) =>
        dispatch({
          type: AdminDashboard_ERROR,
          payload: err.response.data.data,
        })
      );
  };