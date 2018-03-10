import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router';
import { auth } from 'firebase';
import PropTypes from 'prop-types';
import Authenticate from '../components/Authenticate';
import login from '../actions/login';

const signInRoute = '/signin';

class AuthenticateContainer extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    match: PropTypes.shape({
      isExact: PropTypes.bool.isRequired,
      path: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }).isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      error: '',
      loading: false,
      password: '',
    };
  }

  updateFormByKey = key => ({ target }) => {
    this.setState({ [key]: target.value });
  };

  authenticate = (provider) => {
    if (provider === 'google') {
      return this.authenticateWithGoogle();
    }
    if (this.props.match.url === signInRoute) {
      return this.signIn();
    }
    return this.signUp();
  }

  signIn = () => {
    auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .catch(error => this.setState({ error }));
  }

  signUp = () => {
    auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .catch(error => this.setState({ error }));
  }

  authenticateWithGoogle = () => {
    const provider = new auth.GoogleAuthProvider();
    auth().useDeviceLanguage();
    auth().signInWithRedirect(provider);
  }


  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }

    const { error, loading } = this.state;
    return (<Authenticate
      authenticate={this.authenticate}
      error={error || false}
      loading={loading}
      signingin={this.props.match.url === signInRoute}
      updateFormByKey={this.updateFormByKey}
    />);
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
  login: user => dispatch(login(user)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthenticateContainer));
