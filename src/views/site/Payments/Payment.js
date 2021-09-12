import React, {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import logoSm from '../../../assets/images/logo-sm.png'
import selectedRadio from "../../../assets/images/selected-radio.png";
import unSelectedDarkRadio from "../../../assets/images/unselected-dark-radio.png";
import paypalIcon from "../../../assets/images/PayPal.png";
import visaCard from "../../../assets/images/visa.png";
import masterCard from "../../../assets/images/master-card.png";
import discover from "../../../assets/images/discover.png";
import maestro from "../../../assets/images/maestro.png";
import {ErrorMessage, Formik} from "formik";
import light from "../../../assets/images/light.png";
import axios from "../../../axios-instance";
import * as Yup from "yup";
import clsx from "clsx";
import infoIcon from "../../../assets/images/info-icon.png";
import setAuthToken from "../../../utils/setAuthToken";

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState('paypal');
  const history = useHistory();
  const Schema = Yup.object().shape({
    card_number: Yup.string().required('Card Number cannot be empty'),
    first_name: Yup.string().required('Card Holder cannot be empty'),
    last_name: Yup.string().required('Card Holder cannot be empty'),
    ExpDate: Yup.string().required('Exp Date cannot be empty').matches('(0[1-9]|1[0-2])\\/?(([0-9]{4})|[0-9]{2}$)'),
    cvc: Yup.string().required('CVC cannot be empty'),
  })

  const formikProps = {
    initialValues: {
      first_name: "",
      last_name: "",
      card_number: "",
      ExpDate: "",
      cvc: "",
      plan_id: '',
      plan_type: 'monthly'
    },

    validationSchema: Schema,
    onSubmit: (values, formikHelpers) => {
      const [exp_month, exp_year] = values.ExpDate.split("/");
      axios
        .post('/user/process-subscription', {
          ...values, exp_month, exp_year
        })
        .then((response) => {
          console.log(response);
          setAuthToken(setAuthToken());
          history.push('/signup/thanksForPayment');
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

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

  const getTotalAmount = (plan_id, plan_type) => {
    const plan = plans.find(item => {
      return item.id === +plan_id
    })

    if(plan){
      if(plan_type === 'monthly'){
        return plan.monthly_price
      } else if(plan_type === 'annually'){
        return plan.annual_price
      }
    } else {
      return 0
    }
  }

  return (
    <div>
      <header>
        <div className="header-container">
          <div className="logo">
            <img src={logoSm} alt=""/>
          </div>
        </div>
      </header>

      <div className="payment-section">

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
                <form onSubmit={handleSubmit} className="payment">
                  <div className="payment-method">
                    <h1 className="payment-heading">Payment Method</h1>
                    <div className="radios">
                      <label className="tag-button-label" onClick={() => setPaymentMethod('paypal')}>
                        <input type="radio" name="payment"/>
                        <div className="tag-button">
                          <div className="tag-icon checked"><img src={selectedRadio}/></div>
                          <div className="tag-icon unchecked"><img src={unSelectedDarkRadio}/></div>
                          <div className="tag-text flex"><img src={paypalIcon}/></div>
                        </div>
                      </label>
                      <label className="tag-button-label" onClick={() => setPaymentMethod('creditCard')}>
                        <input type="radio" name="payment"/>
                        <div className="tag-button">
                          <div className="tag-icon checked"><img src={selectedRadio}/></div>
                          <div className="tag-icon unchecked"><img src={unSelectedDarkRadio}/></div>
                          <div className="tag-text flex">Credit or Debit Card</div>
                        </div>
                        <span className="cards-icons">
                        <div className="icon"><img src={visaCard}/></div>
                        <div className="icon"><img src={masterCard}/></div>
                        <div className="icon"><img src={discover}/></div>
                        <div className="icon"><img src={maestro}/></div>
                     </span>
                      </label>
                    </div>
                    {paymentMethod !== 'paypal' && (
                      <div className="card-details">
                        <div className="form-group">
                          <label className="same-label" htmlFor="card_number">Card Number</label>
                          <input
                            type="text"
                            className="form-control same-input"
                            name="card_number"
                            id="card_number"
                            placeholder="**** **** **** ****"
                            value={values.card_number}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <ErrorMessage
                            name="card_number"
                            render={(error) => <span className="error">{error}</span>}
                          />
                        </div>
                        <div className="form-groups groups-responsive row">
                          <div className="form-group col-6">
                            <label className="same-label" htmlFor="first_name">First Name</label>
                            <input
                              type="text"
                              className="form-control same-input"
                              name="first_name"
                              id="first_name"
                              placeholder="First Name"
                              value={values.cardHolder}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <ErrorMessage
                              name="first_name"
                              render={(error) => <span className="error">{error}</span>}
                            />
                          </div>
                          <div className="form-group col-6">
                            <label className="same-label" htmlFor="last_name">Last Name</label>
                            <input
                              type="text"
                              className="form-control same-input"
                              name="last_name"
                              id="last_name"
                              placeholder="Last Name"
                              value={values.cardHolder}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <ErrorMessage
                              name="last_name"
                              render={(error) => <span className="error">{error}</span>}
                            />
                          </div>
                        </div>
                        <div className="form-groups groups-responsive row">
                          <div className="form-group col-6">
                            <label className="same-label" htmlFor="ExpDate">Exp. Date</label>
                            <input
                              type="text"
                              className="form-control same-input"
                              name="ExpDate"
                              id="ExpDate"
                              placeholder="03/21"
                              value={values.ExpDate}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <ErrorMessage
                              name="ExpDate"
                              render={(error) => <span className="error">{error}</span>}
                            />
                          </div>
                          <div className="form-group col-6">
                            <label className="same-label" htmlFor="cvc">CVV/CVC</label>
                            <input
                              type="password"
                              className="form-control same-input"
                              name="cvc"
                              id="cvc"
                              placeholder="****"
                              value={values.cvc}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <ErrorMessage
                              name="cvc"
                              render={(error) => <span className="error">{error}</span>}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    {paymentMethod === 'paypal' && (
                      <></>
                    )}
                  </div>

                  <div className="payment-order">
                    <h1 className="payment-heading">Order Summary</h1>
                    <div className="toggle-section">
                      <p>Individual Plans</p>
                      <label className="switch">
                        <input
                          name="team"
                          checked={values.team}
                          onChange={(event)=> {
                            setFieldValue('team', event.target.checked)
                          }}
                          onBlur={handleBlur}
                          type="checkbox"
                        />
                        <span className="slider round"/>
                      </label>
                      <p>Team</p>
                    </div>
                    <div className="payment-details">
                      <div className="payment-details-btns">
                        <button
                          type='button'
                          className={clsx({active: values.plan_type === 'monthly'})}
                          onClick={() => {
                            setFieldValue('plan_type', 'monthly')
                          }}
                        >
                          Monthly
                        </button>
                        <button
                          type='button'
                          className={clsx({active: values.plan_type === 'annually'})}
                          onClick={() => {
                            setFieldValue('plan_type', 'annually')
                          }}
                        >
                          Annually
                        </button>
                      </div>
                      <div className="payment-details-heading">
                        <img src={light} alt=""/>
                        <h1>You Can Save $50 On Annually Subscription</h1>
                      </div>

                      <div className='radios'>
                        {plans.filter((plan) => {
                          return plan.plan_type === (!!values.team ? "team" : "individual")
                        }).map(plan => {
                          return (
                            <label className="tag-button-label">
                              <input type="radio"
                                value={plan.id}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="plan_id"
                              />
                              <div className="tag-button">
                                <div className="tag-icon checked"><img src={selectedRadio}/></div>
                                <div className="tag-icon unchecked"><img src={unSelectedDarkRadio}/></div>
                                <div className="tag-button-texts">
                                  <h1>{plan.plan_name} Account
                                    {values.plan_type === 'monthly' && (
                                      <>(Monthly)</>
                                    )}
                                    {values.plan_type === 'annually' && (
                                      <>(Annually)</>
                                    )}
                                    <img src={infoIcon} alt=""/></h1>
                                  <p>Start automating basic scheduling features</p>
                                </div>
                              </div>
                              {values.plan_type === 'monthly' && (
                                <span className="amount">
                                <p>${plan.monthly_price}.00</p>
                              </span>
                              )}
                              {values.plan_type === 'annually' && (
                                <span className="amount">
                                <p>${plan.annual_price}.00</p>
                              </span>
                              )}

                            </label>
                          )
                        })}
                      </div>
                      <div className="coupon-code">
                        <div className="form-group">
                          <label className="same-label" htmlFor="couponCode">Have a coupon code?</label>
                          <div className="coupon-code-input">
                            <input
                              type="text"
                              className="form-control same-input"
                              name="couponCode"
                              id="couponCode"
                              value={values.couponCode}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <button className="btn" type='button'>Apply</button>
                          </div>
                        </div>
                      </div>
                      <div className="submit-section">
                        <div className="total">
                          <div>
                            <h1>Total</h1>
                            <p>Next Payment (date) after 30 days</p>
                          </div>
                          <div>
                            <p className="total-amount">${getTotalAmount(values.plan_id, values.plan_type)}</p>
                          </div>
                        </div>
                        <div className="submit-btn">
                          <button className="btn" type="submit">Buy Now</button>
                        </div>
                        <div className="query">
                          <p>Questions? Send us an email at <a href="#">sales@meetocto.com</a></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            )
          }}
        </Formik>

      </div>

      <footer>
        <div className="footer-container">
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
      </footer>
    </div>
  )
}

export default Payment
