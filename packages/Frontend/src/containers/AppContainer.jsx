import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter } from 'react-router-dom';
import { auth, database } from 'firebase';
import App from '../components/App';
import removeUser from '../actions/removeUser';
import setUser from '../actions/setUser';

class AppContainer extends Component {
  static propTypes = {
    isAnonymous: PropTypes.bool,
    removeUser: PropTypes.func.isRequired,
    setUser: PropTypes.func.isRequired,
  }

  static defaultProps = {
    isAnonymous: true,
  }

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  componentDidMount() {
    auth().onAuthStateChanged((user) => {
      if (this.forceTokenRefresh && this.permissionsTimestampRef) {
        console.log('removing listener');
        this.permissionsTimestampRef.off('value', this.forceTokenRefresh);
      }
      if (user) {
        this.forceTokenRefresh = () => {
          console.log('forcing token refresh');
          return user.getIdToken(true).then((res) => {
            console.log('getIdToken res', res);
          });
        };
        const {
          displayName, email, emailVerified, isAnonymous, metadata, providerData, uid,
        } = user;
        this.props.setUser({
          displayName, email, emailVerified, isAnonymous, metadata, providerData, uid,
        });
        this.setPermissionTimestampListener(user.uid);
        this.getClaimsAndTokenIssuedTime();
      } else {
        this.user = null;
        this.props.removeUser();
        auth().signInAnonymously().catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // eslint-disable-next-line no-console
          return console.log(errorCode, errorMessage);
        });
      }
    });
  }

  setPermissionTimestampListener(uid) {
    this.permissionsTimestampRef = database().ref(`users/${uid}/permissionsTimestamp`);
    this.permissionsTimestampRef
      .on(
        'value',
        (snapshot) => {
          const permissionsTimestamp = snapshot.val();
          console.log('running forceTokenRefresh');
          console.log('permissionsTimestamp', permissionsTimestamp);
          console.log('issuedAtTime', Date.parse(this.state.issuedAtTime));
          if (permissionsTimestamp > Date.parse(this.state.issuedAtTime)) {
            this.forceTokenRefresh().then(this.getClaimsAndTokenIssuedTime);
          } else {
            console.log('token is good, not refreshing');
          }
        },
        error => console.error('err', error),
      );
  }

  getClaimsAndTokenIssuedTime = () => {
    auth().currentUser.getIdTokenResult()
      .then(({ issuedAtTime, claims }) => {
        console.log('got issuedAtTime', Date.parse(issuedAtTime));
        const { author, editor } = claims;
        this.props.setUser({ claims: { author, editor } });
        this.setState({ issuedAtTime });
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.error(error);
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
  removeUser: () => dispatch(removeUser()),
  setUser: user => dispatch(setUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
