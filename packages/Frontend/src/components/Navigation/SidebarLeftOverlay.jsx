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
    const MenuItem = (name, label, path) => (
      <Menu.Item as="div" name={name} onClick={this.props.toggleMenu}>
        <Link href={path} to={path}>{label}</Link>
      </Menu.Item>
    );
    return (
      <div ref={(el) => { this.ref = el; }}>
        <Sidebar as={Menu} animation="overlay" width="thin" visible={this.props.sideBarVisibility} icon="labeled" vertical inverted>
          {MenuItem('home', 'Home', '/')}
          {MenuItem('library', 'Library', '/library')}
          {MenuItem('journal', 'Journal', '/journal')}
          {MenuItem('signin', 'Sign In', '/signin')}
        </Sidebar>
      </div>
    );
  }
}
