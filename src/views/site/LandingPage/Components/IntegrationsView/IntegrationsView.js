import React from 'react'
import gCalender from '../../../../../assets/images/g-calendar.png';
import googleDuo from '../../../../../assets/images/g-duo.png';
import gMeet from '../../../../../assets/images/g-meet.png';
import g4 from '../../../../../assets/images/g-4.png';
import g5 from '../../../../../assets/images/g-5.png';
import g6 from '../../../../../assets/images/g-6.png';
import Integrations from "./Components";

export const IntegrationsView = () => {
  const IntegrationImgs = [
    {cover: gCalender},
    {cover: googleDuo},
    {cover: gMeet},
    {cover: g4},
    {cover: g5},
    {cover: g6},
  ]
  return (
    <div className="integrations">
      <h1 className="heading pb-3">Integrations</h1>
      <div className="wrapper">
        <div className="row">
          {IntegrationImgs.map((integrationsImg, index) => (
            <Integrations key={index} integrationsImgs={integrationsImg} />
          ))}
        </div>
      </div>
    </div>
  )
}
