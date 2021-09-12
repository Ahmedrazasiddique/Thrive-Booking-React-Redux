import React from 'react'
import checked from '../../../../../../assets/icons/checked.svg'
import unChecked from '../../../../../../assets/icons/unchecked.svg'

const Interests = (props) => {
  const {interests} = props
  return (
      <label className="tag-button-label">
        <input type="checkbox" />
          <div className="tag-button">
            <div className="tag-icon checked"><img src={checked}/></div>
            <div className="tag-icon unchecked"><img src={unChecked}/></div>
            <div className="tag-text flex">{interests.interest}</div>
          </div>
      </label>
  )
}

export default Interests
