import axios from "../axios-instance";
import {
  SpecialOffer_START,
  SpecialOffer_ERROR,
  SpecialOffer_SUCCESS,
  IsDataSubmitedSuccessfullySpecialPromos,
} from "../constants/specialOffer";
import { getAdminBusinessId } from "../utils/authHelper";

export const getMySpecialOffer = (id) => (dispatch) => {
  dispatch({
    type: SpecialOffer_START,
  });
  axios
    .get("admin/settings/special-ribbon/" + getAdminBusinessId())
    .then((res) => {
      dispatch({
        type: SpecialOffer_SUCCESS,
        payload: res,
      });
    })
    .catch((err) =>
      dispatch({
        type: SpecialOffer_ERROR,
        payload: null,
      })
    );
};

export const updateMySpecialOffer = (specialOfferData) => (dispatch) => {
  dispatch({
    type: SpecialOffer_START,
  });
  axios
    .post("admin/settings/special-ribbon/save", specialOfferData)
    .then((res) => {
      dispatch({
        type: IsDataSubmitedSuccessfullySpecialPromos,
        IsDataSubmitedSuccessfullySpecialPromos: true,
      });
      getMySpecialOffer(1)(dispatch);
    })
    .catch((err) =>
      dispatch({
        type: SpecialOffer_ERROR,
        payload: err.response.data.data,
      })
    );
};
