import React from "react";

import { encryptUserRole } from "../utils/authHelper";
import CryptoJS from "crypto-js";

// Admin
import UserType from "../views/auth/UserType";
import Dashboard from "../views/admin/dashboard/Dashboard";
import AdminProfile from "../views/admin/profile/Profile";
import AdminCompany from "../views/admin/settings/Company";
import AdminGeneral from "../views/admin/settings/General";
import AdminAppearance from "../views/admin/settings/Appearance";
import AdminPayment from "../views/admin/settings/Payment";
import AdminEmailNotification from "../views/admin/settings/EmailNotification";
import AdminEmailTemplate from "../views/admin/settings/EmailTemplate";
import AdminSMSNotification from "../views/admin/settings/SMSNotification";
import AdminSMSTemplate from "../views/admin/settings/SMSTemplate";
import AdminFrequentlyDiscount from "../views/admin/settings/FrequentlyDiscount";
import Discount from "../views/admin/settings/Discount";
import AdminFrontTooltips from "../views/admin/settings/FrontTooltips";
import AdminFormFields from "../views/admin/settings/FormFields";
import AdminSEO from "../views/admin/settings/SEO";
import AdminGoogleCalendar from "../views/admin/settings/GoogleCalendar";
import Events from "../views/admin/my-booking/Events";
import EventSettngs from "../views/admin/settings/EventSettings";
import EmailSettngs from "../views/admin/settings/EmailSettings";
import MyThriveLink from "../views/admin/settings/MyThriveLink";
import Schedule from "../views/admin/settings/Schedule";
import Vacation from "../views/admin/settings/Vacation";

import BookingHistory from "../views/admin/settings/Staff/BookingHistory";
import CustomerAppointment from "../views/admin/settings/Staff/CustomerAppointment";
import StaffAppointment from "../views/admin/settings/Staff/StaffAppointment";

import DirectoryInformation from "../views/admin/settings/Staff/DirectoryInformation";
import DirectoryInformationView from "../views/admin/settings/Staff/DirectoryInformation/DirectoryInformationView";

import DirectoryInformationEdit from "../views/admin/settings/Staff/DirectoryInformation/edit/DirectoryInformationEdit";
import CrmMain from "../views/admin/settings/CRM/CrmMain";

import MainPayment from "../views/admin/settings/CRM/Payments/MainPayment";

import StaffPayment from "../views/admin/settings/CRM/Payments/Staff/StaffPayment";

// Staff
import StaffDashboard from "../views/staff/dashboard/Dashboard";
import Calendar from "../views/staff/Calendar/Calendar";

// Super Admin
import SuperAdminDashboard from "../views/super-admin/dashboard/Dashboard";

// Customer
import CustomerDashboard from "../views/customer/dashboard/Dashboard";

// Events

import EventTypeList from "../views/events/list-events-types";
import AddNewEvent from "../views/events/add-new-event";
import AddNewEventDetails from "../views/events/add-new-event-details";
import AddNewEventAvailability from "../views/events/add-new-event-availbility";
import AddNewEventAdvanced from "../views/events/add-new-event-advanced";
import AddAdHocComponent from "../views/events/add-ad-hoc-event";
import EventSuccessPage from "../views/events/event-success-page";

export const USER_TYPES = {
  admin: encryptUserRole("admin").toString(CryptoJS.enc.Hex),
  customer: encryptUserRole("customer").toString(CryptoJS.enc.Hex),
  superAdmin: encryptUserRole("super-admin").toString(CryptoJS.enc.Hex),
  staff: encryptUserRole("staff").toString(CryptoJS.enc.Hex),
};

