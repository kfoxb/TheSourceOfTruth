import React, { Fragment, Component } from 'react';
import { Search, Sidebar, Menu, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import mwaw from './Media/mwaw.png';

export default class SidebarTopOverlay extends Component {
  static propTypes = {
    toggleMenu: PropTypes.func.isRequired,
  };

  state = { visible: false }

  toggleVisibility = () => this.setState({ visible: !this.state.visible })

  render() {
    const { visible } = this.state;
    return (
      <Fragment>
        <Sidebar as={Menu} animation="overlay" direction="top" visible={visible} inverted>
          <Menu.Item name="Menu" onClick={this.props.toggleMenu}>
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
          <Search />
        </Sidebar>
        <img onMouseEnter={this.toggleVisibility} alt="" src={mwaw} style={{ width: '100%' }} />
      </Fragment>
    );
  }
}
