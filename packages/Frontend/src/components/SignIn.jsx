import React, { Component, Fragment } from 'react';
import { Auth } from 'aws-amplify';

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '', // eslint-disable-line react/no-unused-state
      password: '', // eslint-disable-line react/no-unused-state
      error: '',
    };
  }

  updateUsername = ({ target }) => { this.setState({ username: target.value }); }
  updatePassword = ({ target }) => { this.setState({ password: target.value }); }

  signin = () => {
    const { username, password } = this.state;
    Auth.signIn(username, password)
      .then(user => console.log(user))
      .catch(error => this.setState({ error }));
  }

  render() {
    const { error } = this.state;
    return (
      <Fragment>
        <p>Username: </p>
        <input onChange={this.updateUsername} />
        <p>Password: </p>
        <input type="password" onChange={this.updatePassword} />
        <button disabled={this.state.password.length < 8}onClick={this.signin}>Submit</button>
        { error && error.message ? error.message : null }
      </Fragment>
    );
  }
}
