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

  componentDidMount = () => {
    this.setState({ loading: true }, () => {
      auth().getRedirectResult().then((result) => {
        this.setState({ loading: false });
        console.log('success', result);
      }, (error) => {
        this.setState({ loading: false });
        // The provider's account email, can be used in case of
        // auth/account-exists-with-different-credential to fetch the providers
        // linked to the email:
        console.error(error);
        console.error(error.message);
        console.error(error.code);
        // In case of auth/account-exists-with-different-credential error,
        // you can fetch the providers using this:
        if (error.code === 'auth/account-exists-with-different-credential') {
          auth().fetchProvidersForEmail(error.email).then((providers) => {
            console.log('other providers', providers);
          // The returned 'providers' is a list of the available providers
          // linked to the email address. Please refer to the guide for a more
          // complete explanation on how to recover from this error.
          });
        }
      });
    });
  };

  updateFormByKey = key => ({ target }) => {
    this.setState({ [key]: target.value });
  };

  authenticate = (provider) => {
    if (provider === 'google') {
      return this.authenticateWithProvider(new auth.GoogleAuthProvider());
    }
    if (provider === 'facebook') {
      return this.authenticateWithProvider(new auth.FacebookAuthProvider());
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

  authenticateWithProvider = (provider) => {
    console.log('in authenticateWithProvider');
    auth().useDeviceLanguage();
    console.log('in useDeviceLanguage');
    auth().signInWithRedirect(provider);
    console.log('in signInWithRedirect');
  };

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
