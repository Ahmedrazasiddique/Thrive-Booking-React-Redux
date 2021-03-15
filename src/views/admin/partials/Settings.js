import React from "react";
import { useTranslation } from "react-i18next";
import * as Icon from "react-feather";
import classnames from "classnames";
import { Col, Row } from "reactstrap";
import "../../../assets/scss/components/customizer.scss";
import PerfectScrollbar from "react-perfect-scrollbar";
import 'react-perfect-scrollbar/dist/css/styles.css';
import { Link } from 'react-router-dom';

const Settings = (props) => {

  const { t } = useTranslation();

  const configItems = [
    {
      title: t("Company Details"),
      icon: (<Icon.Home size={20} className="mr-2 fonticon-wrap" />),
      to: "/admin/settings/company",
    },
    
    /*
    {
      title: t("SETTINGS.APPEARANCE"),
      icon: "desktop",
      to: "/admin/settings/appearance",
    },
    */
    {
      title: t("SETTINGS.PAYMENT"),
      icon: (<Icon.CreditCard
        size={20}
        className="mr-2 fonticon-wrap"
      />),
      to: "/admin/settings/payment",
    },
    {
      title: t("SETTINGS.EMAIL_TEMPLATE"),
      icon: (<Icon.Mail size={20} className="mr-2 fonticon-wrap" />),
      to: "/admin/settings/email-template",
    },
    {
      title: t("SETTINGS.SMS_TEMPLATE"),
      icon: (<Icon.MessageSquare
        size={20}
        className="mr-2 fonticon-wrap"
      />),
      to: "/admin/settings/sms-template",
    },
    {
      title: t("Promos"),
      icon: (<Icon.Gift size={20} className="mr-2 fonticon-wrap" />),
      to: "/admin/settings/discounts",
    },
    {
      title: t("SETTINGS.SEO"),
      icon: (<Icon.BarChart size={20} className="mr-2 fonticon-wrap" />),
      to: "/admin/settings/seo",
    },
    {
      title: t("SETTINGS.GOOGLE_CALENDAR"),
      icon: (<Icon.Calendar size={20} className="mr-2 fonticon-wrap" />),
      to: "/admin/settings/google-calendar",
    },
    {
      title: t("Events Settings"),
      icon: (<Icon.Home size={20} className="mr-2 fonticon-wrap" />),
      to: "/admin/settings/events",
    },
    {
      title: t("Email Settings"),
      icon: (<Icon.Home size={20} className="mr-2 fonticon-wrap" />),
      to: "/admin/settings/email-settings",
    },
    {
      title: t("My Thrive Link"),
      icon: (<Icon.Home size={20} className="mr-2 fonticon-wrap" />),
      to: "/admin/settings/my-thrive-link",
    },
  ];

  return (
    <div
      className={classnames("customizer d-none d-md-block", {
        open: props.settingState === true,
      })}
    >
      <div
        className="customizer-toggle"
        onClick={() =>
          props.toggleSettings(!props.settingState)
        }
        >
          <Icon.Settings className="open-icon" size={22} />
      </div>

      <div className="header d-flex justify-content-between px-2 pt-2">
        <div className="title">
          <h4 className="text-uppercase mb-0">Select Section</h4>
        </div>
          <div
            className="close-icon cursor-pointer"
            onClick={() => props.toggleSettings(false)}
          >
            <Icon.X size={24} />
          </div>
      </div>
      <hr />
      <PerfectScrollbar
          options={{
            wheelPropagation: false,
          }}
          className="customizer-content p-2"
      >
        <Row>
          {configItems.map((item, index) => (
            <Col sm="12" md="12" className="fonticon-container" key={index}>
              <div className="fonticon-wrap">
                {item.icon}
              </div>
              <label className="fonticon-classname">
                <Link to={item.to} >
                  {item.title}
                </Link>
              </label>
            </Col>
          ))}
        </Row>
      </PerfectScrollbar>
    </div>    
  );
};

export default Settings;
