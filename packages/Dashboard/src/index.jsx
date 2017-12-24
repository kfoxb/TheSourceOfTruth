/* eslint-env browser */
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './containers/App';
import app from './reducers';

const store = createStore(app);

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store} >
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById('app'),
  );
};

render(App);
if (module.hot) {
  module.hot.accept('./containers/App', () => { render(App); });
}
