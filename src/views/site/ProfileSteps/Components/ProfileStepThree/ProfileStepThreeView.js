import React, {useEffect, useState} from 'react'
import logoSm from '../../../../../assets/images/logo-sm.png'
import fillStep from '../../../../../assets/images/fill.png'
import currentStep from '../../../../../assets/images/current-step.png'
import unSelectedRadio from '../../../../../assets/images/unselected-radio.png'
import checkbox from '../../../../../assets/icons/checkboxblack.svg'
import checkboxOutline from '../../../../../assets/icons/checkbox-outline.svg'
import {Link, useHistory} from 'react-router-dom'
import {ErrorMessage, Formik} from 'formik'
import axios from "../../../../../axios-instance";
import * as Yup from 'yup'
import jwt_decode from "jwt-decode";

const ProfileStepThreeView = (props) => {
  const history = useHistory()
  const Schema = Yup.object().shape({
    role: Yup.string().required('Role cannot be empty'),
    event_types: Yup.string().required('Event Types cannot be empty'),
  })
  const formikProps = {
    initialValues: {
      role: "",
      event_types: [],
    },
    validationSchema: Schema,
    onSubmit: (values, formikHelpers) => {
      const user = jwt_decode(localStorage.getItem('jwtToken'))
      if (user) {
        const business_id = Object.values(user.businesses).pop()
        values.business_id = business_id
      }
      axios
        .post('/admin/quick-setup-step-three', {
          ...values,
          event_types: values.event_types.join(",")
        })
        .then((response) => {
          console.log(response);
          history.push('/signup/profile-step-four');
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  const [profession, setProfession] = useState([]);

  useEffect(() => {
    axios.get('/profession-types')
      .then((response) => {
        console.log(response)
        setProfession(response.data.data.profession_types)
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const [eventTypes, setEventTypes] = useState([]);

  useEffect(() => {
    axios.get('/event-types')
      .then((response) => {
        setEventTypes(response.data.data.eventTypes)
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
        } = formik;
        return (
          <div className='profile-step-three'>
            <header>
              <div className="header-container">
                <div className="logo">
                  <img src={logoSm} alt=""/>
                </div>
              </div>
            </header>

            <div className="profile-step">
              <div className="step-1">
                <h1>Thank you for signing up</h1>
                <p className="m-0">Just few more steps to get you started</p>
                <div className="by-step">
                  <div className="step">
                    <img src={fillStep} alt=""/>
                    <p className="current-step">Step 1</p>
                  </div>
                  <div className="step">
                    <img src={fillStep} alt=""/>
                    <p className="current-step">Step 2</p>
                  </div>
                  <div className="step">
                    <img src={currentStep} alt=""/>
                    <p className="current-step">Step 3</p>
                  </div>
                  <div className="step">
                    <img src={unSelectedRadio} alt=""/>
                    <p>Step 4</p>
                  </div>
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="same-label" htmlFor="role">What’s Your Role In Your Company?</label>
                  <div className="form-checks">
                    {profession.map(item => (
                      <div className="form-check">
                        <input
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="form-check-input"
                          value={item.id}
                          type="radio"
                          name="role"
                          id={item.id}
                        />
                        <label className="form-check-label" htmlFor={item.id}>
                          {item.profession}
                        </label>
                      </div>
                    ))}
                  </div>
                  <input
                    type="text"
                    className="form-control same-input"
                    name="role"
                    id="role"
                    placeholder="From Text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <ErrorMessage
                    name="role"
                    render={(error) => <span className="error">{error}</span>}
                  />
                </div>
                <div className="form-group">
                  <div className="same-label">What Type Of Event Will You Be Using Meetocto
                    Mainly?
                  </div>
                  <div className="flex events">
                    {eventTypes.map(item => (
                      <label className="tag-button-label">
                        <input name='event_types' value={item.id} checked={values.event_types.includes(String(item.id))}
                               onChange={handleChange}
                               onBlur={handleBlur} type="checkbox"/>
                        <div className="tag-button">
                          <div className="tag-icon checked"><img src={checkbox}/></div>
                          <div className="tag-icon unchecked"><img src={checkboxOutline}/></div>
                          <div className="tag-text flex">{item.event_type}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                  <input
                    type="text"
                    className="form-control same-input"
                    name="event_types"
                    id="event_types"
                    placeholder="From Text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <ErrorMessage
                    name="event_types"
                    render={(error) => <span className="error">{error}</span>}
                  />
                </div>
                <div className="submit-btns">
                  <Link to='/admin/dashboard' className='skip-btn'><button className="btn" type='button'>Go Back</button></Link>
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

export default ProfileStepThreeView

