import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Login from '../components/Login';
import Nav from '../components/Nav';

export function App({ isAuthenticated }) {
  if (!isAuthenticated) {
    return (<Login />);
  }
  return (
    <Nav />
  );
}

App.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.appState.isAuthenticated,
});

export default connect(mapStateToProps)(App);
