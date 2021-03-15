import axios from '../axios-instance';
import {
    ThriveLink_START ,
    ThriveLink_ERROR ,
    ThriveLink_FAIL ,
    ThriveLink_SUCCESS ,
    ThriveLink_END,
    IsDataSubmitedSuccessfully
} from '../constants/myThriveLink';

export const getMyThriveLink = id => dispatch => {
    dispatch({
        type: ThriveLink_START,
     
    })
    axios.get('admin/settings/company/1')
        .then( res => {
           
            dispatch({
                type: ThriveLink_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => 
            dispatch({
                type: ThriveLink_ERROR,
                payload: null
            })
        );
}

export const updateMyThriveLink = thriveData => dispatch => {
    dispatch({
        type: ThriveLink_START,
     
    })
    axios.post('admin/settings/my-thrive-link/save',thriveData)
        .then( res => {
           
            dispatch({
                type: IsDataSubmitedSuccessfully,
                IsDataSubmitedSuccessfully: true
            })
            getMyThriveLink(1)(dispatch);
        })
        .catch(err => 
            dispatch({
                type: ThriveLink_ERROR,
                payload: err.response.data.data
            })
        );
}
