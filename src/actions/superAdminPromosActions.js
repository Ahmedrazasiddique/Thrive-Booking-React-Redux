import axios from "../axios-instance";
import {
    SuperAdminPromoCode_START,
    SuperAdminPromoCode_END,
    SuperAdminPromoCode_SUCCESS,
    IsDataSubmitedSuccessfullySuperAdminPromoCode,
    SuperAdminPromoCode_ERROR
} from "../constants/superadminpromos";


export const getMyPromoCodeListForGrid =  async (filter) => {
  
  
  return axios
    .post("super-admin/promos" , filter)
    
};

export const updateMyPromoCode = (promoData) => (dispatch) => {
  dispatch({
    type: SuperAdminPromoCode_START,
  });
  axios
    .post("super-admin/promo/save", promoData)
    .then((res) => {
      dispatch({
        type: IsDataSubmitedSuccessfullySuperAdminPromoCode,
        IsDataSubmitedSuccessfullySuperAdminPromoCode: true,
      });
     
    })
    .catch((err) =>
    
      dispatch({
        
        type: SuperAdminPromoCode_ERROR,
        payload: err.response,
      })
    );
    dispatch({
      type: SuperAdminPromoCode_END,
    });
};

export const deletePromoCode = (id) => (dispatch) => {
  dispatch({
    type: SuperAdminPromoCode_START,
  });
  axios
    .post("super-admin/promo/delete", { promoId: id })
    .then((res) => {
        getMyPromoCodeListForGrid({
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
        type: SuperAdminPromoCode_ERROR,
        payload: err.response.data.data,
      })
    );
    dispatch({
      type: SuperAdminPromoCode_END,
    });
};

export const updateStatusPromoCode = (data) => (dispatch) => {
  dispatch({
    type: SuperAdminPromoCode_START,
  });

  axios
    .post("super-admin/toggle-promo-status", { id: data.id,status:data.status=="E"?"D":"E" })
    .then((res) => {
      
    })
    .catch((err) =>
      dispatch({
        type: SuperAdminPromoCode_ERROR,
        payload: err.response.data.data,
      })
    );
    dispatch({
      type: SuperAdminPromoCode_END,
    });
};