const routes = [
  {
    component: UserType,
    exact: true,
    path: "/user-type",
    userType: USER_TYPES.admin,
  },
  // admin routes
  {
    component: Dashboard,
    exact: true,
    path: "/admin/dashboard",
    userType: USER_TYPES.admin,
  },
  {
    //component: React.lazy(() => import("../views/admin/profile/Profile")),
    component: AdminProfile,
    exact: true,
    path: "/admin/profile",
    userType: USER_TYPES.admin,
  },
  {
    //component: React.lazy(() => import("../views/admin/settings/Company")),
    component: AdminCompany,
    exact: true,
    path: "/admin/settings/company",
    userType: USER_TYPES.admin,
  },
  {
    //component: React.lazy(() => import("../views/admin/settings/General")),
    component: AdminGeneral,
    exact: true,
    path: "/admin/settings/general",
    userType: USER_TYPES.admin,
  },
  {
    //component: React.lazy(() => import("../views/admin/settings/Appearance")),
    component: AdminAppearance,
    exact: true,
    path: "/admin/settings/appearance",
    userType: USER_TYPES.admin,
  },
  {
    //component: React.lazy(() => import("../views/admin/settings/Payment")),
    component: AdminPayment,
    exact: true,
    path: "/admin/settings/payment",
    userType: USER_TYPES.admin,
  },
  {
    component: AdminEmailNotification,
    //component: React.lazy(() =>
    //  import("../views/admin/settings/EmailNotification")
    //),
    exact: true,
    path: "/admin/settings/email-notifications",
    userType: USER_TYPES.admin,
  },
  {
    //component: React.lazy(() =>
    //  import("../views/admin/settings/EmailTemplate")
    //),
    component: AdminEmailTemplate,
    exact: true,
    path: "/admin/settings/email-template",
    userType: USER_TYPES.admin,
  },
  {
    //component: React.lazy(() =>
    //  import("../views/admin/settings/SMSNotification")
    //),
    component: AdminSMSNotification,
    exact: true,
    path: "/admin/settings/sms-notifications",
    userType: USER_TYPES.admin,
  },
  {
    //component: React.lazy(() => import("../views/admin/settings/SMSTemplate")),
    component: AdminSMSTemplate,
    exact: true,
    path: "/admin/settings/sms-template",
    userType: USER_TYPES.admin,
  },
  {
    //component: React.lazy(() =>
    //  import("../views/admin/settings/FrequentlyDiscount")
    // ),
    component: AdminFrequentlyDiscount,
    exact: true,
    path: "/admin/settings/frequently-discount",
    userType: USER_TYPES.admin,
  },
  {
    //component: React.lazy(() => import("../views/admin/settings/Promocode")),
    component: Discount,
    exact: true,
    path: "/admin/settings/discounts",
    userType: USER_TYPES.admin,
  },
  {
    //component: React.lazy(() =>
    //  import("../views/admin/settings/FrontTooltips")
    // ),
    component: AdminFrontTooltips,
    exact: true,
    path: "/admin/settings/front-tooltips",
    userType: USER_TYPES.admin,
  },
  {
    component: React.lazy(() => import("../views/admin/settings/FormFields")),
    exact: true,
    path: "/admin/settings/form-fields",
    userType: USER_TYPES.admin,
  },
  {
    //component: React.lazy(() =>
    //  import("../views/admin/settings/RecurrenceBooking")
    //),
    component: AdminFormFields,
    exact: true,
    path: "/admin/settings/recurrence-booking",
    userType: USER_TYPES.admin,
  },
  {
    //component: React.lazy(() => import("../views/admin/settings/SEO")),
    component: AdminSEO,
    exact: true,
    path: "/admin/settings/seo",
    userType: USER_TYPES.admin,
  },
  {
    //component: React.lazy(() =>
    //  import("../views/admin/settings/GoogleCalendar")
    //),
    component: AdminGoogleCalendar,
    exact: true,
    path: "/admin/settings/google-calendar",
    userType: USER_TYPES.admin,
  },
  {
    component: Events,
    exact: true,
    path: "/admin/my-bookings",
    userType: USER_TYPES.admin,
  },

  // staff routes
  {
    component: StaffDashboard,
    exact: true,
    path: "/staff/dashboard",
    userType: USER_TYPES.staff,
  },

  // super admin routes
  {
    component: SuperAdminDashboard,
    exact: true,
    path: "/super-admin/dashboard",
    userType: USER_TYPES.superAdmin,
  },

  // customer routes
  {
    component: CustomerDashboard,
    exact: true,
    path: "/customer/dashboard",
    userType: USER_TYPES.customer,
  },
  {
    component: EventSettngs,
    exact: true,
    path: "/admin/settings/events",
    userType: USER_TYPES.admin,
  },
  {
    component: EmailSettngs,
    exact: true,
    path: "/admin/settings/email-settings",
    userType: USER_TYPES.admin,
  },
  {
    component: MyThriveLink,
    exact: true,
    path: "/admin/settings/my-thrive-link",
    userType: USER_TYPES.admin,
  },
  {
    component: Schedule,
    exact: true,
    path: "/admin/settings/schedule",
    userType: USER_TYPES.admin,
  },
  {
    component: Vacation,
    exact: true,
    path: "/admin/settings/vacation",
    userType: USER_TYPES.admin,
  },
  {
    component: BookingHistory,
    exact: true,
    path: "/admin/settings/staff/booking-history",
    userType: USER_TYPES.admin,
  },
  {
    component: DirectoryInformation,
    exact: true,
    path: "/admin/settings/staff/directory-information",
    userType: USER_TYPES.admin,
  },
  {
    component: DirectoryInformationView,
    exact: true,
    path: "/admin/settings/staff/directory-information/view/:id",
    userType: USER_TYPES.admin,
  },
  {
    component: DirectoryInformationEdit,
    exact: true,
    path: "/admin/settings/staff/directory-information/edit/:id",
    userType: USER_TYPES.admin,
  },
  {
    component: CrmMain,
    exact: true,
    path: "/admin/settings/crm",
    userType: USER_TYPES.admin,
  },
  {
    component: MainPayment,
    exact: true,
    path: "/admin/settings/crm-payments",
    userType: USER_TYPES.admin,
  },

  {
    //component: React.lazy(() => import("../views/admin/profile/Profile")),
    component: AdminProfile,
    exact: true,
    path: "/customer/profile",
    userType: USER_TYPES.customer,
  },
  {
    //component: React.lazy(() => import("../views/admin/profile/Profile")),
    component: CustomerAppointment,
    exact: true,
    path: "/customer/booking",
    userType: USER_TYPES.customer,
  },

  {
    //component: React.lazy(() => import("../views/admin/profile/Profile")),
    component: AdminProfile,
    exact: true,
    path: "/staff/profile",
    userType: USER_TYPES.staff,
  },

  {
    component: Schedule,
    exact: true,
    path: "/staff/schedule",
    userType: USER_TYPES.staff,
  },
  {
    //component: React.lazy(() => import("../views/admin/profile/Profile")),
    component: StaffAppointment,
    exact: true,
    path: "/staff/booking",
    userType: USER_TYPES.staff,
  },
  {
    //component: React.lazy(() => import("../views/admin/profile/Profile")),
    component: StaffPayment,
    exact: true,
    path: "/staff/payment",
    userType: USER_TYPES.staff,
  },
  {
    //component: React.lazy(() => import("../views/admin/profile/Profile")),
    component: Calendar,
    exact: true,
    path: "/staff/calendar",
    userType: USER_TYPES.staff,
  },
  {
    component: EventTypeList,
    exact: true,
    path: "/admin/events/list",
    userType: USER_TYPES.admin,
  },

  {
    component: AddNewEvent,
    exact: true,
    path: "/admin/events/create",
    userType: USER_TYPES.admin,
  },
  {
    component: AddNewEventDetails,
    exact: true,
    path: "/admin/events/create/:id/step-2",
    userType: USER_TYPES.admin,
  },
  {
    component: AddNewEventAvailability,
    exact: true,
    path: "/admin/events/create/:id/step-3",
    userType: USER_TYPES.admin,
  },
  {
    component: AddNewEventAdvanced,
    exact: true,
    path: "/admin/events/create/:id/step-4",
    userType: USER_TYPES.admin,
  },

  {
    component: AddAdHocComponent,
    exact: true,
    path: "/admin/events/create/ad-hoc",
    userType: USER_TYPES.admin,
  },

  {
    component: EventSuccessPage,
    exact: true,
    path: "/admin/events/success",
    userType: USER_TYPES.admin,
  },
];

export default routes;
