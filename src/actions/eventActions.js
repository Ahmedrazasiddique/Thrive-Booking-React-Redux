import axios from '../axios-instance';
import { fallBackErrorMessage } from "../constants/event";


export const getVenues = (options) => dispatch => {
    const { onSuccess, onError } = options || {};
    axios.get('venues')
    .then( res => {
        const { data: resData } = res || {};
        const { data } = resData || {};
        if(onSuccess) {
            const { venues } = data || {};
            onSuccess(venues);
        }
    })
    .catch(err => {
        if(onError) {
            onError(err);
        } 
    });
}


export const getEventTypes = (options) => dispatch => {
    const { onSuccess, onError } = options || {};
    axios.get('event-types')
        .then( res => {
            const { data: resData } = res || {};
            const { data } = resData || {};
            if(onSuccess) {
                const { eventTypes } = data || {}; 
                onSuccess(eventTypes);
            }
        })
        .catch(err => {
            if(onError) {
                onError(err);
            } 
        });
}


export const saveEventType = (options) => dispatch => {
    const { onSuccess, onError, data, eventId } = options || {};

    let formData = data;

    if(eventId) {
        formData = {
            ...data,
            id: eventId
        }
    }

    console.log({
        data,
        formData
    })
    axios.post('admin/event/save-event-type-page', formData)
    .then( res => {
        const { data: resData } = res || {};
        const { data } = resData || {};
        if(onSuccess) {
            const { data: event } = data || {};
            const { id } = event || {};
            onSuccess(id);
        }
    })
    .catch(error => {
        const { data: errorData } = error.response;
        const message = errorData.message || error.message || fallBackErrorMessage;
        
        if(onError) {
            onError(message);
        } 
    });
}


export const saveEventDetails = (options) => {
    const { onSuccess, onError, data } = options || {};
    axios.post('admin/event/save-event-details-page', data)
    .then( res => {
        const { data: resData } = res || {};
        const { data } = resData || {};
        if(onSuccess) {
            const { data: event } = data || {};
            const { id } = event || {};
            onSuccess(id);
        }
    })
    .catch(error => {
        const { data: errorData } = error.response;
        const message = errorData.message || error.message || fallBackErrorMessage;
        
        if(onError) {
            onError(message);
        } 
    });
}


export const saveAdHocEvent = (options) => {
    const { onSuccess, onError, data } = options || {};
    axios.post('admin/create-adhoc-event', data)
    .then( res => {
        const { data: resData } = res || {};
        const { data, message } = resData || {};

        if(onSuccess) {
            const { data: event } = data || {};
            const { id } = event || {};
            onSuccess(message);
        }
    })
    .catch(error => {
        const { data: errorData } = error.response;
        const message = errorData.message || error.message || fallBackErrorMessage;
        
        if(onError) {
            onError(message);
        } 
    });
}


// list events

export const getEvents = (options) => async dispatch => {
    const { onSuccess, onError, data } = options || {};
    const { bussinessId } = data || {};
    axios.get(`admin/events/${ bussinessId }`)
    .then(res => {
        const { data: resData } = res || {};
        const { data } = resData || {};
        if(onSuccess) {
            onSuccess (data);
        }
    })
    .catch(error => {
        const { data: errorData } = error.response;
        const message = errorData.message || error.message || fallBackErrorMessage;
        
        if(onError) {
            onError(message);
        } 
    });

}

export const getEventStaffList = (options) => dispatch => {
    const { data, onSuccess, onError } = options || {};
    const { businessId } = data || {};
    axios.post(`/admin/staffs/${ businessId }`, {
        'pageSize': 10,
        'page': 1,
        'sortField': 'id',
        'sortOrder': 'asc'
    })
    .then( res => {
        const { data: resData } = res || {};
        const { entity: data } = resData || {};
        if(onSuccess) {
            onSuccess(data);
        }
    })
    .catch(err => {
        if(onError) {
            onError(err);
        } 
    });

}


export const getStaffSchedule = (options) => async dispatch => {
    const { data, onSuccess, onError } = options || {};
    const { id } = data || {};

    axios.get(`/admin/schedule/get-staff-schedule/${ id }`)
    .then( res => {
        const { data: resData } = res || {};
        const { data } = resData || {};
        const { schedules } = data || {};
        if(onSuccess) {
            onSuccess(schedules);
        }
    })
    .catch(err => {
        if(onError) {
            onError(err);
        } 
    });
}


// get base event details


export const getEventTypeDetails = (options) => async dispatch => {
    const { data, onSuccess, onError } = options || {};
    const { id } = data || {};

    axios.get(`/admin/event/event-type-page/${ id }`)
    .then( res => {
        const { data: resData } = res || {};
        const { data } = resData || {};

        if(onSuccess) {
            onSuccess(data);
        }
    })
    .catch(err => {
        if(onError) {
            onError(err);
        } 
    });
}


// get event details


export const getEventDetails = (options) => async dispatch => {
    const { data, onSuccess, onError } = options || {};
    const { id, type:eventType } = data || {};

    axios.get(`/admin/event/${eventType}-details-page/${ id }`)
    .then( res => {
        const { data: resData } = res || {};
        const { data } = resData || {};

        if(onSuccess) {
            onSuccess(data);
        }
    })
    .catch(err => {
        if(onError) {
            onError(err);
        } 
    });
}
