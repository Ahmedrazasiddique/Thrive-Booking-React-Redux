import axios from "../axios-instance";
import {
  SuperAdminDashboard_START,
  SuperAdminDashboard_ERROR,
  SuperAdminDashboard_SUCCESS,
  SuperAdminDashboardFeed_SUCCESS,
  SuperAdminDashboardPie_SUCCESS,
  IsDataSubmitedSuccessfullySuperAdminDashboard,
} from "../constants/superadmindashboard";





export const getDashboardKpis = (filter) => (dispatch) => {
  dispatch({
    type: SuperAdminDashboard_START,
  });
  axios
    .post("super-admin/get-kpis-data", filter)
    .then((res) => {
      dispatch({
        type: SuperAdminDashboard_SUCCESS,
        payload: res.data,
        kpis:res.data
      });
    })
    .catch((err) =>
      dispatch({
        type: SuperAdminDashboard_ERROR,
        payload: err.response.data.data,
      })
    );
};



export const getDashboardSubcriberFeeds = (filter) => (dispatch) => {
    dispatch({
      type: SuperAdminDashboard_START,
    });
    axios
      .post("super-admin/subscriber-logs", filter)
      .then((res) => {
        dispatch({
          type: SuperAdminDashboardFeed_SUCCESS,
          payload: res.data,
          subcriberFeeds:res.data
        });
      })
      .catch((err) =>
        dispatch({
          type: SuperAdminDashboard_ERROR,
          payload: err.response.data.data,
        })
      );
  };


  export const getDashboardPieChart = (filter) => (dispatch) => {
    dispatch({
      type: SuperAdminDashboard_START,
    });
    axios
      .get("super-admin/subscriber-classification-counts", filter)
      .then((res) => {
        dispatch({
          type: SuperAdminDashboardPie_SUCCESS,
          payload: res.data,
          pieChart:res.data
        });
      })
      .catch((err) =>
        dispatch({
          type: SuperAdminDashboard_ERROR,
          payload: err.response.data.data,
        })
      );
  };
