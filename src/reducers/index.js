import { combineReducers } from 'redux';

import errorReducer from './errorReducer';
import authReducer from './authReducer';
import calenderReducer from './calenderReducer';
import myThriveLinkReducer from './myThriveLinkReducer';
import seoReducer from './seoReducer';
import emailSettingsReducer from './emailSettingsReducer';
import promoCodeReducer from './promoCodeReducer';
import discountReducer from './discountReducer';
import companyInfoReducer from './companyInfoReducer';
import myProfileInfoReducer from './myProfileReducer';
import myChangePasswordReducer from './myChangePasswordReducer';
import emailTemplateReducer from './emailTemplateReducer';
import smsTemplateReducer from './smsTemplateReducer';
import eventSettingsReducer from './eventSettingsReducer';

export default combineReducers({
    errors: errorReducer,
    auth: authReducer,
    calendar: calenderReducer,
    myThriveLink:myThriveLinkReducer,
    seo:seoReducer,
    emailSettings:emailSettingsReducer,
    promoCode:promoCodeReducer,
    discount:discountReducer,
    companyInfo:companyInfoReducer,
    myProfile:myProfileInfoReducer,
    myChangePassword:myChangePasswordReducer,
    emailTemplate:emailTemplateReducer,
    smsTemplate:smsTemplateReducer,
    eventSettings:eventSettingsReducer
});