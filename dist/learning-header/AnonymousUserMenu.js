import React from 'react';
import { getConfig } from '@edx/frontend-platform';
import { getLoginRedirectUrl } from '@edx/frontend-platform/auth';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { Button } from '@edx/paragon';
import genericMessages from '../generic/messages';
import sharedMessages from '../Header.messages';

function AnonymousUserMenu(_ref) {
  var intl = _ref.intl;
  var mainMenu = [{
    type: 'item',
    href: "".concat(getConfig().LMS_BASE_URL, "/dashboard"),
    content: intl.formatMessage(sharedMessages['header.links.courses'])
  }, {
    type: 'item',
    href: "https://madrasafree.com/about",
    content: intl.formatMessage(sharedMessages['header.links.about'])
  }, {
    type: 'item',
    href: "https://madrasafree.com/library",
    content: intl.formatMessage(sharedMessages['header.links.library'])
  }, {
    type: 'item',
    href: "https://madrasafree.com/supportus",
    content: intl.formatMessage(sharedMessages['header.links.support'])
  }, {
    type: 'item',
    href: "https://madrasafree.com/contact",
    content: intl.formatMessage(sharedMessages['header.links.contactUs'])
  }];
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Button, {
    className: "mr-3",
    variant: "outline-primary",
    href: "".concat(getConfig().LMS_BASE_URL, "/register?next=").concat(encodeURIComponent(global.location.href))
  }, intl.formatMessage(genericMessages.registerSentenceCase)), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    href: "".concat(getLoginRedirectUrl(global.location.href))
  }, intl.formatMessage(genericMessages.signInSentenceCase)), mainMenu.map(function (_ref2) {
    var href = _ref2.href,
        content = _ref2.content;

    /*#__PURE__*/
    React.createElement("a", {
      className: "text-gray-700 mr-3",
      href: href
    }, content);
  }));
}

AnonymousUserMenu.propTypes = {
  intl: intlShape.isRequired
};
export default injectIntl(AnonymousUserMenu);
//# sourceMappingURL=AnonymousUserMenu.js.map