import axios from '../axios-instance';
import {
    Event_START ,
     Event_END ,
     Event_ERROR ,
    Event_SUCCESS ,
     Event_FAIL ,
     IsDataSubmitedSuccessfully
} from '../constants/eventSettings';

export const getEventData = id => dispatch => {
    dispatch({
        type: Event_START, 
     
    })
    axios.get('/admin/settings/event/1')
        .then( res => {
           
            dispatch({
                type: Event_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => 
            dispatch({
                type: Event_FAIL,
                payload: err.response.data.data
            })
        );
}

export const updateEventData = thriveData => dispatch => {
    dispatch({
        type: Event_START,
     
    })
    axios.post('admin/settings/event/save',thriveData)
        .then( res => {
           
            dispatch({
                type: IsDataSubmitedSuccessfully,
                IsDataSubmitedSuccessfully: true
            })
            getEventData(1)(dispatch);
        })
        .catch(err => 
            
            dispatch({
                type: Event_ERROR,
                payload: err.response.data.data
            })
        );
}
