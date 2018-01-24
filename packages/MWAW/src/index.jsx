/* eslint-env browser */
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer as HotReloadContainer } from 'react-hot-loader';
import App from './App';

const render = (Component) => {
  ReactDOM.render(
    <HotReloadContainer>
      <Component />
    </HotReloadContainer>,
    document.getElementById('app'),
  );
};

render(App);
if (module.hot) {
  module.hot.accept('./App', () => { render(App); });
}
