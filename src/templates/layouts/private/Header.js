import React from "react";
import logo from "../../../assets/images/thrive2a.jpg";
import Nav from "./Nav";

const Header = () => {
  /*
  useEffect(() => {
    if (!props.auth.isAuthenticated) {
      props.history.push("/admin/login");
    }
  }, [props.auth.isAuthenticated]);

  */

  return (
    <Nav />
    /*
    <nav className="navbar fixed-top navbar-expand-lg navbar-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img src={logo} alt="logo" loading="lazy" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <Nav />
      </div>
    </nav>
    */
  );
};

export default Header;
