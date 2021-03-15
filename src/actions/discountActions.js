import axios from "../axios-instance";
import {
  Discount_START,
  Discount_ERROR,
  Discount_SUCCESS,
  IsDataSubmitedSuccessfully,
} from "../constants/discount";
import { getAdminBusinessId } from "../utils/authHelper";

export const getMyDiscountList = (filter) => (dispatch) => {
  dispatch({
    type: Discount_START,
  });
  axios
    .get("admin/settings/recurrent-discount/" + getAdminBusinessId())
    .then((res) => {
      dispatch({
        type: Discount_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: Discount_ERROR,
        payload: err.response.data.data,
      })
    );
};

export const updateMyDiscount = (promoData) => (dispatch) => {
  dispatch({
    type: Discount_START,
  });
  axios
    .post("admin/settings/promo/save", promoData)
    .then((res) => {
      getMyDiscountList({
        pageSize: 10,
        pageNumber: 1,
        filter: {
          coupon_code: "",
        },
        sortField: "id",
        sortOrder: "asc",
      })(dispatch);
    })
    .catch((err) =>
      dispatch({
        type: Discount_ERROR,
        payload: err.response.data.data,
      })
    );
};

export const deleteDiscount = (id) => (dispatch) => {
  dispatch({
    type: Discount_START,
  });
  axios
    .post("admin/settings/promo/delete", { promoId: id })
    .then((res) => {
      getMyDiscountList({
        pageSize: 10,
        pageNumber: 1,
        filter: {
          coupon_code: "",
        },
        sortField: "id",
        sortOrder: "asc",
      })(dispatch);
    })
    .catch((err) =>
      dispatch({
        type: Discount_ERROR,
        payload: err.response.data.data,
      })
    );
};

export const updateRecurrentDiscount = (reccurentDiscount) => (dispatch) => {
  dispatch({
    type: Discount_START,
  });
  axios
    .post("admin/settings/recurrent-discount/save", reccurentDiscount)
    .then((res) => {
      dispatch({
        type: IsDataSubmitedSuccessfully,
        IsDataSubmitedSuccessfully: true,
      });
      getMyDiscountList(null)(dispatch);
    })
    .catch((err) =>
      dispatch({
        type: Discount_ERROR,
        payload: err.response.data.data,
      })
    );
};
