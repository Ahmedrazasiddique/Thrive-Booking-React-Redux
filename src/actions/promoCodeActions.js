import axios from '../axios-instance';
import {
    PromoCode_START ,
    PromoCode_ERROR ,
    PromoCode_FAIL ,
    PromoCode_SUCCESS ,
    PromoCode_END,
    IsDataSubmitedSuccessfully
} from '../constants/promoCode';

export const getMyPromoCodeList = filter => dispatch => {
    dispatch({
        type: PromoCode_START,
     
    })
    axios.post('admin/settings/promos',filter)
        .then( res => {
       
            dispatch({
                type: PromoCode_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => 
            dispatch({
                type: PromoCode_ERROR,
                payload: err.response.data.data
            })
        );
}

export const updateMyPromoCode = promoData => dispatch => {
    dispatch({
        type: PromoCode_START,
     
    })
    axios.post('admin/settings/promo/save',promoData)
        .then( res => {
           
            dispatch({
                type: IsDataSubmitedSuccessfully,
                IsDataSubmitedSuccessfully: true
            })
            getMyPromoCodeList( {
                pageSize:10,
                pageNumber:1,
                filter:{
                  coupon_code:''
                },
                sortField:"id",
                sortOrder:"asc"
              })(dispatch);
        })
        .catch(err => 
            dispatch({
                type: PromoCode_ERROR,
                payload: err.response.data.data
            })
        );
}

export const deletePromoCode = id => dispatch => {
    dispatch({
        type: PromoCode_START,
     
    })
    axios.post('admin/settings/promo/delete',{promoId:id})
        .then( res => {
        
            getMyPromoCodeList( {
                pageSize:10,
                pageNumber:1,
                filter:{
                  coupon_code:''
                },
                sortField:"id",
                sortOrder:"asc"
              })(dispatch);
        })
        .catch(err => 
            dispatch({
                type: PromoCode_ERROR,
                payload: err.response.data.data
            })
        );
}