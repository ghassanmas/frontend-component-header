import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { getConfig } from '@edx/frontend-platform';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { Dropdown } from '@edx/paragon';
import messages from './messages';
import sharedMessages from '../Header.messages';

function AuthenticatedUserDropdown(_ref) {
  var intl = _ref.intl,
      username = _ref.username;
  var dashboardMenuItem = /*#__PURE__*/React.createElement(Dropdown.Item, {
    href: "".concat(getConfig().LMS_BASE_URL, "/dashboard")
  }, intl.formatMessage(messages.dashboard));
  var mainMenu = [{
    type: 'item',
    href: "".concat(getConfig().LMS_BASE_URL, "/dashboard"),
    content: intl.formatMessage(sharedMessages['header.links.courses'])
  }, {
    type: 'item',
    href: "".concat(process.env.WORDPRESS_ROOT, "/about"),
    content: intl.formatMessage(sharedMessages['header.links.about'])
  }, {
    type: 'item',
    href: "".concat(process.env.WORDPRESS_ROOT, "/library"),
    content: intl.formatMessage(sharedMessages['header.links.library'])
  }, {
    type: 'item',
    href: "".concat(process.env.WORDPRESS_ROOT, "/supportus"),
    content: intl.formatMessage(sharedMessages['header.links.support'])
  }, {
    type: 'item',
    href: "".concat(process.env.WORDPRESS_ROOT, "/contact"),
    content: intl.formatMessage(sharedMessages['header.links.contactUs'])
  }];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("a", {
    className: "text-gray-700 mr-3",
    href: "".concat(getConfig().SUPPORT_URL)
  }, intl.formatMessage(messages.help)), mainMenu.map(function (_ref2) {
    var href = _ref2.href,
        content = _ref2.content;
    return /*#__PURE__*/React.createElement("a", {
      className: "text-gray-700 mr-3",
      href: href
    }, content);
  }), /*#__PURE__*/React.createElement(Dropdown, {
    className: "user-dropdown"
  }, /*#__PURE__*/React.createElement(Dropdown.Toggle, {
    variant: "outline-primary"
  }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
    icon: faUserCircle,
    className: "d-md-none",
    size: "lg"
  }), /*#__PURE__*/React.createElement("span", {
    "data-hj-suppress": true,
    className: "d-none d-md-inline"
  }, username)), /*#__PURE__*/React.createElement(Dropdown.Menu, {
    className: "dropdown-menu-right"
  }, dashboardMenuItem, /*#__PURE__*/React.createElement(Dropdown.Item, {
    href: "".concat(getConfig().LMS_BASE_URL, "/u/").concat(username)
  }, intl.formatMessage(messages.profile)), /*#__PURE__*/React.createElement(Dropdown.Item, {
    href: "".concat(getConfig().LMS_BASE_URL, "/account/settings")
  }, intl.formatMessage(messages.account)), getConfig().ORDER_HISTORY_URL && /*#__PURE__*/React.createElement(Dropdown.Item, {
    href: getConfig().ORDER_HISTORY_URL
  }, intl.formatMessage(messages.orderHistory)), /*#__PURE__*/React.createElement(Dropdown.Item, {
    href: getConfig().LOGOUT_URL
  }, intl.formatMessage(messages.signOut)))));
}

AuthenticatedUserDropdown.propTypes = {
  intl: intlShape.isRequired,
  username: PropTypes.string.isRequired
};
export default injectIntl(AuthenticatedUserDropdown);
//# sourceMappingURL=AuthenticatedUserDropdown.js.map