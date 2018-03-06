import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router';
import PropTypes from 'prop-types';
import SignIn from '../components/SignIn';
import login from '../actions/login';

class SignInContainer extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    login: PropTypes.func.isRequired,
    signingin: PropTypes.bool.isRequired,
    signingup: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      confirmPassword: '',
      error: '',
      loading: false,
      password: '',
      email: '',
    };
  }

  updateFormByKey = key => ({ target }) => {
    this.setState({ [key]: target.value });
  };

  authenticate = () => {
    console.log('authenticating');
  }

  signIn = () => {
    const { email, password } = this.state;
    this.setState({ error: '', loading: true }, () => {
      Auth.signIn(email, password)
        .then(() => Auth.currentAuthenticatedUser())
        .then(user => this.props.login(user))
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    });
  }

  signUp = () => {
    console.log('signingup');
  }

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }

    const { error, loading } = this.state;
    let errMessage;
    if (error) { errMessage = typeof error === 'string' ? error : error.message; }
    return (<SignIn
      authenticate={this.authenticate}
      error={errMessage || false}
      loading={loading}
      signingin={this.props.signingin}
      signingup={this.props.signingup}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignInContainer));
