import React, { Component } from 'react';
import Amplify from 'aws-amplify';
import App from '../components/App';

Amplify.configure({
  Auth: {
    identityPoolId: process.env.AWS_AUTH_IDENTIYPOOLID,
    region: process.env.AWS_AUTH_REGION,
    userPoolId: process.env.AWS_AUTH_USERPOOLID,
    userPoolWebClientId: process.env.AWS_AUTH_USERPOOLWEBCLIENTID,
    mandatorySignIn: false,
  },
});

export default class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  toggleVisibility = () => this.setState({ visible: !this.state.visible })

  render() {
    return (
      <App
        toggleVisibility={this.toggleVisibility}
        visible={this.state.visible}
      />);
  }
}
