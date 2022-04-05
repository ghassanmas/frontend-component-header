import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { initialize, getConfig, subscribe, APP_READY } from '@edx/frontend-platform';
import { AppContext, AppProvider } from '@edx/frontend-platform/react';
import Header from '@edx/frontend-component-header';
import {LearningHeader} from '@edx/frontend-component-header';

import appMessages from '@edx/frontend-component-header/i18n';
import './index.scss';

subscribe(APP_READY, () => {
  ReactDOM.render(
    <AppProvider>
      {/* We can fake out authentication by including another provider here with the data we want */}
      <AppContext.Provider value={{
        authenticatedUser: null,
        config: getConfig(),
      }}>
        <Header />
      </AppContext.Provider>
      <h5 className="mt-2 mb-5">Logged out state</h5>

      <br/>
      <br/>
      <AppContext.Provider value={{
        authenticatedUser: {
          userId: 'humhum',
          username: 'ghassan',
          roles: [],
          administrator: false,
        },
        config: getConfig(),
      }}>
      <LearningHeader/>
      </AppContext.Provider>
      <br/>
      <br/>      
      <br/>

      {/* We can fake out authentication by including another provider here with the data we want */}
      <AppContext.Provider value={{
        authenticatedUser: {
          userId: 'humhum',
          username: 'ghassan',
          roles: [],
          administrator: false,
        },
        config: getConfig(),
      }}>
        <Header />
      </AppContext.Provider>
      <h5 className="mt-2">Logged in state</h5>
    </AppProvider>,
    document.getElementById('root'),
  );
});

initialize({
  messages: [appMessages],
  locale: 'he',
  handlers: {
    auth: () => {
     return( {
        userId: 'abc123',
        username: 'Mock User',
        roles: [],
        administrator: false,
        name: 'mock tester',
  
      })
      }
    
    },
});
