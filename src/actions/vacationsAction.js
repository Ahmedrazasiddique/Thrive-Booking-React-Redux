import axios from "../axios-instance";
import {
  Vacation_START,
  Vacation_ERROR,
  Vacation_SUCCESS,
  IsDataSubmitedSuccessfullyVacation,
} from "../constants/vacation";
import { getAdminBusinessId } from "../utils/authHelper";

export const getMyVacation = (filter) => (dispatch) => {
  dispatch({
    type: Vacation_START,
  });
  axios
    .post("admin/vacations/" + getAdminBusinessId(), filter)
    .then((res) => {
      dispatch({
        type: Vacation_SUCCESS,
        payload: res,
        IsDataSubmitedSuccessfullyVacation: false,
      });
    })
    .catch((err) =>
      dispatch({
        type: Vacation_ERROR,
        payload: null,
      })
    );
};

export const updateMyVacation = (VacationData) => (dispatch) => {
  dispatch({
    type: Vacation_START,
  });
  axios
    .post("admin/vacation/save", VacationData)
    .then((res) => {
      dispatch({
        type: IsDataSubmitedSuccessfullyVacation,
        IsDataSubmitedSuccessfullyVacation: true,
      });
      getMyVacation({
        pageSize: 10,
        pageNumber: 1,
        sortField: "id",
        sortOrder: "asc",
      })(dispatch);
    })
    .catch((err) =>
      dispatch({
        type: Vacation_ERROR,
        payload: err.response.data.data,
      })
    );
};

export const deleteVacation = (id) => (dispatch) => {
  dispatch({
    type: Vacation_START,
  });
  axios
    .post("admin/vacation/delete", { vacationId: id })
    .then((res) => {
      getMyVacation({
        pageSize: 10,
        pageNumber: 1,
        sortField: "id",
        sortOrder: "asc",
      })(dispatch);
    })
    .catch((err) =>
      dispatch({
        type: Vacation_ERROR,
        payload: err.response.data.data,
      })
    );
};
