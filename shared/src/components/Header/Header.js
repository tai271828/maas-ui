import classNames from "classnames";
import PropTypes from "prop-types";
import React, { useState } from "react";

const useVisible = initialValue => {
  const [value, setValue] = useState(initialValue);
  const toggleValue = evt => {
    evt.preventDefault();
    setValue(!value);
  };
  return [value, toggleValue];
};

export const Header = ({
  authUser,
  basename,
  completedIntro,
  enableAnalytics,
  generateLocalLink,
  location,
  logout,
  newURLPrefix,
  onSkip,
  showRSD
}) => {
  const [hardwareVisible, toggleHardware] = useVisible(false);
  const [mobileMenuVisible, toggleMobileMenu] = useVisible(false);

  const links = [
    {
      inHardwareMenu: true,
      isLegacy: true,
      label: "Machines",
      url: "/machines"
    },
    {
      inHardwareMenu: true,
      isLegacy: true,
      label: "Devices",
      url: "/devices"
    },
    {
      adminOnly: true,
      inHardwareMenu: true,
      isLegacy: true,
      label: "Controllers",
      url: "/controllers"
    },
    {
      inHardwareMenu: true,
      isLegacy: true,
      label: "KVM",
      url: "/kvm"
    },
    {
      hidden: !showRSD,
      inHardwareMenu: true,
      isLegacy: true,
      label: "RSD",
      url: "/rsd"
    },
    {
      isLegacy: true,
      label: "Images",
      url: "/images"
    },
    {
      isLegacy: true,
      label: "DNS",
      url: "/domains"
    },
    {
      isLegacy: true,
      label: "AZs",
      url: "/zones"
    },
    {
      isLegacy: true,
      label: "Subnets",
      url: "/networks?by=fabric"
    },
    {
      adminOnly: true,
      isLegacy: false,
      label: "Settings",
      url: "/settings"
    }
  ]
    // Remove the admin only items if the user is not an admin.
    .filter(
      ({ adminOnly }) => !adminOnly || (authUser && authUser.is_superuser)
    )
    // Remove the hidden items.
    .filter(({ hidden }) => !hidden);

  const generateLegacyURL = url => `${basename}/#${url}`;

  const generateLink = (
    url,
    label,
    isLegacy = false,
    isDropdown = false,
    hideMobile = false
  ) => {
    const linkClass = classNames({
      "p-dropdown__item": isDropdown
    });
    if (isLegacy) {
      url = generateLegacyURL(url);
    } else if (newURLPrefix) {
      url = `${basename}${newURLPrefix}${url}`;
    }
    return (
      <li
        className={classNames("p-navigation__link", {
          "is-selected": location.pathname.startsWith(url),
          "u-hide-nav-viewport--medium": hideMobile
        })}
        key={url}
        role="menuitem"
      >
        {generateLocalLink && !isLegacy ? (
          generateLocalLink(url, label, linkClass)
        ) : (
          <a className={linkClass} href={url}>
            {label}
          </a>
        )}
      </li>
    );
  };

  const generateMenuItems = (items, isDropdown, hideMobile) =>
    items.map(({ inHardwareMenu, isLegacy, label, url }) =>
      generateLink(
        url,
        label,
        isLegacy,
        isDropdown,
        inHardwareMenu && hideMobile
      )
    );

  return (
    <>
      {enableAnalytics && (
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            // eslint-disable-next-line
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-P4TGJR9');`
          }}
        ></script>
      )}
      <header className="p-navigation is-dark">
        <div className="p-navigation__row row">
          <div className="p-navigation__banner">
            <div className="p-navigation__logo">
              <a
                href={generateLegacyURL("/dashboard")}
                className="p-navigation__link"
              >
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
          {authUser && (
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
                {completedIntro && (
                  <>
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
                        {generateMenuItems(
                          links.filter(item => item.inHardwareMenu)
                        )}
                      </ul>
                    </li>
                    {generateMenuItems(links, true, true)}
                  </>
                )}
              </ul>
              <ul className="p-navigation__links--right" role="menu">
                {!completedIntro && (
                  <li className="p-navigation__link" role="menuitem">
                    <a
                      href=""
                      onClick={evt => {
                        evt.preventDefault();
                        onSkip();
                      }}
                    >
                      Skip
                    </a>
                  </li>
                )}
                {generateLink("/account/prefs", authUser.username, false, true)}
                <li className="p-navigation__link" role="menuitem">
                  <a
                    className="p-dropdown__item"
                    href=""
                    onClick={evt => {
                      evt.preventDefault();
                      localStorage.removeItem("maas-config");
                      logout();
                    }}
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </header>
    </>
  );
};

Header.propTypes = {
  authUser: PropTypes.shape({
    is_superuser: PropTypes.bool,
    username: PropTypes.string
  }),
  basename: PropTypes.string.isRequired,
  completedIntro: PropTypes.bool,
  enableAnalytics: PropTypes.bool,
  generateLocalLink: PropTypes.func,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  logout: PropTypes.func.isRequired,
  newURLPrefix: PropTypes.string,
  onSkip: PropTypes.func,
  showRSD: PropTypes.bool
};

export default Header;
