import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter } from 'react-router-dom';
import { auth } from 'firebase';
import App from '../components/App';
import logout from '../actions/logout';
import login from '../actions/login';

class AppContainer extends Component {
  static propTypes = {
    isAnonymous: PropTypes.bool,
    logout: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
  }

  static defaultProps = {
    isAnonymous: false,
  }

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  componentDidMount() {
    // if sign up for new account combine w/ anonymous account
    // When app mounts, check to see if user is logged in
    auth().onAuthStateChanged((user) => {
      if (user) {
        const {
          displayName, email, emailVerified, isAnonymous, metadata, providerData, uid,
        } = user;
        this.props.login({
          displayName, email, emailVerified, isAnonymous, metadata, providerData, uid,
        });
      } else {
        this.props.logout();
        // if not logged in log in anonymously
        auth().signInAnonymously().catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          return console.log(errorCode, errorMessage);
        });
      }
    });
  }

  toggleVisibility = () => this.setState({ visible: !this.state.visible })

  render() {
    return (
      <BrowserRouter>
        <App
          isAnonymous={this.props.isAnonymous}
          toggleVisibility={this.toggleVisibility}
          visible={this.state.visible}
        />
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  isAnonymous: state.user.isAnonymous,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  login: user => dispatch(login(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
