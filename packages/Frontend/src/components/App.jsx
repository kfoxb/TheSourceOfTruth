import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { SidebarLeftOverlay, SidebarTopOverlay } from './Navigation';
import Home from './Home';
import Journal from './Journal';
import Library from './Library';
import SignIn from './SignIn';
import SignUp from './SignUp';

class App extends Component {
  render() {
    const { toggleVisibility, visible } = this.props;
    return (
      <Fragment>
        <SidebarTopOverlay toggleMenu={toggleVisibility} />
        <SidebarLeftOverlay
          sideBarVisibility={visible}
          toggleMenu={toggleVisibility}
        />
        <div style={{ height: '40px' }} />
        <Route exact path="/" component={Home} />
        <Route path="/journal" component={Journal} />
        <Route path="/library" component={Library} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
      </Fragment>
    );
  }
}

App.propTypes = {
  toggleVisibility: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default withRouter(App);
