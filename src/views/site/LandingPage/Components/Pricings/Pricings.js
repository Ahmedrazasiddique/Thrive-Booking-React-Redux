import React, {useState} from 'react';
import freePlan from '../../../../../assets/icons/free-plan.svg';
import basicPlan from '../../../../../assets/icons/basic-plan.svg';
import proPlan from '../../../../../assets/icons/pro-plan.svg';
import Modal from "./components/PricingsModal";

export const Pricings = () => {
  const [show, setShow] = useState(false);
  return (
    <div className="pricings wrapper">
      <h1 className="heading">Pricing Plans</h1>
      <div className="toggle-section">
        <p>Individual Plans</p>
        <label className="switch">
          <input type="checkbox" defaultChecked={true}/>
          <span className="slider round"/>
        </label>
        <p>For Teams</p>
      </div>
      <div className="pricing-plans">
        <div className="chose-plan">
          <h1>Choose Your Plane</h1>
          <div className="btns">
            <button className="btn monthly">Monthly</button>
            <button className="btn annully">Annually</button>
          </div>
          <p className="mt-5">Connected Calendar/s</p>
          <p>Events</p>
        </div>
        <div className="row">
          <div className="col-4">
            <div className="plan">
              <h1>Free</h1>
              <img src={freePlan}/>
              <h2>$0</h2>
              <button className="btn">Buy Now</button>
              <h1 className="fill-h">Features</h1>
              <h3>1 calendar/user</h3>
              <h4>2 only</h4>
            </div>
          </div>
          <div className="col-4">
            <div className="plan active-plan">
              <div className="active-plan-value">Best Value</div>
              <h1>Basic</h1>
              <img src={basicPlan}/>
              <h2>$12<span>/Month</span></h2>
              <button className="btn">Buy Now</button>
              <h1 className="fill-h">Features</h1>
              <h3>4 calendar/user</h3>
              <h4>Unlimited</h4>
            </div>
          </div>
          <div className="col-4">
            <div className="plan">
              <h1>Pro</h1>
              <img src={proPlan}/>
              <h2>$15<span>/Month</span></h2>
              <button className="btn">Buy Now</button>
              <h1 className="fill-h">Features</h1>
              <h3>6 calendar/user</h3>
              <h4>Unlimited</h4>
            </div>
          </div>
          <div className="pricing-btn">
            <button type="button" className="btn more" onClick={setShow}>Show All</button>
          </div>
        </div>
      </div>
      {/*********** MORE PRICINGS MODAL **********/}
      <Modal show={show} setShow={setShow} />
    </div>
  )
}

