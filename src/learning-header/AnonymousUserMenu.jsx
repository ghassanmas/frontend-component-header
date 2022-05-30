import React from 'react';

import { getConfig } from '@edx/frontend-platform';
import { getLoginRedirectUrl } from '@edx/frontend-platform/auth';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { Button } from '@edx/paragon';

import genericMessages from '../generic/messages';
import sharedMessages from '../Header.messages'

function AnonymousUserMenu({ intl }) {
  const mainMenu = [
    {
      type: 'item',
      href: `${getConfig().LMS_BASE_URL}/dashboard`,
      content: intl.formatMessage(sharedMessages['header.links.courses']),
    },
    {
      type: 'item',
      href: `https://madrasafree.com/about`,
      content: intl.formatMessage(sharedMessages['header.links.about']),
    },
    {
      type: 'item',
      href: `https://madrasafree.com/library`,
      content: intl.formatMessage(sharedMessages['header.links.library']),
    },
    {
      type: 'item',
      href: `https://madrasafree.com/supportus`,
      content: intl.formatMessage(sharedMessages['header.links.support']),
    },
    {
      type: 'item',
      href: `https://madrasafree.com/contact`,
      content: intl.formatMessage(sharedMessages['header.links.contactUs']),
    },


  ];

  return (
    <div>
      <Button
        className="mr-3"
        variant="outline-primary"
        href={`${getConfig().LMS_BASE_URL}/register?next=${encodeURIComponent(global.location.href)}`}
      >
        {intl.formatMessage(genericMessages.registerSentenceCase)}
      </Button>
      <Button
        variant="primary"
        href={`${getLoginRedirectUrl(global.location.href)}`}
      >
        {intl.formatMessage(genericMessages.signInSentenceCase)}
      </Button>
      {mainMenu.map(({href,content})=>{
    <a className="text-gray-700 mr-3" href={href}>{content}</a>

      })}

    </div>
  );
}

AnonymousUserMenu.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(AnonymousUserMenu);
