import React, {useEffect, useState} from 'react'
import {ErrorMessage, Formik} from "formik";
import {Link, useHistory} from 'react-router-dom'
import logoSm from '../../../../../assets/images/logo-sm.png'
import currentStep from '../../../../../assets/images/current-step.png'
import unSelectedRadio from '../../../../../assets/images/unselected-radio.png'
import axios from "../../../../../axios-instance";
import * as Yup from "yup";
import jwt_decode from 'jwt-decode'
import {toast} from "react-toastify";

const ProfileStepOne = () => {
  const history = useHistory()

  const Schema = Yup.object().shape({
    company_name: Yup.string().required('Company Name cannot be empty'),
    phone: Yup.string().required('Phone cannot be empty'),
    company_street: Yup.string().required('Street cannot be empty'),
    company_state: Yup.string().required('State cannot be empty'),
    company_zip_code: Yup.string().required('Zip Code cannot be empty'),
    country_id: Yup.string().required('Country cannot be empty'),
    company_logo: Yup.string().required('Company Logo cannot be empty'),
  });

  const getFileName = (file) => {
    if (file instanceof File) {
      return file.name
    } else {
      return ""
    }
  }

  const onChangeFile = (event, setFieldValue) => {
    const target = event.target;
    const files = target.files
    setFieldValue(target.name, files[0])
  }


  const formikProps = {
    initialValues: {
      company_name: "",
      phone: "",
      company_street: "",
      company_state: "",
      company_zip_code: "",
      country_id: "",
      company_logo: "",
    },
    validationSchema: Schema,
    onSubmit: (values, formikHelpers) => {

      const user = jwt_decode(localStorage.getItem('jwtToken'))
      console.log("user => ", user)
      console.log(Object.values(user.businesses).pop())
      const formData = new FormData();

      Object.keys(values).forEach((key) => {
        formData.set(key, values[key])
      })

      if (user) {
        const business_id = Object.values(user.businesses).pop()
        formData.set('business_id', business_id)
      }
      axios
        .post('/admin/quick-setup-step-one', formData)
        .then((response) => {
          console.log(response);
          const user_id = response.data.data.data.id;
          history.push(`/signup/profile-step-two/${user_id}`);
        })
        .catch((error) => {
          // console.log(error.response)
          // toast.error(error.response.data.message)
          console.error(error);
        });
    }
  }

  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get('/countries')
      .then((response) => {
        setCountries(response.data.data.countries)
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
          setFieldValue
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

            <div className="profile-step">
              <div className="step-1">
                <h1>Thank you for signing up</h1>
                <p className="m-0">Just few more steps to get you started</p>
                <div className="by-step">
                  <div className="step">
                    <img src={currentStep} alt=""/>
                    <p className="current-step">Step 1</p>
                  </div>
                  <div className="step">
                    <img src={unSelectedRadio} alt=""/>
                    <p>Step 2</p>
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
                <div className="form-group">
                  <label className="same-label" htmlFor="company_name">Company Name *</label>
                  <input
                    type="text"
                    className="form-control same-input"
                    name="company_name"
                    id="company_name"
                    value={values.company_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <ErrorMessage
                    name="company_name"
                    render={(error) => <span className="error">{error}</span>}
                  />
                </div>
                <div className="form-group">
                  <label className="same-label" htmlFor="phone">Phone *</label>
                  <input
                    type="text"
                    className="form-control same-input"
                    name="phone"
                    id="phone"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <ErrorMessage
                    name="phone"
                    render={(error) => <span className="error">{error}</span>}
                  />
                </div>
                <div className="form-groups row">
                  <div className="form-group col-6">
                    <label className="same-label" htmlFor="company_street">Street</label>
                    <input
                      type="text"
                      className="form-control same-input"
                      name="company_street"
                      id="company_street"
                      value={values.company_street}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <ErrorMessage
                      name="company_street"
                      render={(error) => <span className="error">{error}</span>}
                    />
                  </div>
                  <div className="form-group col-6">
                    <label className="same-label" htmlFor="company_state">state</label>
                    <input
                      type="text"
                      className="form-control same-input"
                      name="company_state"
                      id="company_state"
                      value={values.company_state}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <ErrorMessage
                      name="company_state"
                      render={(error) => <span className="error">{error}</span>}
                    />
                  </div>
                </div>
                <div className="form-groups row">
                  <div className="form-group col-6">
                    <label className="same-label" htmlFor="company_zip_code">Zip</label>
                    <input
                      type="text"
                      className="form-control same-input"
                      name="company_zip_code"
                      id="company_zip_code"
                      value={values.company_zip_code}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <ErrorMessage
                      name="company_zip_code"
                      render={(error) => <span className="error">{error}</span>}
                    />
                  </div>
                  <div className="form-group col-6">
                    <label className="same-label" htmlFor="country_id">Country</label>
                    <select
                      name="country_id"
                      id="country_id"
                      className="form-select same-input select-input"
                      value={values.country_id}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {countries.map(item => (
                        <option value={item.value}>{item.label}</option>
                      ))}
                    </select>
                    <ErrorMessage
                      name="country_id"
                      render={(error) => <span className="error">{error}</span>}
                    />
                  </div>
                </div>
                <div className="company-logo">
                  <div className="form-group">
                    <label className="same-label" htmlFor="company_logo">Company Logo</label>
                    <div className="company-logo-input">
                      <input
                        type="text"
                        className="form-control same-input"
                        id="company_logo"
                        readOnly
                        value={getFileName(values.company_logo)}
                      />
                      <label className="btn">
                        <input
                          name="company_logo" type="file"
                          onChange={(event) => {
                            onChangeFile(event, setFieldValue)
                          }}
                          onBlur={handleBlur} style={{display: "none"}}/>
                        <span>Browse</span>
                      </label>
                    </div>
                    <ErrorMessage
                      name="company_logo"
                      render={(error) => <span className="error">{error}</span>}
                    />
                  </div>
                </div>
                <div className="submit-btns">
                  <Link to='/admin/dashboard' className='skip-btn'><button className="btn" type='button'>Do That Another Time</button></Link>
                  <button type='submit' className="btn next">Next Step
                  </button>
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

export default ProfileStepOne
