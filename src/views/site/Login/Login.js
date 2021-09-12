import React, {useState} from 'react'
import logoLg from '../../../assets/images/lg-logo.png'
import crossBtn from '../../../assets/images/clear.png'
import {Link, useHistory} from 'react-router-dom'
import {ErrorMessage, Formik} from "formik";
import * as Yup from "yup";
import visibility from "../../../assets/icons/visibility.svg";
import visibilityOff from "../../../assets/icons/visibility_off.svg";
import axios from "../../../axios-instance";
import setAuthToken from "../../../utils/setAuthToken";
import {toast} from "react-toastify";

const Login = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false)

  const history = useHistory()
  const Schema = Yup.object().shape({
    email: Yup.string().required('User Name cannot be empty'),
    password: Yup.string().required('Password cannot be empty'),
  });

  const formikProps = {
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: Schema,
    onSubmit: (values) => {
      axios
        .post('/login', values)
        .then((response) => {
          const access_token = response.data.data.access_token
          setAuthToken(access_token);
          localStorage.setItem("jwtToken", access_token);
          history.push('/admin/dashboard');
          toast.success('User LoggedIn Successfully')
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  const changePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
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
          handleBlur,
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
                  <h1>Welcome Back!</h1>
                  <p className="r-p">You Are One Password Away From Creating Something Amazing</p>
                  <div className="form-group mb-0">
                    <label className="same-label" htmlFor="email">UserName</label>
                    <input
                      type="email"
                      className="form-control same-input"
                      name="email"
                      id="email"
                      placeholder="Enter username"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  <ErrorMessage
                    name="email"
                    render={(error) => <span className="error">{error}</span>}
                  />
                  <div className="form-group mb-0 mt-2">
                    <label className="same-label" htmlFor="password">Password</label>
                    <div className="password-group">
                    <input
                      type={passwordVisibility ? "text" : "password"}
                      className="form-control same-input"
                      name="password"
                      id="password"
                      placeholder="Password"
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
                  <div className="more-opt">
                    <div className="form-group m-0 p-0">
                      <input
                        type="checkbox"
                        name="remember"
                        id="remember"
                      />
                      <label className="same-label" htmlFor="remember">Remember Me</label>
                    </div>
                    <Link className='mt-2'>Forgot Password?</Link>
                  </div>
                  <button type="submit" className="btn">Login</button>
                  <p className="login-here">Don't have a account? <Link to='/signup'>SignUp Now</Link></p>
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

export default Login
