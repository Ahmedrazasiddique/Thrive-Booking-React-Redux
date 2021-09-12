import React, {useState} from 'react'
import logoLg from '../../../assets/images/lg-logo.png'
import crossBtn from '../../../assets/images/clear.png'
import {Link, useHistory} from 'react-router-dom'
import {ErrorMessage, Formik} from "formik";
import axios from "../../../axios-instance";
import * as Yup from 'yup';
import setAuthToken from "../../../utils/setAuthToken";
import {toast} from "react-toastify";
import visibility from '../../../assets/icons/visibility.svg';
import visibilityOff from "../../../assets/icons/visibility_off.svg";

const Signup = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(false);
  const history = useHistory()
  const Schema = Yup.object().shape({
    first_name: Yup.string().required('First Name cannot be empty'),
    last_name: Yup.string().required('Last Name cannot be empty'),
    email: Yup.string().email('Invalid Email').required('Email cannot be empty'),
    password: Yup.string().required('Password cannot be empty'),
    confirm_password: Yup.string().required('Confirm Password cannot be empty'),
  });

  const formikProps = {
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: ""
    },
    validationSchema: Schema,
    onSubmit: (values, formikHelpers) => {
      axios
        .post('/admin/register', values)
        .then((response) => {
          const access_token = response.data.data.access_token
          setAuthToken(access_token);
          localStorage.setItem("jwtToken", access_token);
          history.push('/signup/profile-step-one');
          toast.success('User Signup Successfully')
        })
        .catch((error) => {
          if(error.response.data.code === 254) {
            formikHelpers.setFieldError('email', error.response.data.message)
          }
          // toast.error(error.response.data.message)
          // console.error(error);
        });
    }
  }
  const changePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  }

  const changeConfirmPasswordVisibility = () => {
    setConfirmPasswordVisibility(!confirmPasswordVisibility);
  }
  return (
    <Formik
      {...formikProps}
    >
      {(formik) => {
        const {
          values,
          handleChange,
          handleSubmit,
          handleBlur
        } = formik;
        return (
          <div className="signup-process">
            <div className="logo-side">
              <img src={logoLg}/>
            </div>
            <div className="signup">
              <div className="cross-btn">
                <Link to='landingPage'><img width="33" src={crossBtn}/></Link>
              </div>
              <div className="signup-form">
                <form onSubmit={handleSubmit}>
                  <h1>Get Started!</h1>
                  <p className="r-p">You Are One Password Away From Creating Something Amazing</p>
                  <div className="form-groups row">
                    <div className="form-group col-6 sm-12">
                      <label className="same-label" htmlFor="first_name">First Name</label>
                      <input
                        type="text"
                        className="form-control same-input"
                        name="first_name"
                        id="first_name"
                        placeholder="Enter First Name"
                        value={values.first_name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <ErrorMessage
                        name="first_name"
                        render={(error) => <span className="error">{error}</span>}
                      />
                    </div>
                    <div className="form-group col-6 sm-12">
                      <label className="same-label" htmlFor="last_name">Last Name</label>
                      <input
                        type="text"
                        className="form-control same-input"
                        name="last_name"
                        id="last_name"
                        placeholder="Enter Last Name"
                        value={values.last_name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <ErrorMessage
                        name="last_name"
                        render={(error) => <span className="error">{error}</span>}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="same-label" htmlFor="email">Email</label>
                    <input
                      type="email"
                      className="form-control same-input"
                      name="email"
                      id="email"
                      placeholder="Enter email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <ErrorMessage
                      name="email"
                      render={(error) => <span className="error">{error}</span>}
                    />
                  </div>
                  <div className="form-group">
                    <label className="same-label" htmlFor="password">Password</label>
                    <div className="password-group">
                    <input
                      type={passwordVisibility ? "text":"password"}
                      className="form-control same-input"
                      name="password"
                      id="password"
                      placeholder="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                      {!passwordVisibility && (
                        <img src={visibilityOff} onClick={changePasswordVisibility} alt=""/>
                      )}
                      {passwordVisibility && (
                        <img src={visibility} onClick={changePasswordVisibility} alt=""/>
                      )}
                    </div>
                    <ErrorMessage
                      name="password"
                      render={(error) => <span className="error">{error}</span>}
                    />
                  </div>
                  <div className="form-group">
                    <label className="same-label" htmlFor="confirm_password">Confirm Password</label>
                    <div className="password-group">
                      <input
                        type={confirmPasswordVisibility ? "text":"password"}
                        className="form-control same-input"
                        name="confirm_password"
                        id='confirm_password'
                        placeholder="Confirm Password"
                        value={values.confirm_password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {!confirmPasswordVisibility && (
                        <img src={visibilityOff} onClick={changeConfirmPasswordVisibility} alt=""/>
                      )}
                      {confirmPasswordVisibility && (
                        <img src={visibility} onClick={changeConfirmPasswordVisibility} alt=""/>
                      )}
                    </div>
                    <ErrorMessage
                      name="confirm_password"
                      render={(error) => <span className="error">{error}</span>}
                    />
                  </div>
                  <button type="submit" className="btn">Sign Up</button>
                  <p className="login-here">Already Have An Account? <Link to='/login'>Login Here</Link></p>
                </form>
              </div>
              <div className="signup-footer">
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
              </div>
            </div>
          </div>
        )
      }}
    </Formik>
  )
}

export default Signup


