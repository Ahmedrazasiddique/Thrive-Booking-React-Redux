import axios from '../axios-instance';
import {
    Discount_START ,
    Discount_ERROR ,
    Discount_FAIL ,
    Discount_SUCCESS ,
    Discount_END
} from '../constants/discount';

export const getMyDiscountList = filter => dispatch => {
    dispatch({
        type: Discount_START,
     
    })
    axios.get('admin/settings/recurrent-discount/1')
        .then( res => {
       
            dispatch({
                type: Discount_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => 
            dispatch({
                type: Discount_ERROR,
                payload: err.response.data.data
            })
        );
}

export const updateMyDiscount = promoData => dispatch => {
    dispatch({
        type: Discount_START,
     
    })
    axios.post('admin/settings/promo/save',promoData)
        .then( res => {
           
          
            getMyDiscountList( {
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
                type: Discount_ERROR,
                payload: err.response.data.data
            })
        );
}

export const deleteDiscount = id => dispatch => {
    dispatch({
        type: Discount_START,
     
    })
    axios.post('admin/settings/promo/delete',{promoId:id})
        .then( res => {
        
            getMyDiscountList( {
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
                type: Discount_ERROR,
                payload: err.response.data.data
            })
        );
}