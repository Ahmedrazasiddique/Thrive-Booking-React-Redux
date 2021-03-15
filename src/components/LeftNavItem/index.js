import React from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { useLocation } from "react-router-dom";


const LeftNavItem = (props) => {
  const location = useLocation();

  return (
    <Link
      to={props.to}
      className={classnames("nav-link", {
        active: location.pathname === props.to,
      })}
    >
      <span>{props.title}</span>
    </Link>
  );
};

export default LeftNavItem;
