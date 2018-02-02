import React, { Fragment } from 'react';
import { Sidebar, Menu } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export default function SidebarLeftOverlay({ sideBarVisibility }) {
  return (
    <Fragment>
      <Sidebar as={Menu} animation="overlay" width="thin" visible={sideBarVisibility} icon="labeled" vertical inverted>
        <Menu.Item name="home">
          Home
        </Menu.Item>
        <Menu.Item name="humanityParty">
          Humanity Party
        </Menu.Item>
        <Menu.Item name="formatting">
          Formatting
        </Menu.Item>
        <Menu.Item name="transcription">
          Transcription
        </Menu.Item>
        <Menu.Item name="questions">
          Questions
        </Menu.Item>
        <Menu.Item name="journal">
          Journal
        </Menu.Item>
      </Sidebar>
    </Fragment>
  );
}
SidebarLeftOverlay.propTypes = { sideBarVisibility: PropTypes.bool.isRequired };
