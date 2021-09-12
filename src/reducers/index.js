import { combineReducers } from "redux";

import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import calenderReducer from "./calenderReducer";
import myThriveLinkReducer from "./myThriveLinkReducer";
import seoReducer from "./seoReducer";
import emailSettingsReducer from "./emailSettingsReducer";
import promoCodeReducer from "./promoCodeReducer";
import discountReducer from "./discountReducer";
import companyInfoReducer from "./companyInfoReducer";
import myProfileInfoReducer from "./myProfileReducer";
import myChangePasswordReducer from "./myChangePasswordReducer";
import emailTemplateReducer from "./emailTemplateReducer";
import smsTemplateReducer from "./smsTemplateReducer";
import eventSettingsReducer from "./eventSettingsReducer";
import specialOfferReducer from "./specialOfferReducer";
import paymentReducer from "./paymentReducer";
import vacationReducer from "./vacationReducer";
import crmReducer from "./crmReducer";
import directoryInformationReducer from "./directoryInformationReducer";
import bookingReducer from "./bookingReducer";
import layoutReducer from "./layoutReducer";
import bookingHistoryReducer from "./bookingHistoryReducer";
import superAdminPromosReducer from "./superAdminPromosReducer";
import myCalendarReducer from "./myCalendarReducer";
import superAdminDashboardReducer from "./superAdminDashboardReducer";
import planManagerReducer from "./planManagerReducer";
import adminDashboardReducer from "./adminDashboardReducer";

export default combineReducers({
  errors: errorReducer,
  auth: authReducer,
  calendar: calenderReducer,
  myThriveLink: myThriveLinkReducer,
  seo: seoReducer,
  emailSettings: emailSettingsReducer,
  promoCode: promoCodeReducer,
  discount: discountReducer,
  companyInfo: companyInfoReducer,
  myProfile: myProfileInfoReducer,
  myChangePassword: myChangePasswordReducer,
  emailTemplate: emailTemplateReducer,
  smsTemplate: smsTemplateReducer,
  eventSettings: eventSettingsReducer,
  specialOffer: specialOfferReducer,
  payment: paymentReducer,
  vacation: vacationReducer,
  crm: crmReducer,
  directoryinformation:directoryInformationReducer,
  booking:bookingReducer,
  layout:layoutReducer,
  bookingHistory:bookingHistoryReducer,
  superadminpromos:superAdminPromosReducer,
  mycalendar:myCalendarReducer,
  superadmindashboard:superAdminDashboardReducer,
  planManager:planManagerReducer,
  adminDashboard:adminDashboardReducer
});
