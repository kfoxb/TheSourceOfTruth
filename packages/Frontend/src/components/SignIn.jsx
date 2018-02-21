import React, { Component, Fragment } from 'react';
import { Auth } from 'aws-amplify';

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      loading: false,
      password: '',
      username: '',
    };
  }

  updateFormByKey = key => ({ target }) => this.setState({ [key]: target.value });

  signin = () => {
    const { username, password } = this.state;
    this.setState({ loading: true }, () => {
      Auth.signIn(username, password)
        .then(user => console.log(user))
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    });
  }

  submitIfEnter = ({ key }) => {
    if (key === 'Enter') {
      this.signin();
    }
  }

  render() {
    const { error, loading } = this.state;
    return (
      <Fragment>
        <p>Username: </p>
        <input onChange={this.updateFormByKey('username')} onKeyUp={this.submitIfEnter} />
        <p>Password: </p>
        <input onChange={this.updateFormByKey('password')} onKeyUp={this.submitIfEnter} type="password" />
        <button disabled={this.state.password.length < 8}onClick={this.signin}>Submit</button>
        <p>
          { loading ? 'Loading...' : null }
        </p>
        <p>
          { error && error.message ? error.message : null }
        </p>
      </Fragment>
    );
  }
}
