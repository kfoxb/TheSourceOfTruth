import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import SidebarLeftOverlay from './SidebarLeftOverlay';
import SidebarTopOverlay from './SidebarTopOverlay';

export default function App({ toggleVisibility, visible }) {
  return (
    <Fragment>
      <SidebarTopOverlay toggleMenu={toggleVisibility} />
      <SidebarLeftOverlay
        sideBarVisibility={visible}
        toggleMenu={toggleVisibility}
      />
      <Button>Real Truth</Button>
    </Fragment>
  );
}

App.propTypes = {
  toggleVisibility: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};
