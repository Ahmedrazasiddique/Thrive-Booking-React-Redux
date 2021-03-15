import React from "react";

const SettingAsideRight = (props) => {
  return (
    <aside className="right">
      <div className="widget">
        <h4 className="widget-title">On this page</h4>
        <div className="widget-body">
          <nav id="formProfile">
            <ul className="nav flex-column">
              {props.items.map((item, index) => (
                <li className="nav-item" key={index}>
                  <a className="nav-link" href={"#" + item.href}>
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default SettingAsideRight;
