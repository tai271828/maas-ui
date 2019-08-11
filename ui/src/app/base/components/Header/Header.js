import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import classNames from "classnames";
import React, { useState } from "react";
import ReactRouterPropTypes from "react-router-prop-types";

import "./Header.scss";
import { UserShape } from "../../proptypes";

const useVisible = initialValue => {
  const [value, setValue] = useState(initialValue);
  const toggleValue = evt => {
    evt.preventDefault();
    setValue(!value);
  };
  return [value, toggleValue];
};

const generateURL = url => `${process.env.REACT_APP_MAAS_URL}/${url}`;

const generateLocalLink = (location, url, label) => (
  <li
    className={classNames("p-navigation__link", {
      "is-selected": location.pathname.startsWith(url)
    })}
    role="menuitem"
  >
    <Link to={url} className="p-dropdown__item">
      {label}
    </Link>
  </li>
);

export const Header = ({ authUser, location }) => {
  const [hardwareVisible, toggleHardware] = useVisible(false);
  const [mobileMenuVisible, toggleMobileMenu] = useVisible(false);
  return (
    <header className="p-navigation">
      <div className="p-navigation__row row">
        <div className="p-navigation__banner">
          <div className="p-navigation__logo">
            <a href={generateURL("#/dashboard")} className="p-navigation__link">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="25.2"
                viewBox="545.3 412.6 100 25.2"
                alt=""
                className="p-navigation__image"
              >
                <title>MAAS logo</title>
                <path
                  fill="#E95420"
                  d="M557.9 412.6c-7 0-12.6 5.7-12.6 12.6 0 7 5.7 12.6 12.6 12.6 7 0 12.6-5.7 12.6-12.6 0-7-5.6-12.6-12.6-12.6z"
                />
                <g fill="#FFF">
                  <path d="M563.8 419.2h-11.9c-.3 0-.5.2-.5.5v.7c0 .3.2.5.5.5h11.9c.3 0 .5-.2.5-.5v-.7c.1-.3-.2-.5-.5-.5zM563.8 422.6h-11.9c-.3 0-.5.2-.5.5v.7c0 .3.2.5.5.5h11.9c.3 0 .5-.2.5-.5v-.7c.1-.3-.2-.5-.5-.5zM563.8 426h-11.9c-.3 0-.5.2-.5.5v.7c0 .3.2.5.5.5h11.9c.3 0 .5-.2.5-.5v-.7c.1-.2-.2-.5-.5-.5zM563.8 429.4h-11.9c-.3 0-.5.2-.5.5v.7c0 .3.2.5.5.5h11.9c.3 0 .5-.2.5-.5v-.6c.1-.3-.2-.6-.5-.6z" />
                </g>
                <g fill="#FFF">
                  <path d="M587.1 431.3c-.2-.4-.4-1-.7-1.7-.3-.7-.7-1.5-1.1-2.3-.4-.8-.8-1.7-1.2-2.5-.4-.9-.8-1.7-1.2-2.5l-1-2-.6-1.2c-.2 2.1-.4 4.4-.5 6.9-.1 2.5-.2 5.1-.3 7.8h-1.7c.2-3.2.3-6.3.5-9.2s.4-5.8.7-8.4h1.5c.5.9 1.1 1.8 1.6 2.9.6 1.1 1.2 2.3 1.7 3.5.6 1.2 1.1 2.4 1.7 3.5s1 2.2 1.4 3.1c.4-.9.9-2 1.4-3.1.5-1.2 1.1-2.3 1.7-3.5.6-1.2 1.1-2.4 1.7-3.5.6-1.1 1.1-2.1 1.6-2.9h1.5c.3 2.7.5 5.5.7 8.4s.4 6 .5 9.2h-1.8c-.1-2.7-.2-5.3-.3-7.8-.1-2.5-.3-4.8-.5-6.9l-.6 1.2-1 2c-.4.8-.8 1.6-1.2 2.5-.4.9-.8 1.7-1.2 2.5-.4.8-.7 1.6-1.1 2.3-.3.7-.6 1.3-.7 1.7h-1.5zM613.1 433.9c-.3-.9-.6-1.7-.9-2.5-.3-.8-.6-1.6-.8-2.3h-8.6c-.3.8-.6 1.5-.9 2.3-.3.8-.6 1.6-.9 2.5h-1.8c.7-1.8 1.3-3.6 1.9-5.1.6-1.6 1.2-3.1 1.8-4.5.6-1.4 1.1-2.8 1.7-4.1l1.8-3.9h1.5l1.8 3.9c.6 1.3 1.1 2.7 1.7 4.1.6 1.4 1.2 2.9 1.7 4.5.6 1.6 1.2 3.3 1.9 5.1h-1.9zm-6-15.7c-.6 1.5-1.3 3-1.9 4.5-.6 1.5-1.2 3.1-1.9 4.9h7.5c-.7-1.8-1.3-3.4-1.9-4.9-.6-1.6-1.2-3.1-1.8-4.5zM630.4 433.9c-.3-.9-.6-1.7-.9-2.5-.3-.8-.6-1.6-.8-2.3H620c-.3.8-.6 1.5-.9 2.3-.3.8-.6 1.6-.9 2.5h-1.8c.7-1.8 1.3-3.6 1.9-5.1.6-1.6 1.2-3.1 1.8-4.5.6-1.4 1.1-2.8 1.7-4.1l1.8-3.9h1.5l1.8 3.9c.6 1.3 1.1 2.7 1.7 4.1s1.2 2.9 1.7 4.5c.6 1.6 1.2 3.3 1.9 5.1h-1.8zm-6.1-15.7c-.6 1.5-1.3 3-1.9 4.5-.6 1.5-1.2 3.1-1.9 4.9h7.5c-.7-1.8-1.3-3.4-1.9-4.9-.5-1.6-1.1-3.1-1.8-4.5zM639.1 432.7c1.4 0 2.4-.3 3.2-.8.8-.5 1.1-1.3 1.1-2.4 0-.6-.1-1.2-.4-1.6-.2-.4-.6-.8-1-1.1s-.9-.6-1.4-.8c-.5-.2-1.1-.4-1.7-.7-.7-.3-1.4-.6-2-.9-.6-.3-1.1-.6-1.5-1-.4-.4-.7-.8-.9-1.3-.2-.5-.3-1.1-.3-1.7 0-1.5.5-2.7 1.5-3.4s2.4-1.2 4.2-1.2c.5 0 .9 0 1.4.1s.9.2 1.3.3c.4.1.8.2 1.1.4.3.1.6.3.8.4l-.6 1.5c-.5-.3-1.1-.6-1.8-.8s-1.5-.3-2.3-.3c-.6 0-1.1.1-1.5.2-.5.1-.9.3-1.2.5s-.6.6-.8.9c-.2.4-.3.8-.3 1.4 0 .5.1 1 .3 1.4.2.4.5.7.9 1 .4.3.8.5 1.3.7.5.2 1 .5 1.6.7.7.3 1.4.6 2 .9.6.3 1.2.6 1.6 1 .5.4.8.9 1.1 1.4.3.6.4 1.2.4 2.1 0 1.6-.6 2.8-1.7 3.6s-2.6 1.2-4.5 1.2c-.7 0-1.3 0-1.9-.1s-1.1-.2-1.5-.3c-.4-.1-.8-.3-1.1-.4-.3-.1-.5-.3-.7-.4l.6-1.5c.2.1.4.2.7.4.3.1.6.3 1 .4.4.1.8.2 1.3.3.6-.1 1.1-.1 1.7-.1z" />
                </g>
              </svg>
            </a>
          </div>
          <a
            className="p-navigation__toggle--open"
            href="#menu"
            title="toggle menu"
            onClick={toggleMobileMenu}
          >
            Menu
          </a>
        </div>
        <nav
          className={classNames("p-navigation__nav", "p-dropdown__menu", {
            "u-show": mobileMenuVisible
          })}
          role="menubar"
        >
          <span className="u-off-screen">
            <a href="#main-content">Jump to main content</a>
          </span>
          <ul className="p-navigation__links" role="menu">
            <li
              role="menuitem"
              className="p-navigation__link p-dropdown u-hide-nav-viewport--large u-hide-nav-viewport--small p-dropdown__toggle"
            >
              <a onClick={toggleHardware} href="#menu">
                Hardware <i className="p-icon--chevron"></i>
              </a>
              <ul
                className={classNames("p-dropdown__menu", {
                  "u-hide": !hardwareVisible
                })}
              >
                <li className="p-navigation__link" role="menuitem">
                  <a href={generateURL("#/machines")}>Machines</a>
                </li>
                <li className="p-navigation__link" role="menuitem">
                  <a href={generateURL("#/devices")}>Devices</a>
                </li>
                {authUser.is_superuser ? (
                  <li className="p-navigation__link" role="menuitem">
                    <a href={generateURL("#/controllers")}>Controllers</a>
                  </li>
                ) : null}
                <li className="p-navigation__link" role="menuitem">
                  <a href={generateURL("#/kvm")}>KVM</a>
                </li>
                <li className="p-navigation__link" role="menuitem">
                  <a href={generateURL("#/rsd")}>RSD</a>
                </li>
              </ul>
            </li>
            <li
              className="p-navigation__link u-hide-nav-viewport--medium"
              role="menuitem"
            >
              <a className="p-dropdown__item" href={generateURL("#/machines")}>
                Machines
              </a>
            </li>
            <li
              className="p-navigation__link u-hide-nav-viewport--medium"
              role="menuitem"
            >
              <a className="p-dropdown__item" href={generateURL("#/devices")}>
                Devices
              </a>
            </li>
            {authUser.is_superuser ? (
              <li
                className="p-navigation__link u-hide-nav-viewport--medium"
                role="menuitem"
              >
                <a
                  className="p-dropdown__item"
                  href={generateURL("#/controllers")}
                >
                  Controllers
                </a>
              </li>
            ) : null}
            <li
              className="p-navigation__link u-hide-nav-viewport--medium"
              role="menuitem"
            >
              <a className="p-dropdown__item" href={generateURL("#/kvm")}>
                KVM
              </a>
            </li>
            <li
              className="p-navigation__link u-hide-nav-viewport--medium"
              role="menuitem"
            >
              <a className="p-dropdown__item" href={generateURL("#/rsd")}>
                RSD
              </a>
            </li>
            <li className="p-navigation__link" role="menuitem">
              <a className="p-dropdown__item" href={generateURL("#/images")}>
                Images
              </a>
            </li>
            <li className="p-navigation__link" role="menuitem">
              <a className="p-dropdown__item" href={generateURL("#/domains")}>
                DNS
              </a>
            </li>
            <li className="p-navigation__link" role="menuitem">
              <a className="p-dropdown__item" href={generateURL("#/zones")}>
                AZs
              </a>
            </li>
            <li className="p-navigation__link" role="menuitem">
              <a
                className="p-dropdown__item"
                href={generateURL("#/networks?by=fabric")}
              >
                Subnets
              </a>
            </li>
            {authUser.is_superuser
              ? generateLocalLink(location, "/", "Settings")
              : null}
          </ul>
          <ul className="p-navigation__links--right" role="menu">
            <li className="p-navigation__link" role="menuitem">
              <a
                className="p-dropdown__item"
                role="menuitem"
                href={generateURL("account/prefs/")}
              >
                {authUser.username}
              </a>
            </li>
            <li className="p-navigation__link" role="menuitem">
              <a
                className="p-dropdown__item"
                href={generateURL("accounts/logout/")}
              >
                Logout
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

Header.propTypes = {
  authUser: UserShape,
  location: ReactRouterPropTypes.location.isRequired
};

export default withRouter(Header);