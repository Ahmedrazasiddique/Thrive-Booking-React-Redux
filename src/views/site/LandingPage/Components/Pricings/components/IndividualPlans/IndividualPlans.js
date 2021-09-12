import React, {useEffect, useState} from 'react'
import axios from "../../../../../../../axios-instance";
import trueIcon from "../../../../../../../assets/images/true-icon.png";
import falseIcon from "../../../../../../../assets/images/false-icon.png";

const IndividualPlans = () => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    axios.get('/admin/plans')
      .then((response) => {
        console.log(response.data)
        setPlans(response.data)
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);


  const findItem = (plan_type, plan_name, feature_name) => {
    const plan = plans.find((item => {
      return item.plan_type === plan_type && item.plan_name === plan_name
    }))
    if (plan) {
      const plan_detail = plan.plan_details.find((item) => {
        return item.feature_name === feature_name
      })
      if (plan_detail) {
        return plan_detail.status === "E"
      }
    }
    return false
  }
  return (
    <div>
      <table className="pricing-table">
        <tr>
          <th className="names">
            <div className="chose-plan">
              <h1>Choose Your Plane</h1>
              <div className="btns">
                <button className="btn monthly">Monthly</button>
                <button className="btn annully">Annually</button>
              </div>
            </div>
          </th>
          <th className="border-top">
            <div className="plan">
              <h1>Free</h1>
              <h2>$0</h2>
              <button className="btn">Buy Now</button>
              <h1 className="fill-h">Features</h1>
            </div>
          </th>
          <th className="border-top active-border">
            <div className="plan active-plan">
              <div className="active-plan-value">Best Value</div>
              <h1>Basic</h1>
              <h2>$12<span>/Month</span></h2>
              <button className="btn">Buy Now</button>
              <h1 className="fill-h">Features</h1>
            </div>
          </th>
          <th className="border-top">
            <div className="plan">
              <h1>Pro</h1>
              <h2>$15<span>/Month</span></h2>
              <button className="btn">Buy Now</button>
              <h1 className="fill-h">Features</h1>
            </div>
          </th>
        </tr>
        <tr>
          <td className="names">Connected Calendar/s</td>
          <td className='big-font'>1 calendar/user</td>
          <td className="active-border big-font">4 calendar/user</td>
          <td className='big-font'>6 calendar/user</td>
        </tr>
        <tr>
          <td className="names">Events</td>
          <td className='big-font'>2 only</td>
          <td className="active-border big-font">Unlimited</td>
          <td className='big-font'>Unlimited</td>
        </tr>

        <tr>
          <td className="names">Calendar integrations with Google Calendar, Office 365, Outlook and iCloud</td>
          <td>
            {findItem("individual", "Free", "Calendar integrations with Google Calendar, Office 365, Outlook and iCloud") && (
              <img src={trueIcon}/>
            )}
            {!findItem("individual", "Free", "Calendar integrations with Google Calendar, Office 365, Outlook and iCloud") && (
              <img src={falseIcon}/>
            )}
          </td>
          <td className="active-border">
            {findItem("individual", "Basic", "Calendar integrations with Google Calendar, Office 365, Outlook and iCloud") && (
              <img src={trueIcon}/>
            )}
            {!findItem("individual", "Basic", "Calendar integrations with Google Calendar, Office 365, Outlook and iCloud") && (
              <img src={falseIcon}/>
            )}
          </td>
          <td>
            {findItem("individual", "Pro", "Calendar integrations with Google Calendar, Office 365, Outlook and iCloud") && (
              <img src={trueIcon}/>
            )}
            {!findItem("individual", "Pro", "Calendar integrations with Google Calendar, Office 365, Outlook and iCloud") && (
              <img src={falseIcon}/>
            )}
          </td>
        </tr>
        <tr>
          <td className="names">Personalize MeetOcto link</td>
          <td>
            {findItem("individual", "Free", "Personalize MeetOcto link") && (
              <img src={trueIcon}/>
            )}
            {!findItem("individual", "Free", "Personalize MeetOcto link") && (
              <img src={falseIcon}/>
            )}
          </td>
          <td className="active-border">
            {findItem("individual", "Basic", "Personalize MeetOcto link") && (
              <img src={trueIcon}/>
            )}
            {!findItem("individual", "Basic", "Personalize MeetOcto link") && (
              <img src={falseIcon}/>
            )}
          </td>
          <td>
            {findItem("individual", "Pro", "Personalize MeetOcto link") && (
              <img src={trueIcon}/>
            )}
            {!findItem("individual", "Pro", "Personalize MeetOcto link") && (
              <img src={falseIcon}/>
            )}
          </td>
        </tr>
        <tr>
          <td className="names">Removable MeetOcto Branding</td>
          <td>
            {findItem("individual", "Free", "Removable MeetOcto Branding") && (
              <img src={trueIcon}/>
            )}
            {!findItem("individual", "Free", "Removable MeetOcto Branding") && (
              <img src={falseIcon}/>
            )}
          </td>
          <td className="active-border">
            {findItem("individual", "Basic", "Removable MeetOcto Branding") && (
              <img src={trueIcon}/>
            )}
            {!findItem("individual", "Basic", "Removable MeetOcto Branding") && (
              <img src={falseIcon}/>
            )}
          </td>
          <td>
            {findItem("individual", "Pro", "Removable MeetOcto Branding") && (
              <img src={trueIcon}/>
            )}
            {!findItem("individual", "Pro", "Removable MeetOcto Branding") && (
              <img src={falseIcon}/>
            )}
          </td>
        </tr>
        <tr>
          <td className="names">Pooled availability options for teams
            <span>(round robin, even rotation, allow attendee to select staff)</span></td>
          <td>
            {findItem("individual", "Free", "Pooled availability options for teams (round robin, even rotation, allow attendee to select staff)") && (
              <img src={trueIcon}/>
            )}
            {!findItem("individual", "Free", "Pooled availability options for teams (round robin, even rotation, allow attendee to select staff)") && (
              <img src={falseIcon}/>
            )}
          </td>
          <td className="active-border">
            {findItem("individual", "Basic", "Pooled availability options for teams (round robin, even rotation, allow attendee to select staff)") && (
              <img src={trueIcon}/>
            )}
            {!findItem("individual", "Basic", "Pooled availability options for teams (round robin, even rotation, allow attendee to select staff)") && (
              <img src={falseIcon}/>
            )}
          </td>
          <td>
            {findItem("individual", "Pro", "Pooled availability options for teams (round robin, even rotation, allow attendee to select staff)") && (
              <img src={trueIcon}/>
            )}
            {!findItem("individual", "Pro", "Pooled availability options for teams (round robin, even rotation, allow attendee to select staff)") && (
              <img src={falseIcon}/>
            )}
          </td>
        </tr>
        <tr>
          <td className="names">Group Events</td>
          <td>
            {findItem("individual", "Free", "Group Events") && (
              <img src={trueIcon}/>
            )}
            {!findItem("individual", "Free", "Group Events") && (
              <img src={falseIcon}/>
            )}
          </td>
          <td className="active-border">
            {findItem("individual", "Basic", "Group Events") && (
              <img src={trueIcon}/>
            )}
            {!findItem("individual", "Basic", "Group Events") && (
              <img src={falseIcon}/>
            )}
          </td>
          <td>
            {findItem("individual", "Pro", "Group Events") && (
              <img src={trueIcon}/>
            )}
            {!findItem("individual", "Pro", "Group Events") && (
              <img src={falseIcon}/>
            )}
          </td>
        </tr>
        <tr>
          <td className="names">Automated event notifications</td>
          <td>
            {findItem("individual", "Free", "Automated event notifications") && (
              <img src={trueIcon}/>
            )}
            {!findItem("individual", "Free", "Automated event notifications") && (
              <img src={falseIcon}/>
            )}
          </td>
          <td className="active-border">
            {findItem("individual", "Basic", "Automated event notifications") && (
              <img src={trueIcon}/>
            )}
            {!findItem("individual", "Basic", "Automated event notifications") && (
              <img src={falseIcon}/>
            )}
          </td>
          <td>
            {findItem("individual", "Pro", "Automated event notifications") && (
              <img src={trueIcon}/>
            )}
            {!findItem("individual", "Pro", "Automated event notifications") && (
              <img src={falseIcon}/>
            )}
          </td>
        </tr>
        <tr>
          <td className="names">Customize notifications and reminders
            <span>(SMS and email)</span></td>
          <td>
            {findItem("individual", "Free", "Customize notifications and reminders (SMS and email)") && (
              <img src={trueIcon}/>
            )}
            {!findItem("individual", "Free", "Customize notifications and reminders (SMS and email)") && (
              <img src={falseIcon}/>
            )}
          </td>
          <td className="active-border">
            {findItem("individual", "Basic", "Customize notifications and reminders (SMS and email)") && (
              <img src={trueIcon}/>
            )}
            {!findItem("individual", "Basic", "Customize notifications and reminders (SMS and email)") && (
              <img src={falseIcon}/>
            )}
          </td>
          <td>
            {findItem("individual", "Pro", "Customize notifications and reminders (SMS and email)") && (
              <img src={trueIcon}/>
            )}
            {!findItem("individual", "Pro", "Customize notifications and reminders (SMS and email)") && (
              <img src={falseIcon}/>
            )}
          </td>
        </tr>
        <tr>
          <td className="names">Redirect to Custom Pages</td>
          <td>
            {findItem("individual", "Free", "Redirect to Custom Pages") && (
              <img src={trueIcon}/>
            )}
            {!findItem("individual", "Free", "Redirect to Custom Pages") && (
              <img src={falseIcon}/>
            )}
          </td>
          <td className="active-border">
            {findItem("individual", "Basic", "Redirect to Custom Pages") && (
              <img src={trueIcon}/>
            )}
            {!findItem("individual", "Basic", "Redirect to Custom Pages") && (
              <img src={falseIcon}/>
            )}
          </td>
          <td>
            {findItem("individual", "Pro", "Redirect to Custom Pages") && (
              <img src={trueIcon}/>
            )}
            {!findItem("individual", "Pro", "Redirect to Custom Pages") && (
              <img src={falseIcon}/>
            )}
          </td>
        </tr>
        <tr>
          <td className="names">Collect Payments <span>(PayPal, Stripe)</span></td>
          <td>
            {findItem("individual", "Free", "Collect Payments (PayPal, Stripe)") && (
              <img src={trueIcon}/>
            )}
            {!findItem("individual", "Free", "Collect Payments (PayPal, Stripe)") && (
              <img src={falseIcon}/>
            )}
          </td>
          <td className="active-border">
            {findItem("individual", "Basic", "Collect Payments (PayPal, Stripe)") && (
              <img src={trueIcon}/>
            )}
            {!findItem("individual", "Basic", "Collect Payments (PayPal, Stripe)") && (
              <img src={falseIcon}/>
            )}
          </td>
          <td>
            {findItem("individual", "Pro", "Collect Payments (PayPal, Stripe)") && (
              <img src={trueIcon}/>
            )}
            {!findItem("individual", "Pro", "Collect Payments (PayPal, Stripe)") && (
              <img src={falseIcon}/>
            )}
          </td>
        </tr>
        <tr>
          <td className="names">Coupon Codes</td>
          <td>
            {findItem("individual", "Free", "Coupon Codes") && (
              <img src={trueIcon}/>
            )}
            {!findItem("individual", "Free", "Coupon Codes") && (
              <img src={falseIcon}/>
            )}
          </td>
          <td className="active-border">
            {findItem("individual", "Basic", "Coupon Codes") && (
              <img src={trueIcon}/>
            )}
            {!findItem("individual", "Basic", "Coupon Codes") && (
              <img src={falseIcon}/>
            )}
          </td>
          <td>
            {findItem("individual", "Pro", "Coupon Codes") && (
              <img src={trueIcon}/>
            )}
            {!findItem("individual", "Pro", "Coupon Codes") && (
              <img src={falseIcon}/>
            )}
          </td>
        </tr>
        <tr>
          <td className="names">Enable Recurring Booking Discounts</td>
          <td>
            {findItem("individual", "Free", "Enable Recurring Booking Discounts") && (
              <img src={trueIcon}/>
            )}
            {!findItem("individual", "Free", "Enable Recurring Booking Discounts") && (
              <img src={falseIcon}/>
            )}
          </td>
          <td className="active-border">
            {findItem("individual", "Basic", "Enable Recurring Booking Discounts") && (
              <img src={trueIcon}/>
            )}
            {!findItem("individual", "Basic", "Enable Recurring Booking Discounts") && (
              <img src={falseIcon}/>
            )}
          </td>
          <td>
            {findItem("individual", "Pro", "Enable Recurring Booking Discounts") && (
              <img src={trueIcon}/>
            )}
            {!findItem("individual", "Pro", "Enable Recurring Booking Discounts") && (
              <img src={falseIcon}/>
            )}
          </td>
        </tr>
        <tr>
          <td className="names">Upsell/ Cross Sell</td>
          <td>
            {findItem("individual", "Free", "Upsell/ Cross Sell") && (
              <img src={trueIcon}/>
            )}
            {!findItem("individual", "Free", "Upsell/ Cross Sell") && (
              <img src={falseIcon}/>
            )}
          </td>
          <td className="active-border">
            {findItem("individual", "Basic", "Upsell/ Cross Sell") && (
              <img src={trueIcon}/>
            )}
            {!findItem("individual", "Basic", "Upsell/ Cross Sell") && (
              <img src={falseIcon}/>
            )}
          </td>
          <td>
            {findItem("individual", "Pro", "Upsell/ Cross Sell") && (
              <img src={trueIcon}/>
            )}
            {!findItem("individual", "Pro", "Upsell/ Cross Sell") && (
              <img src={falseIcon}/>
            )}
          </td>
        </tr>
        <tr>
          <td className="names">OctoLink Customization (colors, images upload)</td>
          <td>
            {findItem("individual", "Free", "OctoLink Customization (colors, images upload)") && (
              <img src={trueIcon}/>
            )}
            {!findItem("individual", "Free", "OctoLink Customization (colors, images upload)") && (
              <img src={falseIcon}/>
            )}
          </td>
          <td className="active-border">
            {findItem("individual", "Basic", "OctoLink Customization (colors, images upload)") && (
              <img src={trueIcon}/>
            )}
            {!findItem("individual", "Basic", "OctoLink Customization (colors, images upload)") && (
              <img src={falseIcon}/>
            )}
          </td>
          <td>
            {findItem("individual", "Pro", "OctoLink Customization (colors, images upload)") && (
              <img src={trueIcon}/>
            )}
            {!findItem("individual", "Pro", "OctoLink Customization (colors, images upload)") && (
              <img src={falseIcon}/>
            )}
          </td>
        </tr>
        <tr>
          <td className="names">Metrics and Reporting</td>
          <td>
            {findItem("individual", "Free", "Metrics and Reporting") && (
              <img src={trueIcon}/>
            )}
            {!findItem("individual", "Free", "Metrics and Reporting") && (
              <img src={falseIcon}/>
            )}
          </td>
          <td className="active-border">
            {findItem("individual", "Basic", "Metrics and Reporting") && (
              <img src={trueIcon}/>
            )}
            {!findItem("individual", "Basic", "Metrics and Reporting") && (
              <img src={falseIcon}/>
            )}
          </td>
          <td>
            {findItem("individual", "Pro", "Metrics and Reporting") && (
              <img src={trueIcon}/>
            )}
            {!findItem("individual", "Pro", "Metrics and Reporting") && (
              <img src={falseIcon}/>
            )}
          </td>
        </tr>
        <tr>
          <td className="names">Add OctoLink to your website</td>
          <td>
            {findItem("individual", "Free", "Add OctoLink to your website") && (
              <img src={trueIcon}/>
            )}
            {!findItem("individual", "Free", "Add OctoLink to your website") && (
              <img src={falseIcon}/>
            )}
          </td>
          <td className="active-border">
            {findItem("individual", "Basic", "Add OctoLink to your website") && (
              <img src={trueIcon}/>
            )}
            {!findItem("individual", "Basic", "Add OctoLink to your website") && (
              <img src={falseIcon}/>
            )}
          </td>
          <td>
            {findItem("individual", "Pro", "Add OctoLink to your website") && (
              <img src={trueIcon}/>
            )}
            {!findItem("individual", "Pro", "Add OctoLink to your website") && (
              <img src={falseIcon}/>
            )}
          </td>
        </tr>
        <tr>
          <td className="names"></td>
          <td><h1>Integrations</h1></td>
          <td className="active-border"><h1>Integrations</h1></td>
          <td><h1>Integrations</h1></td>
        </tr>
        <tr>
          <td className="names">Google Meet</td>
          <td>
            {findItem("individual", "Free", "Google Meet") && (
              <img src={trueIcon}/>
            )}
            {!findItem("individual", "Free", "Google Meet") && (
              <img src={falseIcon}/>
            )}
          </td>
          <td className="active-border">
            {findItem("individual", "Basic", "Google Meet") && (
              <img src={trueIcon}/>
            )}
            {!findItem("individual", "Basic", "Google Meet") && (
              <img src={falseIcon}/>
            )}
          </td>
          <td>
            {findItem("individual", "Pro", "Google Meet") && (
              <img src={trueIcon}/>
            )}
            {!findItem("individual", "Pro", "Google Meet") && (
              <img src={falseIcon}/>
            )}
          </td>
        </tr>
        <tr>
          <td className="names">Zoom</td>
          <td>
            {findItem("individual", "Free", "Zoom") && (
              <img src={trueIcon}/>
            )}
            {!findItem("individual", "Free", "Zoom") && (
              <img src={falseIcon}/>
            )}
          </td>
          <td className="active-border">
            {findItem("individual", "Basic", "Zoom") && (
              <img src={trueIcon}/>
            )}
            {!findItem("individual", "Basic", "Zoom") && (
              <img src={falseIcon}/>
            )}
          </td>
          <td>
            {findItem("individual", "Pro", "Zoom") && (
              <img src={trueIcon}/>
            )}
            {!findItem("individual", "Pro", "Zoom") && (
              <img src={falseIcon}/>
            )}
          </td>
        </tr>
        <tr>
          <td className="names">Microsoft Teams</td>
          <td>
            {findItem("individual", "Free", "Microsoft Teams") && (
              <img src={trueIcon}/>
            )}
            {!findItem("individual", "Free", "Microsoft Teams") && (
              <img src={falseIcon}/>
            )}
          </td>
          <td className="active-border">
            {findItem("individual", "Basic", "Microsoft Teams") && (
              <img src={trueIcon}/>
            )}
            {!findItem("individual", "Basic", "Microsoft Teams") && (
              <img src={falseIcon}/>
            )}
          </td>
          <td>
            {findItem("individual", "Pro", "Microsoft Teams") && (
              <img src={trueIcon}/>
            )}
            {!findItem("individual", "Pro", "Microsoft Teams") && (
              <img src={falseIcon}/>
            )}
          </td>
        </tr>
        <tr>
          <td className="names">Go to Webinar</td>
          <td>
            {findItem("individual", "Free", "Go to Webinar") && (
              <img src={trueIcon}/>
            )}
            {!findItem("individual", "Free", "Go to Webinar") && (
              <img src={falseIcon}/>
            )}
          </td>
          <td className="active-border">
            {findItem("individual", "Basic", "Go to Webinar") && (
              <img src={trueIcon}/>
            )}
            {!findItem("individual", "Basic", "Go to Webinar") && (
              <img src={falseIcon}/>
            )}
          </td>
          <td>
            {findItem("individual", "Pro", "Go to Webinar") && (
              <img src={trueIcon}/>
            )}
            {!findItem("individual", "Pro", "Go to Webinar") && (
              <img src={falseIcon}/>
            )}
          </td>
        </tr>
        <tr>
          <td className="names">Zapier</td>
          <td>
            {findItem("individual", "Free", "Zapier") && (
              <img src={trueIcon}/>
            )}
            {!findItem("individual", "Free", "Zapier") && (
              <img src={falseIcon}/>
            )}
          </td>
          <td className="active-border">
            {findItem("individual", "Basic", "Zapier") && (
              <img src={trueIcon}/>
            )}
            {!findItem("individual", "Basic", "Zapier") && (
              <img src={falseIcon}/>
            )}
          </td>
          <td>
            {findItem("individual", "Pro", "Zapier") && (
              <img src={trueIcon}/>
            )}
            {!findItem("individual", "Pro", "Zapier") && (
              <img src={falseIcon}/>
            )}
          </td>
        </tr>
        <tr>
          <td className="names"></td>
          <td className="border-bottom">
            <button className="btn" type="submit">Buy</button>
          </td>
          <td className="border-bottom active-border">
            <button className="btn" type="submit">Buy</button>
          </td>
          <td className="border-bottom">
            <button className="btn" type="submit">Buy</button>
          </td>
        </tr>
      </table>
    </div>
  )
}
export default IndividualPlans
