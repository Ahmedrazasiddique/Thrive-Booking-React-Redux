import React, {useEffect, useState} from 'react'
import {Modal} from 'react-bootstrap';
import clear from '../../../../../../../assets/images/clear.png'
import clsx from "clsx";
import IndividualPlans from "../IndividualPlans";
import ForTeamPlans from "../ForTeamPlans";

const PricingsModal = (props) => {
  const handleClose = () => props.setShow(false);

  const [plansFor, setPlansFor] = useState('individual');

  return (
    <div>
      <Modal
        size='xl'
        show={props.show}
        className='add-post-modal'
        onHide={handleClose}
        centered
      >
        <div className="pricing-modal-container">
          <div className="remove-modal">
            <button type="button" className="btn" onClick={handleClose}>
              <img src={clear} alt=""/>
            </button>
          </div>
          <div className="pricings-modal">
            <h1 className="heading">Our Packages</h1>
            <div className="pricing-btns">
              <button
                type='button'
                className={clsx({ active: plansFor === 'individual' })}
                onClick={() => setPlansFor('individual')}
              >
                Individual Plans
              </button>
              <button
                type='button'
                className={clsx({ active: plansFor === 'teams' })}
                onClick={() => setPlansFor('teams')}
              >
                For Teams
              </button>
            </div>

            {plansFor === 'individual' && (
              <IndividualPlans />
            )}

            {plansFor === 'teams' && (
              <ForTeamPlans />
            )}

          </div>
        </div>
      </Modal>
    </div>
  )
}

export default PricingsModal;
