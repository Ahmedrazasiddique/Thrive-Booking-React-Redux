import axios from "../axios-instance";
import {
 PlanManager_START ,
PlanManager_END ,
PlanManager_ERROR ,
 PlanManager_SUCCESS ,
 PlanManager_FAIL ,
IsDataSubmitedSuccessfully
} from "../constants/planManager";

export const getPlanData = (id) => (dispatch) => {
    dispatch({
      type: PlanManager_START,
    });
    axios
      .get("super-admin/plans")
      .then((res) => {
        dispatch({
          type: PlanManager_SUCCESS,
          payload: res.data.data,
          planManagerData:res.data.data
        });
      })
      .catch((err) =>
        dispatch({
          type: PlanManager_FAIL,
          payload: err.response.data.data,
        })
      );
  };