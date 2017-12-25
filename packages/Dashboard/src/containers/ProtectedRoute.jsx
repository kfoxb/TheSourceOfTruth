import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute({ component: Component, isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => (
        isAuthenticated === true
        ? <Component {...props} />
        : <Redirect to="/login" />
      )}
    />
  );
}

ProtectedRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.appState.isAuthenticated,
});

export default connect(mapStateToProps)(ProtectedRoute);
