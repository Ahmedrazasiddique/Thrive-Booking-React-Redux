import React from 'react'

const Integrations = (props) => {
  const {integrationsImgs} = props
  return (
    <div className="col-2">
      <img src={integrationsImgs.cover} alt=""/>
    </div>
  )
}

export default Integrations
