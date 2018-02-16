import React, { Fragment } from 'react';
import { Icon, Menu } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export default function SidebarTopOverlay({ toggleMenu }) {
  return (
    <Fragment>
      <Menu inverted>
        <Menu.Item name="Menu" onClick={toggleMenu}>
          <Icon name="content" />
        </Menu.Item>
        <Menu.Item name="Language">
          <Icon name="flag" />
          Language
        </Menu.Item>
        <Menu.Item name="Settings">
          <Icon name="setting" />
        </Menu.Item>
        <Menu.Item name="Sign in">
          <Icon name="user" />
        </Menu.Item>
        <Menu.Item name="Search">
          <Icon name="search" />
        </Menu.Item>
      </Menu>
    </Fragment>
  );
}

SidebarTopOverlay.propTypes = {
  toggleMenu: PropTypes.func.isRequired,
};
