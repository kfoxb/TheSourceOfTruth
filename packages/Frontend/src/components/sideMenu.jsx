import React, { Component } from 'react';
import { Sidebar, Segment, Menu } from 'semantic-ui-react';

export class SidebarLeftOverlay extends Component {
  state = { visible: false }

  toggleVisibility = () => this.setState({ visible: !this.state.visible })

  render() {
    const { visible } = this.state;
    return (
      <div>
        <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} animation="overlay" width="thin" visible={visible} icon="labeled" vertical inverted>
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
        </Sidebar.Pushable>
      </div>
    );
  }
}

export default SidebarLeftOverlay;
