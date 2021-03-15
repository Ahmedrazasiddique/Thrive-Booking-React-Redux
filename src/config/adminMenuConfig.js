import React from "react";
import * as Icon from "react-feather";

const adminMenuConfig = [
  {
    id: "sd",
    title: "Schedule",
    type: "dropdown",
    icon: <Icon.Grid size={16} />,
    children: [
      {
        id: "schedule",
        title: "Schedule",
        type: "item",
        icon: <Icon.Mail size={16} />,
        navLink: "/admin/settings/schedule",
        //filterBase: "admin/settings/staff/directory-information",
        //permissions: ["admin", "editor"]
      },
      {
        id: "vacations",
        title: "Vacation",
        type: "item",
        icon: <Icon.MessageSquare size={16} />,
        navLink: "/admin/settings/vacation",
        ////permissions: ["admin", "editor"]
      },
    ],
  },
  {
    id: "apps",
    title: "Staff",
    type: "dropdown",
    icon: <Icon.Grid size={16} />,
    children: [
      {
        id: "email",
        title: "Directory Info",
        type: "item",
        icon: <Icon.Mail size={16} />,
        navLink: "/admin/settings/staff/directory-information",
        //filterBase: "admin/settings/staff/directory-information",
        //permissions: ["admin", "editor"]
      },
      {
        id: "chat",
        title: "Booking history",
        type: "item",
        icon: <Icon.MessageSquare size={16} />,
        navLink: "/admin/settings/staff/booking-history",
        ////permissions: ["admin", "editor"]
      },
    ],
  },
  {
    id: "uiElements",
    title: "CRM",
    type: "dropdown",
    icon: <Icon.Layers size={16} />,
    children: [
      {
        id: "colors",
        title: "CRM",
        type: "item",
        icon: <Icon.Droplet size={16} />,
        navLink: "/admin/settings/crm",
        //permissions: ["admin", "editor"]
      },
      {
        id: "icons",
        title: "Payments",
        type: "item",
        icon: <Icon.Eye size={16} />,
        navLink: "/admin/settings/crm-payments",
        //permissions: ["admin", "editor"]
      },
    ],
  },
  {
    id: "event-booking",
    title: "Event",
    type: "dropdown",
    icon: <Icon.Calendar size={16} />,
    children: [
      {
        id: "event",
        title: "Events",
        type: "item",
        icon: <Icon.Calendar size={16} />,
        navLink: "/admin/events/list",
        //permissions: ["admin", "editor"]
      },
    ],
  },
];

export default adminMenuConfig;
