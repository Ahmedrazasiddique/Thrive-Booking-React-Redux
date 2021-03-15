import axios from '../axios-instance';
import {
     EmailSettings_START ,
     EmailSettings_END ,
     EmailSettings_ERROR ,
     EmailSettings_SUCCESS ,
     EmailSettings_FAIL ,
     IsDataSubmitedSuccessfully
} from '../constants/emailSettings';

export const getEmailSettingsData = id => dispatch => {
    dispatch({
        type: EmailSettings_START,
     
    })
    axios.get('admin/settings/email/1')
        .then( res => {
           
            dispatch({
                type: EmailSettings_SUCCESS,
                payload: res.data.data,
                IsDataSubmitedSuccessfully: false
            })
        })
        .catch(err => 
            dispatch({
                type: EmailSettings_FAIL,
                payload: err.response.data.data
            })
        );
}

export const updateEmailSettingsData = thriveData => dispatch => {
    dispatch({
        type: EmailSettings_START,
     
    })
    axios.post('admin/settings/email/save',thriveData)
        .then( res => {
           
            dispatch({
                type: IsDataSubmitedSuccessfully,
                IsDataSubmitedSuccessfully: true
            })
            getEmailSettingsData(1)(dispatch);
        })
        .catch(err => 
            dispatch({
                type: EmailSettings_SUCCESS,
                payload: err.response.data.data
            })
        );
}
