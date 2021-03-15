import axios from "../axios-instance";
import {
  MyChangePassword_START,
  MyChangePassword_ERROR,
  IsDataSubmitedSuccessfullyChangePassword,
} from "../constants/myChangePassword";
import { getAdminBusinessId } from "../utils/authHelper";

export const updateMyChangePassword = (changePassword) => (dispatch) => {
  dispatch({
    type: MyChangePassword_START,
  });
  axios
    .post("user/change-pasword/" + getAdminBusinessId(), changePassword)
    .then((res) => {
      dispatch({
        type: IsDataSubmitedSuccessfullyChangePassword,
        IsDataSubmitedSuccessfullyChangePassword: true,
      });
    })
    .catch((err) =>
      dispatch({
        type: MyChangePassword_ERROR,
        payload: err.response.data.data,
      })
    );
};
