import axios from "../axios-instance";
import {
  Payment_START,
  Payment_ERROR,
  Payment_SUCCESS,
  PaymentLocallySuccess,
  PaymentPaypalSuccess,
  PaymentStripeSuccess,
} from "../constants/payment";
import { getAdminBusinessId } from "../utils/authHelper";

export const getMyPayment = (id) => (dispatch) => {
  dispatch({
    type: Payment_START,
  });
  axios
    .get("admin/settings/payment-details/" + getAdminBusinessId())
    .then((res) => {
      dispatch({
        type: Payment_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: Payment_ERROR,
        payload: null,
      })
    );
};

export const updatePayLocal = (paymentData) => (dispatch) => {
  dispatch({
    type: Payment_START,
  });
  axios
    .post("admin/settings/pay-locally/save", paymentData)
    .then((res) => {
      dispatch({
        type: PaymentLocallySuccess,
        PaymentLocallySuccess: true,
      });
    })
    .catch((err) =>
      dispatch({
        type: Payment_ERROR,
        payload: err.response.data.data,
      })
    );
};

export const updatePayPal = (paymentData) => (dispatch) => {
  dispatch({
    type: Payment_START,
  });
  axios
    .post("admin/settings/paypal/save", paymentData)
    .then((res) => {
      dispatch({
        type: PaymentPaypalSuccess,
        PaymentPaypalSuccess: true,
      });
    })
    .catch((err) =>
      dispatch({
        type: Payment_ERROR,
        payload: err.response.data.data,
      })
    );
};

export const updateStripe = (paymentData) => (dispatch) => {
  dispatch({
    type: Payment_START,
  });
  axios
    .post("admin/settings/stripe/save", paymentData)
    .then((res) => {
      dispatch({
        type: PaymentStripeSuccess,
        PaymentStripeSuccess: true,
      });
    })
    .catch((err) =>
      dispatch({
        type: Payment_ERROR,
        payload: err.response.data.data,
      })
    );
};
