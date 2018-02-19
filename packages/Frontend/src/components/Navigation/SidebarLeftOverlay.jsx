import React, { Component } from 'react';
import { Sidebar, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class SidebarLeftOverlay extends Component {
  static propTypes = {
    sideBarVisibility: PropTypes.bool.isRequired,
    toggleMenu: PropTypes.func.isRequired,
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleOffClick);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleOffClick);
  }

  handleOffClick = (e) => {
    if (this.ref && !this.ref.contains(e.target) && this.props.sideBarVisibility) {
      this.props.toggleMenu();
    }
  };

  render() {
    return (
      <div ref={(el) => { this.ref = el; }}>
        <Sidebar as={Menu} animation="overlay" width="thin" visible={this.props.sideBarVisibility} icon="labeled" vertical inverted>
          <Menu.Item name="home">
            <Link href="/" to="/">Home</Link>
          </Menu.Item>
          <Menu.Item name="library">
            <Link href="/library" to="/library">Library</Link>
          </Menu.Item>
          <Menu.Item name="journal">
            <Link href="/journal" to="/journal">Journal</Link>
          </Menu.Item>
          <Menu.Item name="signin">
            <Link href="/signin" to="/signin">Sign In</Link>
          </Menu.Item>
        </Sidebar>
      </div>
    );
  }
}
