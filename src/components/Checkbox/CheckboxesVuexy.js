import React from "react"

const CheckBoxesVuexy = (props) => {

  return (
    <div
      className={`vx-checkbox-con ${
        props.className ? props.className : ""
      } vx-checkbox-${props.color}`}
    >
      <input
        type="checkbox"
        defaultChecked={props.defaultChecked}
        checked={props.checked}
        value={props.value}
        disabled={props.disabled}
        onClick={props.onClick ? props.onClick : null}
        onChange={props.onChange ? props.onChange : null}
      />
      <span
        className={`vx-checkbox vx-checkbox-${
          props.size ? props.size : "md"
        }`}
      >
        <span className="vx-checkbox--check">{props.icon}</span>
      </span>
      <span>{props.label}</span>
    </div>
  )

}

export default CheckBoxesVuexy
