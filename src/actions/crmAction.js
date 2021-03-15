import axios from "../axios-instance";
import {
  Crm_START,
  Crm_ERROR,
  Crm_SUCCESS,
  IsDataSubmitedSuccessfullyCrm,
} from "../constants/crm";
import { getAdminBusinessId } from "../utils/authHelper";

export const getCrm = (filter) => (dispatch) => {
  dispatch({
    type: Crm_START,
  });
  axios
    .post("admin/customers/" + getAdminBusinessId(), filter)
    .then((res) => {
      axios
        .get("company-settings-services")
        .then((countryRes) => {
          dispatch({
            type: Crm_SUCCESS,
            payload: res,
            IsDataSubmitedSuccessfullyCrm: false,
            countryDD: countryRes.data.data.countries,
          });
        })
        .catch((err) =>
          dispatch({
            type: Crm_ERROR,
            payload: null,
          })
        );
    })
    .catch((err) =>
      dispatch({
        type: Crm_ERROR,
        payload: null,
      })
    );
};

export const updateCrm = (CrmData) => (dispatch) => {
  dispatch({
    type: Crm_START,
  });
  axios
    .post("admin/customer/update", CrmData)
    .then((res) => {
      dispatch({
        type: IsDataSubmitedSuccessfullyCrm,
        IsDataSubmitedSuccessfullyCrm: true,
      });
      getCrm({
        pageSize: 10,
        pageNumber: 1,
        sortField: "id",
        sortOrder: "asc",
      })(dispatch);
    })
    .catch((err) =>
      dispatch({
        type: Crm_ERROR,
        payload: err.response.data.data,
      })
    );
};

export const saveCrm = (CrmData) => (dispatch) => {
  dispatch({
    type: Crm_START,
  });
  axios
    .post("admin/customer/create", CrmData)
    .then((res) => {
      dispatch({
        type: IsDataSubmitedSuccessfullyCrm,
        IsDataSubmitedSuccessfullyCrm: true,
      });
      getCrm({
        pageSize: 10,
        pageNumber: 1,
        sortField: "id",
        sortOrder: "asc",
      })(dispatch);
    })
    .catch((err) =>
      dispatch({
        type: Crm_ERROR,
        payload: err.response.data.data,
      })
    );
};

export const deleteCrm = (id) => (dispatch) => {
  dispatch({
    type: Crm_START,
  });
  axios
    .post("admin/customer/delete", { id: id })
    .then((res) => {
      dispatch({
        type: IsDataSubmitedSuccessfullyCrm,
        IsDataSubmitedSuccessfullyCrm: true,
      });
      getCrm({
        pageSize: 10,
        pageNumber: 1,
        sortField: "id",
        sortOrder: "asc",
      })(dispatch);
    })
    .catch((err) =>
      dispatch({
        type: Crm_ERROR,
        payload: err.response.data.data,
      })
    );
};
