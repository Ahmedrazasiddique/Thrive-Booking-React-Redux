import axios from '../axios-instance';
import {
    SEO_START ,
     SEO_END ,
     SEO_ERROR ,
    SEO_SUCCESS ,
     SEO_FAIL ,
     IsDataSubmitedSuccessfully
} from '../constants/seo';

export const getSeoData = id => dispatch => {
    dispatch({
        type: SEO_START,
     
    })
    axios.get('admin/settings/seo/1')
        .then( res => {
           
            dispatch({
                type: SEO_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => 
            dispatch({
                type: SEO_FAIL,
                payload: err.response.data.data
            })
        );
}

export const updateSeoData = thriveData => dispatch => {
    dispatch({
        type: SEO_START,
     
    })
    axios.post('admin/settings/seo/save',thriveData)
        .then( res => {
           
            dispatch({
                type: IsDataSubmitedSuccessfully,
                IsDataSubmitedSuccessfully: true
            })
            getSeoData(1)(dispatch);
        })
        .catch(err => 
            
            dispatch({
                type: SEO_ERROR,
                payload: err.response.data.data
            })
        );
}
