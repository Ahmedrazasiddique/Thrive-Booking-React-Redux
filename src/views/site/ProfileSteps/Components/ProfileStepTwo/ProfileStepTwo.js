import React, {useEffect, useState} from 'react'
import logoSm from '../../../../../assets/images/logo-sm.png'
import fillStep from '../../../../../assets/images/fill.png'
import currentStep from '../../../../../assets/images/current-step.png'
import unSelectedRadio from '../../../../../assets/images/unselected-radio.png'
import clockIcon from '../../../../../assets/icons/clcok-icon.svg'
import {Link, useHistory} from 'react-router-dom'
import {ErrorMessage, Formik, getIn} from "formik";
import axios from "../../../../../axios-instance";
import * as Yup from 'yup';
import clsx from 'clsx'
import jwt_decode from "jwt-decode";

const ProfileStepTwo = (props) => {
  const history = useHistory()

  const onChangeFirstCalenderDay = (day, setFieldValue) => {
    setFieldValue('calendar_first_day', day)
  }
  const onChangeTimeFormat = (format, setFieldValue) => {
    setFieldValue('time_format', format)
  }

  const onChangeTimeAvailability = (day, setFieldValue) => {
    setFieldValue('calendar_first_day', day)
  }

  const onChangeWeekDays = (value, values, setFieldValue) => {
    const newValues = [...values]
    if(newValues.includes(value)){
      newValues.splice(newValues.indexOf(value), 1)
    }else {
      newValues.push(value)
    }

    setFieldValue('week_days', newValues)
  }

console.log(props)
  const Schema =  Yup.object().shape({
    url_slug: Yup.string().required('URL Cannot be empty'),
    timezone_id: Yup.string().required('Timezone Cannot be empty'),
    // timeFrom: Yup.string().required('Business Hours Cannot be empty'),
    // timeTo: Yup.string().required('Business Hours Cannot be empty'),
  })
  const formikProps = {
    initialValues: {
      url_slug: "",
      timezone_id: "",
      timeFrom: "",
      timeTo: "",
      time_format: '24',
      calendar_first_day: 7,
      provider_id: props.route.match?.params?.id,
      start_time:'',
      end_time:'',
      week_days: [],
    },
    validationSchema: Schema,
    onSubmit: (values, formikHelpers) => {
      const user = jwt_decode(localStorage.getItem('jwtToken'))
      if (user) {
        const business_id = Object.values(user.businesses).pop()
        values.business_id = business_id
      }
      values.schedule_details =[]
      values.week_days.forEach((day) => {
        values.schedule_details.push({
          weekday_id:day,
          type:'weekly',
          on_status: 'E',
          schedule_availability: [
            {
              start_time: values.start_time,
              end_time: values.end_time,
            }
          ]
        })
      })

      axios
        .post('/admin/quick-setup-step-two', values)
        .then((response) => {
          console.log(response);
          history.push('/signup/profile-step-three');
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  const [timezones, setTimezones] = useState([]);

  useEffect(() => {
    axios.get('/timezones', )
      .then((response) => {
        setTimezones(response.data.data.timezones)
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Formik
      {...formikProps}
    >
      {(formik) => {
        const {
          values,
          handleChange,
          handleSubmit,
          handleBlur,
          setFieldValue,
        } = formik;
        return (
          <div>
            <header>
              <div className="header-container">
                <div className="logo">
                  <img src={logoSm} alt=""/>
                </div>
              </div>
            </header>

            <div className="profile-step profile-step-2">
              <div className="step-1">
                <h1>Thank you for signing up</h1>
                <p className="m-0">Just few more steps to get you started</p>
                <div className="by-step">
                  <div className="step">
                    <img src={fillStep} alt=""/>
                    <p className="current-step">Step 1</p>
                  </div>
                  <div className="step">
                    <img src={currentStep} alt=""/>
                    <p className="current-step">Step 2</p>
                  </div>
                  <div className="step">
                    <img src={unSelectedRadio} alt=""/>
                    <p>Step 3</p>
                  </div>
                  <div className="step">
                    <img src={unSelectedRadio} alt=""/>
                    <p>Step 4</p>
                  </div>
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="meetocto-link">
                  <div className="form-group">
                    <label className="same-label" htmlFor="url_slug">MeetOcto Link</label>
                    <div className="meetocto-link-input">
                      <button className="btn">Https://MeetOcto.com/</button>
                      <input
                        type="text"
                        className="form-control same-input"
                        name="url_slug"
                        id="url_slug"
                        value={values.url_slug}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    <ErrorMessage
                      name="url_slug"
                      render={(error) => <span className="error">{error}</span>}
                    />
                  </div>
                </div>
                <h1>Business Hours/Availability</h1>
                <div className="form-groups groups-responsive row">
                  <div className="form-group col-6">
                    <label className="same-label" htmlFor="timezone_id">Timezone</label>
                    <select
                      name="timezone_id"
                      id="timezone_id"
                      className="form-select same-input timezone"
                      value={values.timezone_id}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {timezones.map(item => (
                        <option value={item.value}>{item.label}</option>
                      ))}
                    </select>
                    <ErrorMessage
                      name="timezone_id"
                      render={(error) => <span className="error">{error}</span>}
                    />
                  </div>
                  <div className="form-group col-6">
                    <label className="same-label">Time Format</label>
                    <div className="time-format-btns">
                      <button
                        type='button'
                        className={clsx('btn', { activeBtn: values.time_format === '24' })}
                        onClick={() => onChangeTimeFormat('24', setFieldValue)}>
                        24 Hours
                      </button>
                      <button
                        type='button'
                        className={clsx('btn', { activeBtn: values.time_format === '12' })}
                        onClick={() => onChangeTimeFormat('12', setFieldValue)}>
                        12 Hours
                      </button>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label className="same-label">Week Start From</label>
                  <div className="week-btns">
                    <button
                      type='button'
                      className={clsx('btn', { activeBtn: values.calendar_first_day === 7 })}
                      onClick={() => onChangeFirstCalenderDay(7, setFieldValue)}>
                      S
                    </button>
                    <button
                      type='button'
                      className={clsx('btn', { activeBtn: values.calendar_first_day === 1 })}
                      onClick={() => onChangeFirstCalenderDay(1, setFieldValue)}>
                      M
                    </button>
                    <button
                      type='button'
                      className={clsx('btn', { activeBtn: values.calendar_first_day === 2 })}
                      onClick={() => onChangeFirstCalenderDay(2, setFieldValue)}>
                      T
                    </button>
                    <button
                      type='button'
                      className={clsx('btn', { activeBtn: values.calendar_first_day === 3 })}
                      onClick={() => onChangeFirstCalenderDay(3, setFieldValue)}>
                      W
                    </button>
                    <button
                      type='button'
                      className={clsx('btn', { activeBtn: values.calendar_first_day === 4 })}
                      onClick={() => onChangeFirstCalenderDay(4, setFieldValue)}>
                      T
                    </button>
                    <button
                      type='button'
                      className={clsx('btn', { activeBtn: values.calendar_first_day === 5 })}
                      onClick={() => onChangeFirstCalenderDay(5, setFieldValue)}>
                      F
                    </button>
                    <button
                      type='button'
                      className={clsx('btn', { activeBtn: values.calendar_first_day === 6 })}
                      onClick={() => onChangeFirstCalenderDay(6, setFieldValue)}>
                      S
                    </button>
                  </div>
                </div>

                <div className="form-groups row">
                  <div className="form-group col-6">
                    <label className="same-label" htmlFor="timeFrom">Business Hours</label>
                    <div className="business-hours-input">
                      <input
                        type="time"
                        className="form-control same-input"
                        name="start_time"
                        id="timeFrom"
                        value={getIn(values, 'start_time')}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <button type='button' className="btn"><img src={clockIcon} alt=""/></button>
                    </div>
                    <ErrorMessage
                      name="start_time"
                      render={(error) => <span className="error">{error}</span>}
                    />
                  </div>
                  <div className="form-group col-6">
                    <label className="same-label" htmlFor="timeTo">To</label>
                    <div className="business-hours-input">
                      <input
                        type="time"
                        className="form-control same-input"
                        name="end_time"
                        id="timeTo"
                        value={getIn(values, 'end_time')}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <button type='button' className="btn"><img src={clockIcon} alt=""/></button>
                    </div>
                    <ErrorMessage
                      name="end_time"
                      render={(error) => <span className="error">{error}</span>}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="same-label">Availability</label>
                  <div className="availability-btns">
                    <button
                      type='button'
                      className={clsx('btn', { activeBtn: values.week_days.includes(7) })}
                      onClick={() => onChangeWeekDays(7, values.week_days,setFieldValue)}>
                      S
                    </button>
                    <button
                      type='button'
                      className={clsx('btn', { activeBtn: values.week_days.includes(1) })}
                      onClick={() => onChangeWeekDays(1, values.week_days,setFieldValue)}>
                      M
                    </button>
                    <button
                      type='button'
                      className={clsx('btn', { activeBtn: values.week_days.includes(2) })}
                      onClick={() => onChangeWeekDays(2, values.week_days,setFieldValue)}>
                      T
                    </button>
                    <button
                      type='button'
                      className={clsx('btn', { activeBtn: values.week_days.includes(3) })}
                      onClick={() => onChangeWeekDays(3, values.week_days,setFieldValue)}>
                      W
                    </button>
                    <button
                      type='button'
                      className={clsx('btn', { activeBtn: values.week_days.includes(4) })}
                      onClick={() => onChangeWeekDays(4, values.week_days,setFieldValue)}>
                      T
                    </button>
                    <button
                      type='button'
                      className={clsx('btn', { activeBtn: values.week_days.includes(5) })}
                      onClick={() => onChangeWeekDays(5, values.week_days,setFieldValue)}>
                      F
                    </button>
                    <button
                      type='button'
                      className={clsx('btn', { activeBtn: values.week_days.includes(6) })}
                      onClick={() => onChangeWeekDays(6, values.week_days,setFieldValue)}>
                      S
                    </button>
                  </div>
                </div>
                <div className="submit-btns">
                  <Link to='/admin/dashboard' className='skip-btn'><button className="btn" type='button'>Do That Another Time</button></Link>
                  <button type='submit' className="btn next">Next Step</button>
                </div>
              </form>
            </div>

            <footer>
              <ul className="languages">
                <li>English (UK)</li>
                <li>हिन्दी</li>
                <li>ਪੰਜਾਬੀ</li>
                <li>বাংলা</li>
                <li>Deutsch</li>
                <li>ગુજરાતી</li>
                <li>Español</li>
              </ul>
              <p>Copyright © 2021 MeetOcto.</p>
            </footer>
          </div>
        )
      }}
    </Formik>
  )
}

export default ProfileStepTwo
